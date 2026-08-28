import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import ToriiGate from './ToriiGate'
import LowPolyTree from './LowPolyTree'
import Ground from './Ground'

function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const GATE_COUNT = 24
const SPACING    = 7.5

interface SceneProps {
  act: 1 | 2
  isWarping: boolean
  warpPhase?: 'idle' | 'wireframe' | 'zoomout' | 'zoomin'
}

export default function Scene({ act, isWarping, warpPhase = 'idle' }: SceneProps) {
  const groupRef    = useRef<THREE.Group>(null)
  const heroTextRef = useRef<THREE.Group>(null)
  const saturnRef   = useRef<THREE.Group>(null)
  const starsRef    = useRef<THREE.Points>(null)
  const { camera, pointer, scene } = useThree()

  // Scroll tracking
  const scrollTarget  = useRef(0)
  const currentScroll = useRef(0)

  // ── Precision Planet Hover & 3D Movement State ────────────────────────────
  const mouseNDC        = useRef({ x: 9999, y: 9999 })
  const mouseDelta      = useRef({ dx: 0, dy: 0 })
  const lastMousePos    = useRef({ x: 0, y: 0 })
  const angularVelocity = useRef({ x: 0, y: 0 })
  const cumulativeRot   = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0)
        scrollTarget.current = Math.min(Math.max(window.scrollY / totalScroll, 0), 1)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const curX = (e.clientX / window.innerWidth) * 2 - 1
      const curY = -(e.clientY / window.innerHeight) * 2 + 1
      
      const dx = curX - lastMousePos.current.x
      const dy = curY - lastMousePos.current.y
      lastMousePos.current.x = curX
      lastMousePos.current.y = curY

      mouseNDC.current.x = curX
      mouseNDC.current.y = curY
      mouseDelta.current.dx = dx
      mouseDelta.current.dy = dy
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Trees for Act 1
  const elements = useMemo(() =>
    Array.from({ length: GATE_COUNT }, (_, i) => ({
      z: -i * SPACING,
      leftTree: {
        x: -(4.6 + seededRand(i * 3) * 2.2),
        scale: 1.05 + seededRand(i * 3 + 1) * 0.4,
        variant: (i % 2 === 0 ? 'sakura' : 'white') as 'sakura' | 'white',
        show: seededRand(i * 3 + 2) > 0.1,
      },
      rightTree: {
        x: 4.6 + seededRand(i * 5) * 2.2,
        scale: 1.0 + seededRand(i * 5 + 1) * 0.4,
        variant: (i % 3 === 0 ? 'white' : 'sakura') as 'sakura' | 'white',
        show: seededRand(i * 5 + 2) > 0.12,
      },
    }))
  , [])

  // ── Crisp Celestial Star Sprite ──────────────────────────────────────────
  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width  = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0,    'rgba(255, 255, 255, 1)')
    g.addColorStop(0.2,  'rgba(235, 245, 255, 0.85)')
    g.addColorStop(0.5,  'rgba(170, 200, 245, 0.4)')
    g.addColorStop(0.8,  'rgba(120, 160, 220, 0.1)')
    g.addColorStop(1,    'rgba(0, 0, 0, 0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
    return new THREE.CanvasTexture(canvas)
  }, [])

  // ── 4,000 Balanced Celestial Starfield (Endless 360° Loop) ────────────────
  const starGeo = useMemo(() => {
    const count = 4000
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 35 + Math.random() * 145   // layered depth from 35 to 180 units
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  const hasReachedEnd = useRef(false)

  useEffect(() => {
    if (act === 1) hasReachedEnd.current = false
  }, [act])

  // ── Wireframe effect (transition) ──────────────────────────────────────────
  useEffect(() => {
    const isWireframe = warpPhase === 'wireframe' || warpPhase === 'zoomout'
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (!mesh.isMesh || !mesh.material) return
      const apply = (mat: THREE.Material) => {
        // @ts-ignore
        mat.wireframe = isWireframe
        if (mat instanceof THREE.MeshStandardMaterial ||
            mat instanceof THREE.MeshPhongMaterial    ||
            mat instanceof THREE.MeshBasicMaterial) {
          if (isWireframe) {
            // @ts-ignore
            if (!mat._origColor) mat._origColor = mat.color.clone()
            mat.color.set('#ffffff')
          } else {
            // @ts-ignore
            if (mat._origColor) { mat.color.copy(mat._origColor); delete mat._origColor }
          }
        }
        mat.needsUpdate = true
      }
      Array.isArray(mesh.material) ? mesh.material.forEach(apply) : apply(mesh.material)
    })
  }, [warpPhase, scene, act])

  // Force black bg during wireframe/zoomout
  useEffect(() => {
    if (warpPhase === 'wireframe' || warpPhase === 'zoomout') {
      scene.background = new THREE.Color('#000000')
      scene.fog = null
    }
  }, [warpPhase, scene, act])

  // Temp vectors for screen-space proximity
  const saturnWorldPos = useMemo(() => new THREE.Vector3(), [])
  const saturnNDC      = useMemo(() => new THREE.Vector3(), [])

  // ── Main Render Loop ───────────────────────────────────────────────────────
  useFrame((state, delta) => {
    currentScroll.current = THREE.MathUtils.damp(currentScroll.current, scrollTarget.current, 4.5, delta)
    if (currentScroll.current > 0.98) hasReachedEnd.current = true

    const pCam = camera as THREE.PerspectiveCamera

    // ── Warp Phases ──
    if (warpPhase === 'wireframe') {
      pCam.position.y = THREE.MathUtils.damp(pCam.position.y, 12,  3.0, delta)
      pCam.position.z = THREE.MathUtils.damp(pCam.position.z, 22,  3.0, delta)
      pCam.position.x = THREE.MathUtils.damp(pCam.position.x,  0,  6.0, delta)
      pCam.lookAt(0, 0, 0)
      pCam.fov = THREE.MathUtils.damp(pCam.fov, 55, 3.0, delta)
      pCam.updateProjectionMatrix()
      return
    }
    if (warpPhase === 'zoomout') {
      pCam.position.y = THREE.MathUtils.damp(pCam.position.y, 35,  5.0, delta)
      pCam.position.z = THREE.MathUtils.damp(pCam.position.z, 65,  5.0, delta)
      pCam.lookAt(0, 0, 0)
      pCam.fov = THREE.MathUtils.damp(pCam.fov, 38, 4.0, delta)
      pCam.updateProjectionMatrix()
      return
    }
    if (warpPhase === 'zoomin') {
      pCam.position.y = THREE.MathUtils.damp(pCam.position.y, 2.4, 4.0, delta)
      pCam.position.z = THREE.MathUtils.damp(pCam.position.z,   7, 4.0, delta)
      pCam.position.x = THREE.MathUtils.damp(pCam.position.x,   0, 4.0, delta)
      pCam.fov = THREE.MathUtils.damp(pCam.fov, 46, 4.0, delta)
      pCam.updateProjectionMatrix()
    }

    // ── ACT 1 ──
    if (act === 1) {
      const totalTravel = GATE_COUNT * SPACING * 0.88
      const forwardZ    = currentScroll.current * totalTravel
      if (groupRef.current) {
        groupRef.current.position.z = forwardZ
        const children = groupRef.current.children
        for (let i = 0; i < children.length; i++) {
          const child = children[i]
          const worldZ = child.position.z + forwardZ
          if (worldZ > 14) child.position.z -= GATE_COUNT * SPACING
        }
      }
      pCam.position.x = THREE.MathUtils.damp(pCam.position.x, 0,   3.5, delta)
      pCam.position.y = THREE.MathUtils.damp(pCam.position.y, 2.3, 3.5, delta)
      pCam.rotation.order = 'YXZ'
      pCam.rotation.x = THREE.MathUtils.damp(pCam.rotation.x,  pointer.y * 0.2,  3.5, delta)
      pCam.rotation.y = THREE.MathUtils.damp(pCam.rotation.y, -pointer.x * 0.4,  3.5, delta)
      pCam.rotation.z = THREE.MathUtils.damp(pCam.rotation.z, -pointer.x * 0.05, 3.5, delta)

      if (heroTextRef.current) {
        heroTextRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.08
        let textOpacity = 0
        if (hasReachedEnd.current && currentScroll.current < 0.5)
          textOpacity = Math.min(1, (0.5 - currentScroll.current) * 2.5)
        heroTextRef.current.visible = textOpacity > 0.005
        if (heroTextRef.current.visible) {
          heroTextRef.current.traverse((child) => {
            const mesh = child as any
            if (mesh.isMesh && mesh.material) {
              mesh.material.opacity = textOpacity
              mesh.material.transparent = true
            }
          })
        }
      }

    } else {
      // ── ACT 2 ──

      // 1. Stars: continuous smooth left-to-right orbit (full 360° sphere, never disappears)
      if (starsRef.current) {
        starsRef.current.rotation.y += delta * 0.12
      }

      // 2. Strict On-Planet Interaction Only
      if (saturnRef.current) {
        saturnRef.current.getWorldPosition(saturnWorldPos)
        saturnNDC.copy(saturnWorldPos).project(pCam)

        const aspect = window.innerWidth / Math.max(window.innerHeight, 1)
        const relX = (mouseNDC.current.x - saturnNDC.x) * aspect
        const relY = (mouseNDC.current.y - saturnNDC.y)
        const dist = Math.hypot(relX, relY)

        // ONLY active when the cursor is directly on/over the planet (screen radius ~0.55)
        const isOverPlanet = dist < 0.55

        if (isOverPlanet) {
          // Cursor is directly over the planet: respond to mouse velocity & direction
          angularVelocity.current.x += -mouseDelta.current.dy * 4.5
          angularVelocity.current.y += mouseDelta.current.dx * 5.0
        }
        // Always reset per-frame delta
        mouseDelta.current.dx = 0
        mouseDelta.current.dy = 0

        // Friction damping on angular velocity
        const friction = Math.pow(0.86, delta * 60)
        angularVelocity.current.x *= friction
        angularVelocity.current.y *= friction

        // Accumulate rotation from velocity + smooth idle cosmic spin (0.22)
        cumulativeRot.current.y += (angularVelocity.current.y + 0.22) * delta
        cumulativeRot.current.x += angularVelocity.current.x * delta

        // Tilt towards cursor ONLY when cursor is over the planet; otherwise stay in calm neutral orientation
        const targetTiltX = isOverPlanet ? (0.25 - relY * 0.6) : 0.25
        const targetTiltZ = isOverPlanet ? (-0.15 - relX * 0.5) : -0.15

        // Smoothly blend rotational states
        saturnRef.current.rotation.x = THREE.MathUtils.damp(
          saturnRef.current.rotation.x,
          cumulativeRot.current.x + targetTiltX,
          isOverPlanet ? 6.0 : 3.0,
          delta
        )
        saturnRef.current.rotation.y = cumulativeRot.current.y
        saturnRef.current.rotation.z = THREE.MathUtils.damp(
          saturnRef.current.rotation.z,
          targetTiltZ,
          isOverPlanet ? 6.0 : 3.0,
          delta
        )

        // Smooth vertical floating with scroll
        saturnRef.current.position.y = THREE.MathUtils.damp(
          saturnRef.current.position.y,
          0.2 + currentScroll.current * 1.6,
          2.0, delta
        )
      }

      // Camera parallax
      const targetX = pointer.x * 0.35
      const targetY = 1.8 + pointer.y * 0.18
      pCam.position.x = THREE.MathUtils.damp(pCam.position.x, targetX, 3.5, delta)
      pCam.position.y = THREE.MathUtils.damp(pCam.position.y, targetY, 3.5, delta)
      pCam.lookAt(0, 0, -20)
    }

    if (isWarping && warpPhase === 'idle') {
      pCam.fov = THREE.MathUtils.damp(pCam.fov, 110, 8.0, delta)
      pCam.updateProjectionMatrix()
    } else if (warpPhase === 'idle') {
      pCam.fov = THREE.MathUtils.damp(pCam.fov, 46, 4.0, delta)
      pCam.updateProjectionMatrix()
    }
  })

  return (
    <group>
      {act === 1 ? (
        <>
          {/* ================= ACT 1: SHRINE ================= */}
          <group ref={heroTextRef} position={[0, 0.4, -8]} visible={false}>
            <Text
              position={[0, 0, 0]}
              scale={[1, 1.2, 1]}
              font="/fonts/Movement-DirectBlack.otf"
              fontSize={5.0}
              color="#c93b2b"
              outlineWidth={0.06}
              outlineColor="#8a2318"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.2}
            >
              PORTFOL!O
            </Text>
          </group>

          <group ref={groupRef}>
            {elements.map((el, i) => (
              <group key={i} position={[0, 0, el.z]}>
                <Ground seed={i} />
                <ToriiGate />
                {el.leftTree.show && (
                  <LowPolyTree
                    position={[el.leftTree.x, 0, 0]}
                    scale={el.leftTree.scale}
                    leafColor={el.leftTree.variant === 'sakura' ? '#d48ea1' : '#f0f0f0'}
                  />
                )}
                {el.rightTree.show && (
                  <LowPolyTree
                    position={[el.rightTree.x, 0, 0]}
                    scale={el.rightTree.scale}
                    leafColor={el.rightTree.variant === 'sakura' ? '#d48ea1' : '#f0f0f0'}
                  />
                )}
              </group>
            ))}
          </group>
        </>
      ) : (
        <>
          {/* ================= ACT 2: GALAXY ================= */}

          {/* 4,000 Crisp Celestial Stars — Balanced Brightness, Endless 360° */}
          <points ref={starsRef} geometry={starGeo}>
            <pointsMaterial
              map={starTexture}
              size={1.25}
              sizeAttenuation
              transparent
              opacity={0.85}
              color="#eef4ff"
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </points>

          {/* Planet — positioned on the right ([6.5, 0.2, -12]), rich shading & metallic ring */}
          <group
            ref={saturnRef}
            position={[6.5, 0.2, -12]}
            rotation={[0.25, 0, -0.15]}
          >
            {/* Low-Poly Dodecahedron Planet with crisp faceted shading */}
            <mesh castShadow receiveShadow>
              <dodecahedronGeometry args={[3.5, 2]} />
              <meshStandardMaterial
                color="#d44230"
                roughness={0.38}
                metalness={0.22}
                flatShading
              />
            </mesh>

            {/* Main Luminous Orbit Ring with metallic luster */}
            <mesh castShadow receiveShadow rotation={[Math.PI / 2.3, 0, 0]}>
              <ringGeometry args={[4.8, 6.8, 64]} />
              <meshStandardMaterial
                color="#f0ede6"
                roughness={0.25}
                metalness={0.45}
                side={THREE.DoubleSide}
                transparent
                opacity={0.85}
              />
            </mesh>
          </group>
        </>
      )}

      {/* ── Full-screen wireframe grid fill — Shrine→Galaxy transition only ── */}
      {(warpPhase === 'wireframe' || warpPhase === 'zoomout') && act === 1 && (
        <>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, -400]}>
            <planeGeometry args={[2000, 2000, 80, 80]} />
            <meshBasicMaterial color="#ffffff" wireframe side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 60, -400]}>
            <planeGeometry args={[2000, 2000, 80, 80]} />
            <meshBasicMaterial color="#ffffff" wireframe side={THREE.DoubleSide} />
          </mesh>
        </>
      )}
    </group>
  )
}

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'
import ToriiGate from './ToriiGate'
import LowPolyTree from './LowPolyTree'
import Ground from './Ground'

function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const GATE_COUNT = 24
const SPACING = 7.5

interface SceneProps {
  act: 1 | 2
  isWarping: boolean
}

export default function Scene({ act, isWarping }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const heroTextRef = useRef<THREE.Group>(null)
  const saturnRef = useRef<THREE.Group>(null)
  const starsRef = useRef<THREE.Points>(null)
  const { camera, pointer } = useThree()

  // Track window scroll progress (0 -> 1)
  const scrollTarget = useRef(0)
  const currentScroll = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        scrollTarget.current = Math.min(Math.max(window.scrollY / totalScroll, 0), 1)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Trees for Act 1
  const elements = useMemo(() => {
    return Array.from({ length: GATE_COUNT }, (_, i) => ({
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
  }, [])

  // Stars geometry for Act 2
  const starGeo = useMemo(() => {
    const count = 1200
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80
      positions[i * 3 + 2] = -Math.random() * 100
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  const hasReachedEnd = useRef(false)

  // Reset the text visibility flag when switching acts so it doesn't stay visible
  // when returning to Act 1 from Act 2.
  useEffect(() => {
    if (act === 1) {
      hasReachedEnd.current = false
    }
  }, [act])

  useFrame((state, delta) => {
    // Scroll dampening
    currentScroll.current = THREE.MathUtils.damp(
      currentScroll.current,
      scrollTarget.current,
      4.5,
      delta
    )

    if (currentScroll.current > 0.98) {
      hasReachedEnd.current = true
    }

    if (act === 1) {
      const totalTravel = GATE_COUNT * SPACING * 0.88
      const forwardZ = currentScroll.current * totalTravel

      if (groupRef.current) {
        groupRef.current.position.z = forwardZ

        const children = groupRef.current.children
        for (let i = 0; i < children.length; i++) {
          const child = children[i]
          
          const worldZ = child.position.z + forwardZ
          if (worldZ > 14) {
            child.position.z -= GATE_COUNT * SPACING
          }
        }
      }

      // "Head-turn" rotation effect: position stays centered, only perspective rotates
      camera.position.x = THREE.MathUtils.damp(camera.position.x, 0, 3.5, delta)
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 2.3, 3.5, delta)
      
      const targetYaw = -pointer.x * 0.4 // Look left/right
      const targetPitch = pointer.y * 0.2 // Look up/down
      const targetRoll = -pointer.x * 0.05 // Slight tilt
      
      camera.rotation.order = 'YXZ'
      camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, targetPitch, 3.5, delta)
      camera.rotation.y = THREE.MathUtils.damp(camera.rotation.y, targetYaw, 3.5, delta)
      camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, targetRoll, 3.5, delta)

      if (heroTextRef.current) {
        heroTextRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.08
        
        // Text is completely invisible by default.
        // Once the user reaches the bottom, and scrolls back up past the halfway point (0.5),
        // where the road starts to disappear into the fog, the text smoothly fades in.
        let textOpacity = 0
        if (hasReachedEnd.current && currentScroll.current < 0.5) {
          textOpacity = Math.min(1, (0.5 - currentScroll.current) * 2.5) // Ramps from 0 to 1.0 smoothly
        }
        
        heroTextRef.current.visible = textOpacity > 0.005

        if (heroTextRef.current.visible) {
          heroTextRef.current.traverse((child) => {
            const mesh = child as any
            if (mesh.isMesh) {
              if (mesh.material) {
                mesh.material.opacity = textOpacity
                mesh.material.transparent = true
              }
              if ('fillOpacity' in mesh) mesh.fillOpacity = textOpacity
              if ('outlineOpacity' in mesh) mesh.outlineOpacity = textOpacity
              if (typeof mesh.sync === 'function') mesh.sync()
            }
          })
        }
      }
    } else {
      // Act 2: Rotating 3D Saturn Planet & Deep Space Stars
      if (saturnRef.current) {
        saturnRef.current.rotation.y += delta * 0.2
        saturnRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + 0.25
        saturnRef.current.position.y = THREE.MathUtils.damp(saturnRef.current.position.y, 0.5 + currentScroll.current * 2, 2.0, delta)
      }

      if (starsRef.current) {
        starsRef.current.rotation.y += delta * 0.05
      }

      const targetX = pointer.x * 0.5
      const targetY = 1.8 + pointer.y * 0.25
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.5, delta)
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.5, delta)
      camera.lookAt(0, 0, -20)
    }

    if (isWarping) {
      camera.fov = THREE.MathUtils.damp(camera.fov, 110, 8.0, delta)
      camera.updateProjectionMatrix()
    } else {
      camera.fov = THREE.MathUtils.damp(camera.fov, 46, 4.0, delta)
      camera.updateProjectionMatrix()
    }
  })

  return (
    <group>
      {act === 1 ? (
        <>
          {/* ================= ACT 1: 3D PORTFOLIO BACKDROP WATERMARK ================= */}
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
                    variant={el.leftTree.variant}
                  />
                )}
                {el.rightTree.show && (
                  <LowPolyTree
                    position={[el.rightTree.x, 0, 0]}
                    scale={el.rightTree.scale}
                    variant={el.rightTree.variant}
                  />
                )}
              </group>
            ))}
          </group>
        </>
      ) : (
        <>
          {/* ================= ACT 2: 3D PLANET & DEEP GALAXY ================= */}
          <points ref={starsRef} geometry={starGeo}>
            <pointsMaterial size={0.6} color="#ffffff" transparent opacity={0.8} />
          </points>

          <group ref={saturnRef} position={[2.5, 0.5, -12]} rotation={[0.3, 0, -0.2]}>
            {/* Low-Poly Planet Sphere */}
            <mesh castShadow receiveShadow>
              <dodecahedronGeometry args={[2.4, 2]} />
              <meshStandardMaterial color="#c93b2b" roughness={0.6} flatShading />
            </mesh>

            {/* Low-Poly Orbit Ring */}
            <mesh castShadow receiveShadow rotation={[Math.PI / 2.3, 0, 0]}>
              <ringGeometry args={[3.2, 4.4, 32]} />
              <meshStandardMaterial color="#eef2f6" roughness={0.4} side={THREE.DoubleSide} transparent opacity={0.75} />
            </mesh>
          </group>
        </>
      )}
    </group>
  )
}

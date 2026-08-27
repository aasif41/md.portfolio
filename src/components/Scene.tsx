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

  useFrame((state, delta) => {
    // Scroll dampening
    currentScroll.current = THREE.MathUtils.damp(
      currentScroll.current,
      scrollTarget.current,
      4.5,
      delta
    )

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

      const targetX = pointer.x * 0.75
      const targetY = 2.3 + pointer.y * 0.35
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.5, delta)
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.5, delta)
      camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, -pointer.x * 0.025, 3.5, delta)
      camera.lookAt(pointer.x * 0.15, 2.1, -25)

      if (heroTextRef.current) {
        heroTextRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.08
        const textOpacity = Math.max(0.12, 0.9 - currentScroll.current * 1.5)
        heroTextRef.current.children.forEach((c) => {
          const mesh = c as THREE.Mesh
          if (mesh.material && 'fillOpacity' in mesh) {
            ;(mesh as any).fillOpacity = textOpacity
          }
        })
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
          {/* ================= ACT 1: SHINTO TORII SHRINE PATHWAY ================= */}
          <group ref={heroTextRef} position={[0, 0.5, -6.5]}>
            <Text
              position={[0, 0, 0]}
              fontSize={3.8}
              color="#161216"
              fillOpacity={0.9}
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.06}
            >
              ポートフォリオ 2026
            </Text>
          </group>

          <group ref={groupRef}>
            <Ground />
            {elements.map((el, i) => (
              <group key={i} position={[0, 0, el.z]}>
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
            <mesh>
              <dodecahedronGeometry args={[2.4, 2]} />
              <meshStandardMaterial color="#c93b2b" roughness={0.6} flatShading />
            </mesh>

            {/* Low-Poly Orbit Ring */}
            <mesh rotation={[Math.PI / 2.3, 0, 0]}>
              <ringGeometry args={[3.2, 4.4, 32]} />
              <meshStandardMaterial color="#eef2f6" roughness={0.4} side={THREE.DoubleSide} transparent opacity={0.75} />
            </mesh>
          </group>
        </>
      )}
    </group>
  )
}

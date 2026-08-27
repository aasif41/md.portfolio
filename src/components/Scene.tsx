import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import ToriiGate from './ToriiGate'
import LowPolyTree from './LowPolyTree'
import Ground from './Ground'
import SakuraParticles from './SakuraParticles'
import Environment3D from './Environment3D'

function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const GATE_COUNT = 20
const SPACING = 8

export default function Scene() {
  const groupRef = useRef<THREE.Group>(null)
  const heroTextRef = useRef<THREE.Group>(null)
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

  // Pre-generate rich tree distribution along path
  const elements = useMemo(() => {
    return Array.from({ length: GATE_COUNT }, (_, i) => ({
      z: -i * SPACING,
      leftTree: {
        x: -(4.5 + seededRand(i * 3) * 2.5),
        scale: 0.95 + seededRand(i * 3 + 1) * 0.5,
        variant: (i % 3 === 0 ? 'cherry' : i % 5 === 0 ? 'autumn' : 'pine') as 'cherry' | 'autumn' | 'pine',
        show: seededRand(i * 3 + 2) > 0.12,
      },
      rightTree: {
        x: 4.5 + seededRand(i * 5) * 2.5,
        scale: 0.9 + seededRand(i * 5 + 1) * 0.5,
        variant: (i % 2 === 0 ? 'pine' : i % 4 === 0 ? 'autumn' : 'cherry') as 'cherry' | 'autumn' | 'pine',
        show: seededRand(i * 5 + 2) > 0.15,
      },
    }))
  }, [])

  useFrame((state, delta) => {
    // 60-120 FPS buttery smooth inertia dampening
    currentScroll.current = THREE.MathUtils.damp(
      currentScroll.current,
      scrollTarget.current,
      5.0,
      delta
    )

    const totalTravel = GATE_COUNT * SPACING * 0.88
    const forwardZ = currentScroll.current * totalTravel

    // Move world toward camera
    if (groupRef.current) {
      groupRef.current.position.z = forwardZ

      // Fast recycling loop
      const children = groupRef.current.children
      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        const worldZ = child.position.z + forwardZ
        if (worldZ > 14) {
          child.position.z -= GATE_COUNT * SPACING
        }
      }
    }

    // Dynamic Camera rig with banking & smooth mouse tilt
    const targetX = pointer.x * 0.9
    const targetY = 2.3 + pointer.y * 0.4
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 4.0, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 4.0, delta)
    
    // Subtle banking roll on mouse movement
    camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, -pointer.x * 0.035, 4.0, delta)
    camera.lookAt(pointer.x * 0.25, 2.1, -25)

    // Hero background text subtle float & fade
    if (heroTextRef.current) {
      heroTextRef.current.position.y = 4.2 + Math.sin(state.clock.elapsedTime * 0.7) * 0.2
      const textOpacity = Math.max(0, 1 - currentScroll.current * 4)
      heroTextRef.current.children.forEach((c) => {
        const mesh = c as THREE.Mesh
        if (mesh.material && 'opacity' in mesh.material) {
          ;(mesh.material as THREE.Material).opacity = textOpacity
        }
      })
    }
  })

  return (
    <group>
      {/* Background 3D Moon & Mountains */}
      <Environment3D gateCount={GATE_COUNT} spacing={SPACING} />

      {/* Hero Backdrop 3D Typography */}
      <group ref={heroTextRef} position={[0, 4.2, 0]}>
        <Text
          position={[0, 0.8, -26]}
          fontSize={8.5}
          color="#ffffff"
          fillOpacity={0.12}
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.02}
        >
          MD AASIF
        </Text>

        <Text
          position={[0, -3.0, -22]}
          fontSize={2.0}
          color="#ffaa66"
          fillOpacity={0.18}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.35}
        >
          CREATIVE DEVELOPER · 2026
        </Text>
      </group>

      {/* Scrolling Torii Shrine Pathway */}
      <group ref={groupRef}>
        <Ground />
        <SakuraParticles />

        {/* Path of Torii Gates & Low Poly Trees */}
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
    </group>
  )
}

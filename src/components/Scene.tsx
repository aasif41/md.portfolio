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
        x: -(4.6 + seededRand(i * 3) * 2.0),
        scale: 1.05 + seededRand(i * 3 + 1) * 0.35,
        variant: (i % 2 === 0 ? 'sakura' : 'white') as 'sakura' | 'white',
        show: seededRand(i * 3 + 2) > 0.1,
      },
      rightTree: {
        x: 4.6 + seededRand(i * 5) * 2.0,
        scale: 1.0 + seededRand(i * 5 + 1) * 0.35,
        variant: (i % 3 === 0 ? 'white' : 'sakura') as 'sakura' | 'white',
        show: seededRand(i * 5 + 2) > 0.12,
      },
    }))
  }, [])

  useFrame((state, delta) => {
    // 120 FPS buttery smooth dampening
    currentScroll.current = THREE.MathUtils.damp(
      currentScroll.current,
      scrollTarget.current,
      4.5,
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

    // Dynamic camera rig matching Renaud's wide cinematic framing
    const targetX = pointer.x * 0.75
    const targetY = 2.2 + pointer.y * 0.35
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.5, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.5, delta)
    camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, -pointer.x * 0.025, 3.5, delta)
    camera.lookAt(pointer.x * 0.15, 2.0, -25)

    // Hero background text subtle float & fade on scroll
    if (heroTextRef.current) {
      heroTextRef.current.position.y = 0.4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.08
      const textOpacity = Math.max(0.12, 0.85 - currentScroll.current * 1.5)
      heroTextRef.current.children.forEach((c) => {
        const mesh = c as THREE.Mesh
        if (mesh.material && 'fillOpacity' in mesh) {
          ;(mesh as any).fillOpacity = textOpacity
        }
      })
    }
  })

  return (
    <group>
      {/* ================= MASSIVE JAPANESE FOREGROUND/MIDGROUND TEXT (ポートフォリオ) ================= */}
      <group ref={heroTextRef} position={[0, 0.4, -6.5]}>
        <Text
          position={[0, 0, 0]}
          fontSize={3.8}
          color="#16181b"
          fillOpacity={0.88}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          ポートフォリオ
        </Text>
      </group>

      {/* ================= SCROLLING TORII SHRINE PATHWAY ================= */}
      <group ref={groupRef}>
        <Ground />

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

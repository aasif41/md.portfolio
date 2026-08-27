import { useRef } from 'react'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

export default function Typography3D() {
  const textRef1 = useRef<THREE.Mesh>(null)
  const textRef2 = useRef<THREE.Mesh>(null)

  // Floating animation for text
  useFrame((state) => {
    if (textRef1.current) {
      textRef1.current.position.y = 2 + Math.sin(state.clock.elapsedTime) * 0.1
    }
    if (textRef2.current) {
      textRef2.current.position.y = -2 + Math.cos(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group>
      {/* Massive Text - PORTFOLIO */}
      <Text
        ref={textRef1}
        position={[0, 0, -10]}
        fontSize={8}
        color="#111111"
        fillOpacity={0.9}
        strokeWidth={0}
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
      >
        PORTFOLIO
      </Text>
      {/* English subtitle */}
      <Text
        ref={textRef2}
        position={[0, -4, -8]}
        fontSize={1.5}
        color="#333333"
        fillOpacity={0.8}
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
      >
        Renaud Rohlinger Tribute
      </Text>
    </group>
  )
}

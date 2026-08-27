import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function RunningCat({ position = [0, 0.22, -4] }: { position?: [number, number, number] }) {
  const catRef = useRef<THREE.Group>(null)
  const legFLRef = useRef<THREE.Mesh>(null)
  const legFRRef = useRef<THREE.Mesh>(null)
  const legBLRef = useRef<THREE.Mesh>(null)
  const legBRRef = useRef<THREE.Mesh>(null)
  const tailRef = useRef<THREE.Mesh>(null)
  const headRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime * 14 // Running speed

    // Natural running spine bobbing
    if (catRef.current) {
      catRef.current.position.y = position[1] + Math.abs(Math.sin(t * 0.5)) * 0.08
      catRef.current.rotation.z = Math.sin(t * 0.5) * 0.03
    }

    // 4-legged galloping stride animation
    if (legFLRef.current) legFLRef.current.rotation.x = Math.sin(t) * 0.65
    if (legFRRef.current) legFRRef.current.rotation.x = Math.sin(t + Math.PI) * 0.65
    if (legBLRef.current) legBLRef.current.rotation.x = Math.sin(t + Math.PI * 0.8) * 0.65
    if (legBRRef.current) legBRRef.current.rotation.x = Math.sin(t + Math.PI * 1.8) * 0.65

    // Tail swishing
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 0.5) * 0.25
      tailRef.current.rotation.x = 0.4 + Math.cos(t * 0.5) * 0.15
    }

    // Head subtle bobbing
    if (headRef.current) {
      headRef.current.position.y = 0.35 + Math.sin(t * 0.5) * 0.02
    }
  })

  // Stylized Low-Poly Cat Colors
  const bodyColor = "#222226"  // Sleek black/charcoal cat
  const earColor = "#c93b2b"   // Red inner ear accent
  const eyeColor = "#f4d06f"   // Glowing amber eyes

  return (
    <group ref={catRef} position={position} scale={0.42}>
      {/* Torso */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.32, 0.28, 0.7]} />
        <meshStandardMaterial color={bodyColor} roughness={0.7} flatShading />
      </mesh>

      {/* Chest / Shoulder */}
      <mesh position={[0, 0.34, -0.28]}>
        <boxGeometry args={[0.28, 0.26, 0.25]} />
        <meshStandardMaterial color={bodyColor} roughness={0.7} flatShading />
      </mesh>

      {/* Head Group */}
      <group ref={headRef} position={[0, 0.45, -0.45]}>
        <mesh>
          <dodecahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color={bodyColor} roughness={0.7} flatShading />
        </mesh>

        {/* Left Ear */}
        <mesh position={[-0.1, 0.14, 0]} rotation={[0, 0, 0.3]}>
          <coneGeometry args={[0.07, 0.14, 4]} />
          <meshStandardMaterial color={earColor} roughness={0.6} />
        </mesh>

        {/* Right Ear */}
        <mesh position={[0.1, 0.14, 0]} rotation={[0, 0, -0.3]}>
          <coneGeometry args={[0.07, 0.14, 4]} />
          <meshStandardMaterial color={earColor} roughness={0.6} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.07, 0.04, -0.15]}>
          <sphereGeometry args={[0.032, 6, 6]} />
          <meshBasicMaterial color={eyeColor} />
        </mesh>
        <mesh position={[0.07, 0.04, -0.15]}>
          <sphereGeometry args={[0.032, 6, 6]} />
          <meshBasicMaterial color={eyeColor} />
        </mesh>
      </group>

      {/* Front Left Leg */}
      <mesh ref={legFLRef} position={[-0.14, 0.16, -0.22]}>
        <cylinderGeometry args={[0.045, 0.035, 0.35, 6]} />
        <meshStandardMaterial color={bodyColor} roughness={0.7} flatShading />
      </mesh>

      {/* Front Right Leg */}
      <mesh ref={legFRRef} position={[0.14, 0.16, -0.22]}>
        <cylinderGeometry args={[0.045, 0.035, 0.35, 6]} />
        <meshStandardMaterial color={bodyColor} roughness={0.7} flatShading />
      </mesh>

      {/* Back Left Leg */}
      <mesh ref={legBLRef} position={[-0.14, 0.16, 0.24]}>
        <cylinderGeometry args={[0.055, 0.035, 0.35, 6]} />
        <meshStandardMaterial color={bodyColor} roughness={0.7} flatShading />
      </mesh>

      {/* Back Right Leg */}
      <mesh ref={legBRRef} position={[0.14, 0.16, 0.24]}>
        <cylinderGeometry args={[0.055, 0.035, 0.35, 6]} />
        <meshStandardMaterial color={bodyColor} roughness={0.7} flatShading />
      </mesh>

      {/* Tail */}
      <mesh ref={tailRef} position={[0, 0.4, 0.35]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.04, 0.45, 6]} />
        <meshStandardMaterial color={bodyColor} roughness={0.7} flatShading />
      </mesh>
    </group>
  )
}

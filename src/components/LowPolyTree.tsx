interface LowPolyTreeProps {
  position?: [number, number, number]
  scale?: number
  variant?: 'pine' | 'cherry' | 'autumn'
}

export default function LowPolyTree({ 
  position = [0, 0, 0], 
  scale = 1,
  variant = 'pine'
}: LowPolyTreeProps) {
  const trunkColor = "#3d2b1f"
  
  // Vibrant low-poly palette
  const leafColor = variant === 'cherry' 
    ? "#e88ca5" 
    : variant === 'autumn'
    ? "#d9652a"
    : "#1f482d" // Deep Japanese pine

  return (
    <group position={position} scale={scale} dispose={null}>
      {/* Trunk */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.18, 0.35, 2.8, 6]} />
        <meshStandardMaterial color={trunkColor} roughness={0.9} flatShading />
      </mesh>

      {/* Layer 1 (Bottom) */}
      <mesh position={[0, 3.0, 0]}>
        <coneGeometry args={[2.1, 2.2, 6]} />
        <meshStandardMaterial color={leafColor} roughness={0.7} flatShading />
      </mesh>

      {/* Layer 2 (Middle) */}
      <mesh position={[0, 4.2, 0]}>
        <coneGeometry args={[1.6, 2.0, 6]} />
        <meshStandardMaterial color={leafColor} roughness={0.7} flatShading />
      </mesh>

      {/* Layer 3 (Top) */}
      <mesh position={[0, 5.3, 0]}>
        <coneGeometry args={[1.0, 1.7, 6]} />
        <meshStandardMaterial color={leafColor} roughness={0.7} flatShading />
      </mesh>
    </group>
  )
}

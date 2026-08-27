// Exact 1:1 Renaud Rohlinger Style Faceted Low-Poly Tree

interface LowPolyTreeProps {
  position?: [number, number, number]
  scale?: number
  variant?: 'sakura' | 'white' | 'pine'
}

export default function LowPolyTree({ 
  position = [0, 0, 0], 
  scale = 1,
  variant = 'sakura'
}: LowPolyTreeProps) {
  const trunkColor = "#8a7065" // Light stylized wood trunk
  
  // Exact pastel colors from reference screenshots
  const leafColor = variant === 'sakura' 
    ? "#e4afb5"  // Soft pink sakura
    : variant === 'white'
    ? "#ebeef0"  // Soft cloud white
    : "#94b8a2"  // Soft sage green

  return (
    <group position={position} scale={scale} dispose={null}>
      {/* Angled low-poly trunk */}
      <mesh position={[0, 1.6, 0]} rotation={[0.05, 0.1, -0.05]}>
        <cylinderGeometry args={[0.22, 0.45, 3.2, 5]} />
        <meshStandardMaterial color={trunkColor} roughness={0.8} flatShading />
      </mesh>

      {/* Main big faceted crown */}
      <mesh position={[0, 4.4, 0]} rotation={[0.2, 0.4, 0]}>
        <icosahedronGeometry args={[2.2, 0]} />
        <meshStandardMaterial color={leafColor} roughness={0.7} flatShading />
      </mesh>

      {/* Left foliage cluster */}
      <mesh position={[-1.4, 3.8, 0.4]} rotation={[0.1, 0.8, -0.2]}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial color={leafColor} roughness={0.7} flatShading />
      </mesh>

      {/* Right foliage cluster */}
      <mesh position={[1.4, 3.6, -0.3]} rotation={[-0.2, 0.3, 0.3]}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial color={leafColor} roughness={0.7} flatShading />
      </mesh>

      {/* Top crown cluster */}
      <mesh position={[0.2, 5.8, 0.1]} rotation={[0.4, -0.2, 0.1]}>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial color={leafColor} roughness={0.7} flatShading />
      </mesh>
    </group>
  )
}

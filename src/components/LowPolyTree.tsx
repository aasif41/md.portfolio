// High Fidelity Low-Poly Faceted Japanese Tree

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
  const trunkColor = "#785f54" // Stylized tree bark
  
  // Exact anime pastel palette matching Renaud's live portfolio
  const leafColor = variant === 'sakura' 
    ? "#dea4ab"  // Soft pink cherry blossom
    : variant === 'white'
    ? "#e6ebed"  // Cloud white
    : "#88ab94"  // Sage pine

  return (
    <group position={position} scale={scale} dispose={null}>
      {/* Curved faceted trunk */}
      <mesh position={[0, 1.6, 0]} rotation={[0.08, 0.2, -0.06]}>
        <cylinderGeometry args={[0.26, 0.52, 3.4, 6]} />
        <meshStandardMaterial color={trunkColor} roughness={0.8} flatShading />
      </mesh>

      {/* Main big cloud cluster */}
      <mesh position={[0, 4.4, 0]} rotation={[0.2, 0.5, 0.1]}>
        <dodecahedronGeometry args={[2.3, 0]} />
        <meshStandardMaterial color={leafColor} roughness={0.65} flatShading />
      </mesh>

      {/* Left cloud cluster */}
      <mesh position={[-1.5, 3.7, 0.5]} rotation={[0.1, 0.8, -0.2]}>
        <dodecahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial color={leafColor} roughness={0.65} flatShading />
      </mesh>

      {/* Right cloud cluster */}
      <mesh position={[1.5, 3.5, -0.4]} rotation={[-0.2, 0.3, 0.3]}>
        <dodecahedronGeometry args={[1.7, 0]} />
        <meshStandardMaterial color={leafColor} roughness={0.65} flatShading />
      </mesh>

      {/* Top crown peak */}
      <mesh position={[0.2, 5.9, 0.2]} rotation={[0.3, -0.2, 0.1]}>
        <dodecahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial color={leafColor} roughness={0.65} flatShading />
      </mesh>
    </group>
  )
}

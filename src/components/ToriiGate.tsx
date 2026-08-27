// Exact 1:1 Renaud Rohlinger Style Low-Poly Torii Gate
const WOOD_COLOR = "#b87070"   // Stylized pinkish-vermilion wood
const CAP_COLOR  = "#3a3d40"   // Dark slate grey top roof
const BASE_COLOR = "#a8b0b5"   // Light stone grey base

export default function ToriiGate(props: JSX.IntrinsicElements['group']) {
  return (
    <group {...props} dispose={null}>
      {/* Left Pillar */}
      <mesh position={[-2.0, 2.7, 0]} rotation={[0, 0, -0.04]}>
        <boxGeometry args={[0.32, 5.4, 0.32]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.7} flatShading />
      </mesh>
      {/* Left Stone Footing */}
      <mesh position={[-2.1, 0.25, 0]}>
        <boxGeometry args={[0.55, 0.5, 0.55]} />
        <meshStandardMaterial color={BASE_COLOR} roughness={0.8} flatShading />
      </mesh>

      {/* Right Pillar */}
      <mesh position={[2.0, 2.7, 0]} rotation={[0, 0, 0.04]}>
        <boxGeometry args={[0.32, 5.4, 0.32]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.7} flatShading />
      </mesh>
      {/* Right Stone Footing */}
      <mesh position={[2.1, 0.25, 0]}>
        <boxGeometry args={[0.55, 0.5, 0.55]} />
        <meshStandardMaterial color={BASE_COLOR} roughness={0.8} flatShading />
      </mesh>

      {/* Main Upper Crossbar (Kasagi) */}
      <mesh position={[0, 5.3, 0]}>
        <boxGeometry args={[5.6, 0.4, 0.45]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.7} flatShading />
      </mesh>

      {/* Top Roof Cap (Dark Slate) */}
      <mesh position={[0, 5.56, 0]}>
        <boxGeometry args={[5.4, 0.14, 0.5]} />
        <meshStandardMaterial color={CAP_COLOR} roughness={0.6} flatShading />
      </mesh>

      {/* Lower Crossbar (Nuki) */}
      <mesh position={[0, 4.2, 0]}>
        <boxGeometry args={[4.6, 0.26, 0.28]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.7} flatShading />
      </mesh>
    </group>
  )
}

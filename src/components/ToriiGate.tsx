// Authentic Vermilion Japanese Torii Gate - 120 FPS Optimized
const VERMILION = "#c93b2b" // Vibrant lacquer vermilion
const BLACK = "#161616"     // Pitch black base & ridge
const GOLD = "#d4af37"      // Center plaque accent

export default function ToriiGate(props: JSX.IntrinsicElements['group']) {
  return (
    <group {...props} dispose={null}>
      {/* Left Pillar */}
      <mesh position={[-2.2, 3, 0]}>
        <cylinderGeometry args={[0.22, 0.26, 6, 10]} />
        <meshStandardMaterial color={VERMILION} roughness={0.5} flatShading />
      </mesh>
      {/* Left Pillar Stone Base (Kamebara) */}
      <mesh position={[-2.2, 0.3, 0]}>
        <cylinderGeometry args={[0.4, 0.45, 0.6, 8]} />
        <meshStandardMaterial color={BLACK} roughness={0.8} flatShading />
      </mesh>

      {/* Right Pillar */}
      <mesh position={[2.2, 3, 0]}>
        <cylinderGeometry args={[0.22, 0.26, 6, 10]} />
        <meshStandardMaterial color={VERMILION} roughness={0.5} flatShading />
      </mesh>
      {/* Right Pillar Stone Base */}
      <mesh position={[2.2, 0.3, 0]}>
        <cylinderGeometry args={[0.4, 0.45, 0.6, 8]} />
        <meshStandardMaterial color={BLACK} roughness={0.8} flatShading />
      </mesh>

      {/* Top Crossbar (Kasagi / Shimaki) */}
      <mesh position={[0, 6.0, 0]}>
        <boxGeometry args={[5.8, 0.45, 0.55]} />
        <meshStandardMaterial color={VERMILION} roughness={0.5} flatShading />
      </mesh>

      {/* Black Roof Ridge (Kasagi Top Cap) */}
      <mesh position={[0, 6.26, 0]}>
        <boxGeometry args={[5.6, 0.1, 0.6]} />
        <meshStandardMaterial color={BLACK} roughness={0.7} flatShading />
      </mesh>

      {/* Lower Crossbar (Nuki) */}
      <mesh position={[0, 4.8, 0]}>
        <boxGeometry args={[4.8, 0.3, 0.35]} />
        <meshStandardMaterial color={VERMILION} roughness={0.5} flatShading />
      </mesh>

      {/* Center Plaque (Gakuzuka) */}
      <mesh position={[0, 5.4, 0]}>
        <boxGeometry args={[0.4, 0.8, 0.2]} />
        <meshStandardMaterial color={BLACK} roughness={0.8} flatShading />
      </mesh>
      <mesh position={[0, 5.4, 0.11]}>
        <boxGeometry args={[0.3, 0.6, 0.05]} />
        <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Left Hanging Lantern */}
      <group position={[-1.4, 4.4, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.18, 0.35, 6]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.22, 6]} />
          <meshBasicMaterial color="#ffaa44" />
        </mesh>
      </group>

      {/* Right Hanging Lantern */}
      <group position={[1.4, 4.4, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.18, 0.35, 6]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.22, 6]} />
          <meshBasicMaterial color="#ffaa44" />
        </mesh>
      </group>
    </group>
  )
}

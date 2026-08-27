export default function Ground() {
  return (
    <group>
      {/* Stone pathway in the middle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -100]} receiveShadow>
        <planeGeometry args={[5, 260]} />
        <meshStandardMaterial color="#262626" roughness={0.8} />
      </mesh>

      {/* Path border curb left */}
      <mesh position={[-2.5, 0.05, -100]}>
        <boxGeometry args={[0.3, 0.1, 260]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Path border curb right */}
      <mesh position={[2.5, 0.05, -100]}>
        <boxGeometry args={[0.3, 0.1, 260]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Surrounding landscape ground (left) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-16, -0.05, -100]}>
        <planeGeometry args={[26, 260]} />
        <meshStandardMaterial color="#111612" roughness={1.0} />
      </mesh>

      {/* Surrounding landscape ground (right) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[16, -0.05, -100]}>
        <planeGeometry args={[26, 260]} />
        <meshStandardMaterial color="#111612" roughness={1.0} />
      </mesh>
    </group>
  )
}

import { useMemo } from 'react'

export default function Ground() {
  // Low-poly faceted rocks along the hillside
  const rocks = useMemo(() => {
    return [
      { x: -3.8, y: 0.3, z: -8, scale: [1.4, 0.9, 1.5], rot: [0.2, 0.6, 0.1] },
      { x: 4.2, y: 0.4, z: -16, scale: [1.8, 1.2, 1.6], rot: [-0.1, 1.3, 0.3] },
      { x: -4.8, y: 0.5, z: -28, scale: [2.1, 1.4, 1.9], rot: [0.4, 0.2, -0.2] },
      { x: 4.1, y: 0.3, z: -44, scale: [1.5, 1.0, 1.3], rot: [0.1, 0.9, 0.4] },
      { x: -3.9, y: 0.4, z: -60, scale: [1.6, 1.1, 1.7], rot: [-0.3, 0.4, 0.1] },
      { x: 4.8, y: 0.6, z: -78, scale: [2.3, 1.5, 2.1], rot: [0.2, 1.4, -0.1] },
      { x: -4.2, y: 0.4, z: -94, scale: [1.8, 1.2, 1.6], rot: [0.5, 0.1, 0.2] },
    ]
  }, [])

  return (
    <group>
      {/* Main Ground Earth - Soft Sage Green */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, -100]}>
        <planeGeometry args={[70, 260]} />
        <meshStandardMaterial color="#88b59e" roughness={0.9} flatShading />
      </mesh>

      {/* Center Pathway Strip - Light Stone Grey */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -100]}>
        <planeGeometry args={[4.8, 260]} />
        <meshStandardMaterial color="#d4ded9" roughness={0.8} flatShading />
      </mesh>

      {/* Low-Poly Boulders */}
      {rocks.map((r, i) => (
        <mesh 
          key={i} 
          position={[r.x, r.y, r.z]} 
          rotation={r.rot as [number, number, number]}
          scale={r.scale as [number, number, number]}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#b8c0c4" roughness={0.75} flatShading />
        </mesh>
      ))}
    </group>
  )
}

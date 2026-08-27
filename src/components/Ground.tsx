import { useMemo } from 'react'

export default function Ground() {
  // Low-poly decorative rocks scattered along the terrain
  const rocks = useMemo(() => {
    return [
      { x: -3.8, y: 0.2, z: -10, scale: [1.2, 0.8, 1.4], rot: [0.2, 0.5, 0.1] },
      { x: 4.2, y: 0.3, z: -18, scale: [1.6, 1.1, 1.5], rot: [-0.1, 1.2, 0.3] },
      { x: -4.5, y: 0.4, z: -32, scale: [1.9, 1.3, 1.8], rot: [0.4, 0.2, -0.2] },
      { x: 3.9, y: 0.2, z: -48, scale: [1.4, 0.9, 1.2], rot: [0.1, 0.9, 0.4] },
      { x: -3.6, y: 0.3, z: -64, scale: [1.5, 1.0, 1.6], rot: [-0.3, 0.4, 0.1] },
      { x: 4.6, y: 0.5, z: -82, scale: [2.1, 1.4, 2.0], rot: [0.2, 1.4, -0.1] },
      { x: -4.0, y: 0.3, z: -98, scale: [1.7, 1.1, 1.5], rot: [0.5, 0.1, 0.2] },
    ]
  }, [])

  return (
    <group>
      {/* Main Ground Plane - Sage Pastel Green */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, -100]}>
        <planeGeometry args={[60, 260]} />
        <meshStandardMaterial color="#88b59e" roughness={0.9} flatShading />
      </mesh>

      {/* Center Pathway Strip - Light Stone Grey */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -100]}>
        <planeGeometry args={[4.8, 260]} />
        <meshStandardMaterial color="#d4ded9" roughness={0.8} flatShading />
      </mesh>

      {/* Low-Poly Faceted Rocks */}
      {rocks.map((r, i) => (
        <mesh 
          key={i} 
          position={[r.x, r.y, r.z]} 
          rotation={r.rot as [number, number, number]}
          scale={r.scale as [number, number, number]}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#c0c7ca" roughness={0.8} flatShading />
        </mesh>
      ))}
    </group>
  )
}

import { useMemo } from 'react'

interface Environment3DProps {
  gateCount?: number
  spacing?: number
}

export default function Environment3D({ gateCount = 24, spacing = 8 }: Environment3DProps) {
  // Mountain silhouettes
  const mountainGeom = useMemo(() => {
    return [
      { x: -55, y: 22, z: -170, scale: 38 },
      { x: -22, y: 26, z: -190, scale: 48 },
      { x: 18, y: 24, z: -180, scale: 42 },
      { x: 55, y: 20, z: -160, scale: 34 },
    ]
  }, [])

  // Stone lanterns placement
  const lanterns = useMemo(() => {
    return Array.from({ length: Math.floor(gateCount / 2) }, (_, i) => ({
      z: -i * spacing * 2 - 4,
      leftX: -3.3,
      rightX: 3.3,
    }))
  }, [gateCount, spacing])

  return (
    <group>
      {/* ================= CELESTIAL GLOWING MOON ================= */}
      <group position={[0, 18, -145]}>
        {/* Moon Disc */}
        <mesh>
          <sphereGeometry args={[15, 24, 24]} />
          <meshBasicMaterial color="#fff4dc" />
        </mesh>
        {/* Corona Halo */}
        <mesh position={[0, 0, -1]}>
          <planeGeometry args={[48, 48]} />
          <meshBasicMaterial
            color="#ff9944"
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* ================= DISTANT MOUNTAIN RIDGES ================= */}
      <group>
        {mountainGeom.map((m, i) => (
          <mesh key={i} position={[m.x, m.y / 2, m.z]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[m.scale, m.y, 4]} />
            <meshStandardMaterial
              color="#0d1210"
              roughness={1.0}
              flatShading
            />
          </mesh>
        ))}
      </group>

      {/* ================= STONE TORO LANTERNS ================= */}
      {lanterns.map((l, i) => (
        <group key={i}>
          {/* Left Lantern */}
          <group position={[l.leftX, 0, l.z]}>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.2, 0.28, 0.8, 6]} />
              <meshStandardMaterial color="#222" roughness={0.9} flatShading />
            </mesh>
            <mesh position={[0, 1.0, 0]}>
              <boxGeometry args={[0.35, 0.4, 0.35]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.9} flatShading />
            </mesh>
            <mesh position={[0, 1.0, 0]}>
              <boxGeometry args={[0.22, 0.28, 0.22]} />
              <meshBasicMaterial color="#ffaa33" />
            </mesh>
            <mesh position={[0, 1.35, 0]}>
              <coneGeometry args={[0.5, 0.3, 4]} />
              <meshStandardMaterial color="#1f1f1f" roughness={0.9} flatShading />
            </mesh>
          </group>

          {/* Right Lantern */}
          <group position={[l.rightX, 0, l.z]}>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.2, 0.28, 0.8, 6]} />
              <meshStandardMaterial color="#222" roughness={0.9} flatShading />
            </mesh>
            <mesh position={[0, 1.0, 0]}>
              <boxGeometry args={[0.35, 0.4, 0.35]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.9} flatShading />
            </mesh>
            <mesh position={[0, 1.0, 0]}>
              <boxGeometry args={[0.22, 0.28, 0.22]} />
              <meshBasicMaterial color="#ffaa33" />
            </mesh>
            <mesh position={[0, 1.35, 0]}>
              <coneGeometry args={[0.5, 0.3, 4]} />
              <meshStandardMaterial color="#1f1f1f" roughness={0.9} flatShading />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  )
}

import { useMemo } from 'react'
import * as THREE from 'three'

interface LowPolyTreeProps {
  position?: [number, number, number]
  scale?: number
  leafColor?: string
  trunkColor?: string
}

// Reusable black material for toon outline (Inverted Hull technique)
const blackMaterial = new THREE.MeshBasicMaterial({ color: 'black', side: THREE.BackSide })

export default function LowPolyTree({
  position = [0, 0, 0],
  scale = 1,
  leafColor = '#d48ea1',
  trunkColor = '#5c4033',
}: LowPolyTreeProps) {
  
  // Pre-create geometries
  const trunkGeo = useMemo(() => new THREE.CylinderGeometry(0.3, 0.45, 2.8, 7), [])
  const leafGeoBig = useMemo(() => new THREE.DodecahedronGeometry(2.3, 0), [])
  const leafGeoSmall = useMemo(() => new THREE.DodecahedronGeometry(1.4, 0), [])

  return (
    <group position={position} scale={scale} dispose={null}>
      {/* Base Trunk */}
      <group position={[0, 1.4, 0]} rotation={[0.05, 0.2, -0.02]}>
        <mesh castShadow receiveShadow geometry={trunkGeo}>
          <meshStandardMaterial color={trunkColor} roughness={0.8} flatShading />
        </mesh>
        <mesh geometry={trunkGeo} scale={[1.08, 1.02, 1.08]} material={blackMaterial} />
      </group>

      {/* Main Central Foliage */}
      <group position={[0, 3.8, 0]} rotation={[0.2, 0.5, 0.1]}>
        <mesh castShadow receiveShadow geometry={leafGeoBig}>
          <meshStandardMaterial color={leafColor} roughness={0.65} flatShading />
        </mesh>
        <mesh geometry={leafGeoBig} scale={1.03} material={blackMaterial} />
      </group>

      {/* Small Left Cluster */}
      <group position={[-1.2, 3.2, 0.5]} rotation={[0.1, 0.8, -0.2]}>
        <mesh castShadow receiveShadow geometry={leafGeoSmall}>
          <meshStandardMaterial color={leafColor} roughness={0.65} flatShading />
        </mesh>
        <mesh geometry={leafGeoSmall} scale={1.04} material={blackMaterial} />
      </group>

      {/* Small Right Cluster */}
      <group position={[1.4, 3.0, -0.4]} rotation={[-0.2, 0.3, 0.3]}>
        <mesh castShadow receiveShadow geometry={leafGeoSmall}>
          <meshStandardMaterial color={leafColor} roughness={0.65} flatShading />
        </mesh>
        <mesh geometry={leafGeoSmall} scale={1.04} material={blackMaterial} />
      </group>
      
      {/* Small Top-Back Cluster */}
      <group position={[0.3, 4.6, -1.0]} rotation={[-0.3, 0.5, -0.1]}>
        <mesh castShadow receiveShadow geometry={leafGeoSmall}>
          <meshStandardMaterial color={leafColor} roughness={0.65} flatShading />
        </mesh>
        <mesh geometry={leafGeoSmall} scale={1.04} material={blackMaterial} />
      </group>
    </group>
  )
}

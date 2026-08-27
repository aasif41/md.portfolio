import { useMemo } from 'react'
import * as THREE from 'three'

// Authentic Japanese Shinto Torii Gate with Traditional Curved Kasagi and Kusabi Pegs
const WOOD_COLOR = "#a85d5d"     // Vermilion/pinkish shrine wood
const WOOD_DARK  = "#8c4949"     // Shadowed wood for depth
const CAP_COLOR  = "#2b2e33"     // Dark slate ridge cap
const STONE_BASE = "#9aa3a8"     // Chiseled stone footing

export default function ToriiGate(props: JSX.IntrinsicElements['group']) {
  // Curved upper Kasagi beam geometry
  const kasagiGeo = useMemo(() => {
    const shape = new THREE.Shape()
    // Tapered curve shape for traditional Kasagi roof
    shape.moveTo(-3.0, 0.45)
    shape.quadraticCurveTo(0, 0.25, 3.0, 0.45)
    shape.lineTo(3.2, 0.6)
    shape.quadraticCurveTo(0, 0.4, -3.2, 0.6)
    shape.closePath()
    
    const extrudeSettings = {
      depth: 0.5,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05
    }
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  return (
    <group {...props} dispose={null}>
      {/* ================= LEFT PILLAR ================= */}
      <group position={[-2.0, 0, 0]}>
        {/* Tapered Pillar (Hashira) with inward lean */}
        <mesh position={[0, 2.7, 0]} rotation={[0, 0, -0.035]}>
          <cylinderGeometry args={[0.22, 0.28, 5.4, 8]} />
          <meshStandardMaterial color={WOOD_COLOR} roughness={0.6} flatShading />
        </mesh>

        {/* Flared Stone Footing (Kamebara / Daiishi) */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.38, 0.52, 0.6, 6]} />
          <meshStandardMaterial color={STONE_BASE} roughness={0.8} flatShading />
        </mesh>

        {/* Kusabi (Wedge Peg protruding through lower crossbar) */}
        <mesh position={[-0.2, 4.15, 0]}>
          <boxGeometry args={[0.5, 0.16, 0.32]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.7} flatShading />
        </mesh>
      </group>

      {/* ================= RIGHT PILLAR ================= */}
      <group position={[2.0, 0, 0]}>
        {/* Tapered Pillar with inward lean */}
        <mesh position={[0, 2.7, 0]} rotation={[0, 0, 0.035]}>
          <cylinderGeometry args={[0.22, 0.28, 5.4, 8]} />
          <meshStandardMaterial color={WOOD_COLOR} roughness={0.6} flatShading />
        </mesh>

        {/* Flared Stone Footing */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.38, 0.52, 0.6, 6]} />
          <meshStandardMaterial color={STONE_BASE} roughness={0.8} flatShading />
        </mesh>

        {/* Kusabi (Wedge Peg) */}
        <mesh position={[0.2, 4.15, 0]}>
          <boxGeometry args={[0.5, 0.16, 0.32]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.7} flatShading />
        </mesh>
      </group>

      {/* ================= UPPER CROSSBAR (Kasagi & Shimaki) ================= */}
      {/* Traditional Curved Kasagi */}
      <mesh geometry={kasagiGeo} position={[0, 4.9, -0.25]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.6} flatShading />
      </mesh>

      {/* Dark Slate Roof Ridge Cap */}
      <mesh position={[0, 5.5, 0]}>
        <boxGeometry args={[6.0, 0.14, 0.54]} />
        <meshStandardMaterial color={CAP_COLOR} roughness={0.5} flatShading />
      </mesh>

      {/* ================= LOWER CROSSBAR (Nuki) ================= */}
      <mesh position={[0, 4.15, 0]}>
        <boxGeometry args={[4.8, 0.28, 0.3]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.6} flatShading />
      </mesh>

      {/* ================= CENTER SUPPORT (Gakuzuka & Plaque) ================= */}
      <mesh position={[0, 4.65, 0]}>
        <boxGeometry args={[0.35, 0.72, 0.22]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.7} flatShading />
      </mesh>
      <mesh position={[0, 4.65, 0.12]}>
        <boxGeometry args={[0.28, 0.55, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
    </group>
  )
}

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SAKURA_COUNT = 200
const EMBER_COUNT = 100

export default function SakuraParticles() {
  const sakuraMesh = useRef<THREE.InstancedMesh>(null)
  const emberPoints = useRef<THREE.Points>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Sakura petals setup
  const sakuraData = useMemo(() => {
    return Array.from({ length: SAKURA_COUNT }, () => ({
      x: (Math.random() - 0.5) * 26,
      y: Math.random() * 14,
      z: -(Math.random() * 180),
      speedY: 0.015 + Math.random() * 0.015,
      speedX: (Math.random() - 0.5) * 0.008,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      rotSpeedX: 0.015 + Math.random() * 0.02,
      rotSpeedY: 0.01 + Math.random() * 0.015,
      scale: 0.07 + Math.random() * 0.07,
    }))
  }, [])

  // Ember particles setup
  const [emberPositions, emberSpeeds] = useMemo(() => {
    const pos = new Float32Array(EMBER_COUNT * 3)
    const spd = new Float32Array(EMBER_COUNT)
    for (let i = 0; i < EMBER_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18
      pos[i * 3 + 1] = Math.random() * 8
      pos[i * 3 + 2] = -(Math.random() * 180)
      spd[i] = 0.004 + Math.random() * 0.006
    }
    return [pos, spd]
  }, [])

  const emberGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3))
    return geo
  }, [emberPositions])

  const petalGeo = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.quadraticCurveTo(0.18, 0.35, 0, 0.7)
    shape.quadraticCurveTo(-0.18, 0.35, 0, 0)
    return new THREE.ShapeGeometry(shape, 3)
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (sakuraMesh.current) {
      for (let i = 0; i < SAKURA_COUNT; i++) {
        const p = sakuraData[i]
        p.y -= p.speedY
        p.x += Math.sin(time * 0.8 + p.z) * 0.008 + p.speedX
        p.rotX += p.rotSpeedX
        p.rotY += p.rotSpeedY

        if (p.y < 0.1) {
          p.y = 13 + Math.random() * 2
          p.x = (Math.random() - 0.5) * 26
        }

        dummy.position.set(p.x, p.y, p.z)
        dummy.rotation.set(p.rotX, p.rotY, p.rotZ)
        dummy.scale.set(p.scale, p.scale, p.scale)
        dummy.updateMatrix()
        sakuraMesh.current.setMatrixAt(i, dummy.matrix)
      }
      sakuraMesh.current.instanceMatrix.needsUpdate = true
    }

    if (emberPoints.current) {
      const pos = emberPoints.current.geometry.attributes.position
      for (let i = 0; i < EMBER_COUNT; i++) {
        let y = pos.getY(i) + emberSpeeds[i]
        if (y > 9) y = 0.1
        pos.setY(i, y)
      }
      pos.needsUpdate = true
    }
  })

  return (
    <group>
      <instancedMesh
        ref={sakuraMesh}
        args={[petalGeo, undefined, SAKURA_COUNT]}
      >
        <meshStandardMaterial
          color="#ffb7c5"
          emissive="#ff8fa3"
          emissiveIntensity={0.2}
          side={THREE.DoubleSide}
          roughness={0.6}
        />
      </instancedMesh>

      <points ref={emberPoints} geometry={emberGeo}>
        <pointsMaterial
          size={0.08}
          color="#ffaa33"
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  )
}

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function AbstractBackground() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  
  const count = 1000
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Generate random positions
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40
      const y = (Math.random() - 0.5) * 40
      const z = (Math.random() - 0.5) * 40
      const speed = Math.random() * 0.05 + 0.01
      temp.push({ x, y, z, speed })
    }
    return temp
  }, [count])

  useFrame(() => {
    if (!meshRef.current) return
    
    particles.forEach((particle, i) => {
      // Infinite scroll effect: move particles forward
      particle.z += particle.speed
      
      // Reset if they pass the camera
      if (particle.z > 15) {
        particle.z = -25
      }
      
      dummy.position.set(particle.x, particle.y, particle.z)
      dummy.rotation.x += 0.01 * particle.speed
      dummy.rotation.y += 0.01 * particle.speed
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} matrixAutoUpdate={false}>
      <octahedronGeometry args={[0.04, 0]} />
      <meshBasicMaterial color="#D9782E" wireframe transparent opacity={0.4} />
    </instancedMesh>
  )
}

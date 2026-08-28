import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ToriiGate from './ToriiGate'
import LowPolyTree from './LowPolyTree'

gsap.registerPlugin(ScrollTrigger)

export default function InfiniteMap() {
  const groupRef = useRef<THREE.Group>(null)
  
  // We'll spawn 20 gates to ensure a long visible horizon
  const gateCount = 20
  const spacing = 6 // Distance between each gate on Z axis
  
  // GSAP scroll progress proxy
  const scrollProxy = useRef({ z: 0 })
  
  useFrame(() => {
    const grp = groupRef.current
    if (!grp) return
    
    // GSAP updates scrollProxy.z. We move the entire group towards the camera (positive Z)
    grp.position.z = scrollProxy.current.z
    
    // Infinite loop logic:
    // If a child (gate/tree) passes behind the camera (z > 5 relative to camera),
    // move it to the back of the line.
    // The camera is around z=6. The group is moving forward.
    grp.children.forEach((child) => {
      // child.position.z is negative. groupRef.current.position.z is positive.
      // Total world Z = child.position.z + grp.position.z
      const worldZ = child.position.z + grp.position.z
      
      // If the object has passed behind the camera (e.g. worldZ > 10)
      if (worldZ > 10) {
        // Move it back by (gateCount * spacing)
        child.position.z -= (gateCount * spacing)
      }
    })
  })

  useEffect(() => {
    // Use a small timeout to ensure the DOM is fully painted and heights are calculated
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      })
      
      // The total distance to scroll through. 
      tl.to(scrollProxy.current, {
        z: 80, // Move forward 80 units over the entire page scroll for a faster, deeper feel
        ease: "none"
      })

      ScrollTrigger.refresh()
    }, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <group ref={groupRef}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -50]}>
        <planeGeometry args={[100, 200]} />
        <meshBasicMaterial color="#EAEAEA" />
      </mesh>

      {/* Generate Torii Gates & Trees */}
      {Array.from({ length: gateCount }).map((_, i) => {
        const zPos = -i * spacing
        return (
          <group key={i} position={[0, 0, zPos]}>
            <ToriiGate />
            
            {/* Randomize tree placement alongside the path */}
            {i % 2 === 0 && (
              <LowPolyTree position={[-5 - Math.random() * 2, 0, 0]} scale={1 + Math.random() * 0.5} />
            )}
            {i % 3 === 0 && (
              <LowPolyTree position={[5 + Math.random() * 2, 0, 0]} scale={0.8 + Math.random() * 0.4} />
            )}
          </group>
        )
      })}
    </group>
  )
}

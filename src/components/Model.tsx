import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { GLTF } from 'three-stdlib'

gsap.registerPlugin(ScrollTrigger)

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>
  materials: { PaletteMaterial001: THREE.MeshStandardMaterial }
}

export default function Model(props: any) {
  const { nodes, materials } = useGLTF('/models/asus_rog_zephyrus_duo_17-transformed.glb') as unknown as GLTFResult
  const lidRef = useRef<THREE.Group>(null)
  const modelRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!lidRef.current) return
    
    // Use a proxy object for GSAP to properly animate the Euler rotation
    const lidProxy = { x: -Math.PI / 2 } // Start closed
    lidRef.current.rotation.x = lidProxy.x

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "+=600", // animate over first 600px of scroll
        scrub: 1,
      }
    })

    tl.to(lidProxy, {
      x: 2.967, // Fully open
      ease: "power2.out",
      onUpdate: () => {
        if (lidRef.current) {
          lidRef.current.rotation.x = lidProxy.x
        }
      }
    })

    return () => {
      tl.kill()
    }
  }, [])

  // Apply warm copper rim light to the main material and clear others
  useEffect(() => {
    if (materials.PaletteMaterial001) {
      materials.PaletteMaterial001.emissive = new THREE.Color('#D9782E')
      materials.PaletteMaterial001.emissiveIntensity = 0.1
      materials.PaletteMaterial001.roughness = 0.4
    }
    
    // Remove default wallpaper maps only from meshes that act as screens
    const screenNodes = [nodes.mesh_4, nodes.mesh_4_1, nodes.mesh_5, nodes.mesh_5_1, nodes.mesh_5_2, nodes.mesh_6]
    screenNodes.forEach((node: any) => {
      if (node && node.isMesh && node.material) {
        const mats = Array.isArray(node.material) ? node.material : [node.material]
        mats.forEach((mat: any) => {
          // The Asus ROG wallpaper is an emissive map. We only want to remove that, not the chassis colors.
          if (mat.name.toLowerCase().includes('screen') || mat.name.toLowerCase().includes('wallpaper') || mat.emissiveMap) {
            mat.map = null
            mat.emissiveMap = null
            mat.emissiveIntensity = 0
            mat.color = new THREE.Color('#0E0C0A') // dark screen
            mat.needsUpdate = true
          }
        })
      }
    })
  }, [materials, nodes])

  useFrame((state, delta) => {
    if (!modelRef.current) return
    
    // Bug 4 Fix: Only apply parallax when at the top (hero section)
    if (window.scrollY < 100) {
      // Clamp to max ~5 degrees (0.08 rads)
      const targetX = THREE.MathUtils.clamp(state.pointer.x * 0.08, -0.08, 0.08)
      const targetY = THREE.MathUtils.clamp(state.pointer.y * 0.08, -0.08, 0.08)
      
      modelRef.current.rotation.y = THREE.MathUtils.damp(modelRef.current.rotation.y, targetX, 4, delta)
      modelRef.current.rotation.x = THREE.MathUtils.damp(modelRef.current.rotation.x, -targetY, 4, delta)
    } else {
      // Smoothly return to center when scrolling
      modelRef.current.rotation.y = THREE.MathUtils.damp(modelRef.current.rotation.y, 0, 4, delta)
      modelRef.current.rotation.x = THREE.MathUtils.damp(modelRef.current.rotation.x, 0, 4, delta)
    }
  })

  return (
    <group ref={modelRef} {...props} dispose={null} scale={5} position={[0, -1, 0]}>
      {/* Base / Keyboard */}
      <mesh geometry={nodes.mesh_0.geometry} material={materials.PaletteMaterial001} position={[0, 0.134, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.mesh_1.geometry} material={nodes.mesh_1.material} position={[0, 0.137, 0]} rotation={[-1.396, 0, 0]} />
      <mesh geometry={nodes.mesh_2.geometry} material={nodes.mesh_2.material} position={[0, 0.134, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.mesh_3.geometry} material={nodes.mesh_3.material} position={[0, 0.137, 0]} rotation={[-1.396, 0, 0]} />
      <mesh geometry={nodes.mesh_9.geometry} material={nodes.mesh_9.material} position={[0, 0.134, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.mesh_10.geometry} material={nodes.mesh_10.material} position={[0, 0.134, 0]} rotation={[-Math.PI / 2, 0, 0]} />

      {/* Lid / Screen - Pivots around Z=-0.241 */}
      <group ref={lidRef} position={[0, 0.112, -0.241]}>
        <group>
          <mesh geometry={nodes.mesh_4.geometry} material={nodes.mesh_4.material} />
          <mesh geometry={nodes.mesh_4_1.geometry} material={nodes.mesh_4_1.material} />
        </group>
        <group>
          <mesh geometry={nodes.mesh_5.geometry} material={nodes.mesh_5.material} />
          <mesh geometry={nodes.mesh_5_1.geometry} material={nodes.mesh_5_1.material} />
          <mesh geometry={nodes.mesh_5_2.geometry} material={nodes.mesh_5_2.material} />
        </group>
        {/* Screen meshes - Assume mesh_6 is the main display panel */}
        <mesh geometry={nodes.mesh_6.geometry} material={nodes.mesh_6.material}>
          {/* Bug 1 Fix: Rotation [0, 0, Math.PI] to fix upside-down & mirrored text. Removed occlude to fix flipping issues. */}
          <Html 
            transform 
            position={[0, 0.125, -0.015]} // adjusted slightly relative to hinge to sit on screen
            rotation={[0, Math.PI, 0]} // Fix horizontal mirroring
            scale={0.05}
          >
            <div className="w-[600px] h-[340px] bg-bg-base text-text-primary flex flex-col justify-center items-center rounded-sm border border-transparent">
               <h1 className="text-5xl font-heading font-bold text-accent-primary mb-4 tracking-tight">John Doe</h1>
               <p className="text-xl text-text-secondary text-center px-8">Computer Science student<br/>Full-stack + creative dev</p>
            </div>
          </Html>
        </mesh>
        <mesh geometry={nodes.mesh_7.geometry} material={nodes.mesh_7.material} />
        <mesh geometry={nodes.mesh_8.geometry} material={nodes.mesh_8.material} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/asus_rog_zephyrus_duo_17-transformed.glb')

import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CameraRig() {
  const { camera } = useThree()
  const camProxy = useRef({ x: 0, y: 1, z: 6, lookX: 0, lookY: 0, lookZ: 0 })

  useEffect(() => {
    // Initial hero framing: zoomed in, laptop fills 50-60% of screen
    camera.position.set(0, 1, 6)
    camera.lookAt(0, 0, 0)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    })

    // Hero -> About
    tl.to(camProxy.current, {
      x: -3, y: 2, z: 4, 
      lookX: 1, lookY: 0, lookZ: -1,
      ease: "power2.inOut"
    }, "about")

    // About -> Skills
    tl.to(camProxy.current, {
      x: 4, y: 4, z: 4,
      lookX: 0, lookY: 0, lookZ: 0,
      ease: "power2.inOut"
    }, "skills")

    // Skills -> Projects
    tl.to(camProxy.current, {
      x: 0, y: 1.5, z: 2.5,
      lookX: 0, lookY: -0.5, lookZ: -0.5,
      ease: "power2.inOut"
    }, "projects")

    // Projects -> Contact
    tl.to(camProxy.current, {
      x: 0, y: 1, z: 7,
      lookX: 0, lookY: 0, lookZ: 0,
      ease: "power2.inOut"
    }, "contact")

    return () => {
      tl.kill()
    }
  }, [camera])

  useFrame(() => {
    camera.position.set(camProxy.current.x, camProxy.current.y, camProxy.current.z)
    camera.lookAt(camProxy.current.lookX, camProxy.current.lookY, camProxy.current.lookZ)
  })
  
  return null
}

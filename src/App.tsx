import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import UIOverlay from './components/UIOverlay'
import Nav from './components/Nav'

export default function App() {
  const [act, setAct] = useState<1 | 2>(1)
  const [isWarping, setIsWarping] = useState(false)

  const toggleAct = (targetAct?: 1 | 2) => {
    const nextAct = targetAct !== undefined ? targetAct : (act === 1 ? 2 : 1)
    if (nextAct === act) return

    setIsWarping(true)
    setTimeout(() => {
      setAct(nextAct)
      window.scrollTo({ top: 0, behavior: 'instant' })
      setTimeout(() => {
        setIsWarping(false)
      }, 500)
    }, 600)
  }

  return (
    <div className={`${act === 1 ? 'bg-[#eef2f6] text-[#161216]' : 'bg-[#161216] text-[#fffcfc]'} min-h-screen relative selection:bg-[#c93b2b] selection:text-white transition-colors duration-700`}>
      {/* Warp Transition Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black pointer-events-none transition-opacity duration-500 ${
          isWarping ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* Navigation Header with Act Switcher */}
      <Nav act={act} onToggleAct={toggleAct} />
      
      {/* Fixed Fullscreen 3D Canvas Background */}
      <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 2.4, 7], fov: 46 }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          {/* Background & Fog according to Act */}
          {act === 1 ? (
            <>
              <color attach="background" args={['#eef2f6']} />
              <fog attach="fog" args={['#eef2f6', 16, 80]} />
              <ambientLight intensity={0.9} color="#ffffff" />
              <directionalLight position={[10, 16, 8]} intensity={1.2} color="#ffffff" />
              <directionalLight position={[-10, 8, -5]} intensity={0.4} color="#d4e4f7" />
            </>
          ) : (
            <>
              <color attach="background" args={['#161216']} />
              <fog attach="fog" args={['#161216', 12, 60]} />
              <ambientLight intensity={0.4} color="#ffffff" />
              <pointLight position={[0, 10, 0]} intensity={1.5} color="#c93b2b" />
              <directionalLight position={[5, 10, 5]} intensity={0.8} color="#ffffff" />
            </>
          )}
          
          <Scene act={act} isWarping={isWarping} />
        </Canvas>
      </div>

      {/* Foreground Interactive Content */}
      <UIOverlay act={act} onContinue={() => toggleAct(2)} onSwitchAct={toggleAct} />
    </div>
  )
}

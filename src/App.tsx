import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import UIOverlay from './components/UIOverlay'
import Nav from './components/Nav'
import Preloader from './components/Preloader'

export default function App() {
  const [act, setAct] = useState<1 | 2>(1)
  const [isWarping, setIsWarping] = useState(false)
  const [, setLoaded] = useState(false)
  // warpPhase drives the renaud-style wireframe transition in Scene
  // 'idle' | 'wireframe' | 'zoomout' | 'zoomin'
  const [warpPhase, setWarpPhase] = useState<'idle' | 'wireframe' | 'zoomout' | 'zoomin'>('idle')

  const toggleAct = (targetAct?: 1 | 2) => {
    const nextAct = targetAct !== undefined ? targetAct : (act === 1 ? 2 : 1)
    if (nextAct === act) return

    // Phase 1: go wireframe (0 → 600ms)
    setIsWarping(true)
    setWarpPhase('wireframe')

    // Phase 2: zoom out (600ms → 1100ms)
    setTimeout(() => {
      setWarpPhase('zoomout')
    }, 600)

    // Phase 3: switch act + start zoom in (1100ms → 1700ms)
    setTimeout(() => {
      setAct(nextAct)
      window.scrollTo({ top: 0, behavior: 'instant' })
      setWarpPhase('zoomin')
    }, 1100)

    // Phase 4: done (1700ms)
    setTimeout(() => {
      setIsWarping(false)
      setWarpPhase('idle')
    }, 1800)
  }

  return (
    <div className={`${act === 1 ? 'bg-[#eef2f6] text-[#161216]' : 'bg-[#161216] text-[#fffcfc]'} min-h-screen relative selection:bg-[#c93b2b] selection:text-white transition-colors duration-700`}>
      {/* Authentic Initial Preloader Screen */}
      <Preloader onLoaded={() => setLoaded(true)} />

      {/* Warp Transition Overlay — only flashes black at the exact act-switch moment */}
      <div 
        className="fixed inset-0 z-50 bg-black pointer-events-none"
        style={{
          opacity:
            warpPhase === 'wireframe' ? 0       // transparent — show 3D wireframe
          : warpPhase === 'zoomout'  ? 0       // transparent — show zoom-out
          : warpPhase === 'zoomin'   ? 0       // transparent — show zoom-in of new act
          : 0,                                  // idle — transparent
          transition: warpPhase === 'zoomin' ? 'opacity 0.4s ease-out' : 'none',
        }}
      />

      {/* Navigation Header with Act Switcher */}
      <Nav act={act} onToggleAct={toggleAct} />
      
      {/* Fixed Fullscreen 3D Canvas Background */}
      <div className={`fixed inset-0 w-screen h-screen z-0 ${act === 2 ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <Canvas
          shadows
          camera={{ position: [0, 2.4, 7], fov: 46 }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          {/* Background & Fog: pure black during wireframe/zoomout so skeleton lines pop */}
          {(warpPhase === 'wireframe' || warpPhase === 'zoomout') ? (
            <>
              <color attach="background" args={['#000000']} />
              <ambientLight intensity={1.5} color="#ffffff" />
            </>
          ) : act === 1 ? (
            <>
              <color attach="background" args={['#eef2f6']} />
              <fog attach="fog" args={['#eef2f6', 16, 80]} />
              <ambientLight intensity={0.3} color="#ffffff" />
              <directionalLight 
                castShadow
                position={[15, 20, 10]} 
                intensity={2.5} 
                color="#ffffff" 
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-left={-30}
                shadow-camera-right={30}
                shadow-camera-top={30}
                shadow-camera-bottom={-30}
                shadow-camera-far={100}
                shadow-bias={-0.0005}
              />
              <directionalLight position={[-10, 8, -5]} intensity={0.8} color="#d4e4f7" />
            </>
          ) : (
            <>
              <color attach="background" args={['#0e0c10']} />
              <fog attach="fog" args={['#0e0c10', 80, 250]} />
              <ambientLight intensity={0.4} color="#2b2838" />
              {/* Key directional light — crisp highlights on low-poly facets */}
              <directionalLight position={[-8, 14, 8]} intensity={2.8} color="#fff6eb" />
              {/* Deep cosmic rim / back-light — stunning edge glow on planet & ring */}
              <directionalLight position={[12, -4, -15]} intensity={2.2} color="#48cae4" />
              {/* Subtle crimson fill from core */}
              <pointLight position={[5, 2, -10]} intensity={1.5} color="#c93b2b" distance={25} />
            </>
          )}
          
          <Scene act={act} isWarping={isWarping} warpPhase={warpPhase} />
        </Canvas>
      </div>

      {/* Foreground Interactive Content — hidden during warp transition */}
      <div
        style={{
          opacity: isWarping ? 0 : 1,
          transition: isWarping ? 'none' : 'opacity 0.5s ease-in',
          pointerEvents: isWarping ? 'none' : 'auto',
        }}
      >
        <UIOverlay act={act} onContinue={() => toggleAct(2)} onSwitchAct={toggleAct} />
      </div>
    </div>
  )
}

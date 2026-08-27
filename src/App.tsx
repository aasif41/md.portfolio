import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import UIOverlay from './components/UIOverlay'
import Nav from './components/Nav'

export default function App() {
  return (
    <div className="bg-[#eef2f6] min-h-screen text-[#111111] relative selection:bg-[#c93b2b] selection:text-white">
      {/* Navigation Header */}
      <Nav />
      
      {/* Fixed Fullscreen 3D Japanese Canvas Background */}
      <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 2.4, 7], fov: 46 }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          {/* Light Sky & Soft Fog */}
          <color attach="background" args={['#eef2f6']} />
          <fog attach="fog" args={['#eef2f6', 16, 80]} />
          
          {/* Natural Sunlight & Ambient Fill */}
          <ambientLight intensity={0.9} color="#ffffff" />
          <directionalLight position={[10, 16, 8]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-10, 8, -5]} intensity={0.4} color="#d4e4f7" />
          
          <Scene />
        </Canvas>
      </div>

      {/* Foreground Scrollable Content */}
      <UIOverlay />
    </div>
  )
}

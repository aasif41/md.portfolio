import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import UIOverlay from './components/UIOverlay'
import Nav from './components/Nav'
import HUD from './components/HUD'

export default function App() {
  return (
    <div className="bg-[#0e0e0e] min-h-screen text-[#f0ece4] relative selection:bg-[#c93b2b] selection:text-white">
      {/* Cyber-Japanese HUD Telemetry Frame */}
      <HUD />

      {/* Navigation Header */}
      <Nav />
      
      {/* Fixed Fullscreen 3D Japanese Canvas */}
      <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 2.3, 7], fov: 48 }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <color attach="background" args={['#0e1110']} />
          <fog attach="fog" args={['#0e1110', 14, 75]} />
          
          {/* Cinematic Atmosphere Lighting */}
          <ambientLight intensity={0.65} />
          <directionalLight position={[6, 14, 6]} intensity={1.1} color="#fff4e8" />
          <directionalLight position={[-8, 8, -10]} intensity={0.5} color="#ff6633" />
          <pointLight position={[0, 4, 2]} intensity={1.2} color="#ff9944" distance={30} decay={2} />
          
          <Scene />
        </Canvas>
      </div>

      {/* Foreground Scrollable Content */}
      <UIOverlay />
    </div>
  )
}

import { useProgress } from '@react-three/drei'

export default function LoadingScreen({ onStarted }: { onStarted: () => void }) {
  const { progress } = useProgress()

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-base text-text-primary transition-opacity duration-500">
      <div className="text-3xl font-heading font-medium mb-6 text-accent-primary tracking-widest uppercase">
        Loading
      </div>
      
      <div className="w-64 h-[2px] bg-bg-surface overflow-hidden">
        <div 
          className="h-full bg-accent-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="mt-4 text-text-secondary font-mono text-sm tracking-widest">
        {Math.round(progress)}%
      </div>

      {progress === 100 && (
        <button
          className="mt-12 px-8 py-3 border border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-bg-base transition-colors uppercase tracking-[0.2em] text-sm rounded animate-pulse"
          onClick={onStarted}
        >
          Enter
        </button>
      )}
    </div>
  )
}

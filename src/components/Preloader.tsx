import { useState, useEffect } from 'react'

export default function Preloader({ onLoaded }: { onLoaded?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setFadeOut(true), 400)
          setTimeout(() => {
            setHidden(true)
            if (onLoaded) onLoaded()
          }, 1000)
          return 100
        }
        return prev + Math.floor(Math.random() * 18 + 12)
      })
    }, 120)

    return () => clearInterval(interval)
  }, [onLoaded])

  if (hidden) return null

  return (
    <div 
      className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center select-none transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated Icon Container */}
      <div className="relative mb-6 flex flex-col items-center">
        {/* Pixel / Stylized Cat Silhouette */}
        <div className="w-16 h-12 relative mb-2 flex items-center justify-center animate-bounce">
          <svg viewBox="0 0 48 36" className="w-14 h-10 fill-[#161216]">
            <path d="M6 8 L14 0 L18 8 L30 8 L34 0 L42 8 L44 26 L38 34 L10 34 L4 26 Z" />
            <circle cx="16" cy="18" r="2.5" fill="#ffffff" />
            <circle cx="32" cy="18" r="2.5" fill="#ffffff" />
            <polygon points="24,21 21,24 27,24" fill="#c93b2b" />
          </svg>
        </div>

        {/* Progress Bar */}
        <div className="w-44 h-1 bg-black/10 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-[#161216] transition-all duration-200" 
            style={{ width: `${Math.min(progress, 100)}%` }} 
          />
        </div>
      </div>

      {/* Preloader Text Matching Renaud Rohlinger */}
      <h3 className="text-[11px] font-mono tracking-[0.25em] text-[#161216] font-semibold uppercase mb-1">
        PRELOADING SCENE [{Math.min(progress, 100)}%]
      </h3>

      <h4 className="text-xs jp font-bold text-[#666] tracking-wider">
        ちょっと待ってください...
      </h4>
    </div>
  )
}

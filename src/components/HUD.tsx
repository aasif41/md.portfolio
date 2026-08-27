import { useState, useEffect } from 'react'

export default function HUD() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0) {
        setScrollProgress(Math.round((window.scrollY / total) * 100))
      }
    }

    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }

    window.addEventListener('scroll', updateScroll, { passive: true })
    const timer = setInterval(updateTime, 1000)
    updateTime()

    return () => {
      window.removeEventListener('scroll', updateScroll)
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none">
      {/* Sub-header Telemetry Bar (Left) */}
      <div className="absolute top-20 left-8 md:left-14 flex items-center gap-2.5 opacity-60">
        <span className="text-[9px] font-mono tracking-widest text-[#ffaa66]">SYS // 2026</span>
        <span className="text-[9px] font-mono text-[#555]">|</span>
        <span className="text-[9px] font-mono text-[#888]">DELHI [28.6139° N, 77.2090° E]</span>
      </div>

      {/* Sub-header Telemetry Bar (Right) */}
      <div className="absolute top-20 right-8 md:right-14 flex items-center gap-3 opacity-80">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[9px] font-mono text-[#f0ece4]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38b000] animate-pulse" />
          <span>STATUS // AVAILABLE</span>
        </div>
        <span className="text-[9px] font-mono text-[#777] hidden md:inline">{time} IST</span>
      </div>

      {/* Bottom Left Corner Coordinate Display */}
      <div className="absolute bottom-6 left-8 md:left-14 flex items-center gap-3">
        <span className="text-[10px] font-mono text-[#666] tracking-widest uppercase">
          MD AASIF · BSC (HONS) CS
        </span>
        <span className="text-[10px] font-mono text-[#333]">/</span>
        <span className="text-[10px] font-mono text-[#c93b2b]">創造性と技術</span>
      </div>

      {/* Bottom Right Scroll Telemetry & Progress Indicator */}
      <div className="absolute bottom-6 right-8 md:right-14 flex items-center gap-4">
        {/* Animated Visualizer Bars */}
        <div className="hidden md:flex items-end gap-[3px] h-4">
          <span className="w-[2px] bg-[#c93b2b] animate-[bounce_1s_infinite_100ms] h-2" />
          <span className="w-[2px] bg-[#ffaa66] animate-[bounce_1s_infinite_300ms] h-3.5" />
          <span className="w-[2px] bg-[#c93b2b] animate-[bounce_1s_infinite_200ms] h-1.5" />
          <span className="w-[2px] bg-[#ffaa66] animate-[bounce_1s_infinite_400ms] h-4" />
        </div>

        {/* Scroll percentage */}
        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-xs font-bold text-[#f0ece4]">{String(scrollProgress).padStart(3, '0')}</span>
          <span className="text-[10px] text-[#666]">%</span>
        </div>

        {/* Vertical mini progress bar */}
        <div className="w-[2px] h-8 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="w-full bg-[#c93b2b] transition-all duration-150"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Screen Frame Decorative Corner Marks */}
      <div className="absolute top-4 left-4 text-xs font-mono text-white/20">┌</div>
      <div className="absolute top-4 right-4 text-xs font-mono text-white/20">┐</div>
      <div className="absolute bottom-4 left-4 text-xs font-mono text-white/20">└</div>
      <div className="absolute bottom-4 right-4 text-xs font-mono text-white/20">┘</div>
    </div>
  )
}

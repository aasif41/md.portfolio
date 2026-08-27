import { useEffect } from 'react'

// This component wires the drei ScrollControls internal scroll to section visibility
// It listens to the drei scroll div and fades panels in/out
export default function ScrollWatcher() {
  useEffect(() => {
    // drei ScrollControls creates a div with overflow-y scroll — find it
    const findScrollEl = () => {
      // It's the first fixed div with overflow-y scroll inside the canvas wrapper
      const allDivs = document.querySelectorAll('div')
      for (const d of allDivs) {
        const style = window.getComputedStyle(d)
        if (style.overflow === 'hidden scroll' || style.overflowY === 'scroll') {
          return d
        }
      }
      return null
    }

    let scrollEl: Element | null = null
    const tryFind = () => {
      scrollEl = findScrollEl()
      if (!scrollEl) {
        setTimeout(tryFind, 200)
        return
      }
      scrollEl.addEventListener('scroll', onScroll)
      onScroll()
    }

    const panels = [
      { id: 'About', start: 0.12, end: 0.35 },
      { id: 'Skills', start: 0.35, end: 0.55 },
      { id: 'Projects', start: 0.55, end: 0.78 },
      { id: 'Contact', start: 0.78, end: 1.0 },
    ]

    const onScroll = () => {
      if (!scrollEl) return
      const el = scrollEl as HTMLElement
      const progress = el.scrollTop / (el.scrollHeight - el.clientHeight)

      panels.forEach(({ id, start, end }) => {
        const panel = document.getElementById(id)
        if (!panel) return

        const inRange = progress >= start && progress < end
        const mid = (start + end) / 2
        const dist = Math.abs(progress - mid) / ((end - start) / 2)
        const opacity = Math.max(0, 1 - dist * 1.4)

        panel.style.opacity = String(inRange ? opacity : 0)
        panel.style.pointerEvents = inRange && opacity > 0.3 ? 'auto' : 'none'
        panel.style.transform = panel.style.transform.includes('translate(-50%, -50%)')
          ? `translate(-50%, calc(-50% + ${inRange ? 0 : 20}px))`
          : `translateY(calc(-50% + ${inRange ? 0 : 20}px))`
        panel.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      })
    }

    tryFind()

    return () => {
      if (scrollEl) scrollEl.removeEventListener('scroll', onScroll)
    }
  }, [])

  return null
}

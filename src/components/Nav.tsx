import { useState, useEffect } from 'react'

export default function Nav() {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  const links = [
    { id: 'hero', label: 'Home', jp: '起点' },
    { id: 'about', label: 'About', jp: '自己紹介' },
    { id: 'skills', label: 'Skills', jp: '技術' },
    { id: 'projects', label: 'Projects', jp: '実績' },
    { id: 'contact', label: 'Contact', jp: '連絡' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = links.map(l => document.getElementById(l.id))
      const scrollPosition = window.scrollY + window.innerHeight * 0.35

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i]
        if (el && scrollPosition >= el.offsetTop) {
          setActive(links[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-14 py-5 flex justify-between items-center transition-all duration-300 ${
      scrolled ? 'bg-[#0e0e0e]/85 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-transparent'
    }`}>
      {/* Brand logo */}
      <button 
        onClick={() => scrollTo('hero')}
        className="font-bold text-sm tracking-[0.3em] text-[#f0ece4] uppercase hover:text-[#ffaa66] transition-colors cursor-pointer group flex items-center gap-2"
      >
        <span className="w-2 h-2 bg-[#c93b2b] rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-300" />
        <span>MD AASIF</span>
      </button>

      {/* Nav items with Japanese micro sub-labels */}
      <ul className="flex gap-6 md:gap-9 list-none m-0 p-0">
        {links.map((link) => (
          <li key={link.id}>
            <button
              onClick={() => scrollTo(link.id)}
              className={`flex flex-col items-center group cursor-pointer transition-all duration-300`}
            >
              <span className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors ${
                active === link.id
                  ? 'text-[#ffaa66] font-semibold drop-shadow-[0_0_8px_rgba(255,170,102,0.5)]'
                  : 'text-[#888880] group-hover:text-[#f0ece4]'
              }`}>
                {link.label}
              </span>
              <span className={`text-[9px] font-mono transition-opacity ${
                active === link.id ? 'text-[#c93b2b] opacity-100' : 'text-[#555] opacity-0 group-hover:opacity-60'
              }`}>
                {link.jp}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

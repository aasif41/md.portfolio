import { useState, useEffect } from 'react'

export default function Nav() {
  const [active, setActive] = useState('hero')
  const [lang, setLang] = useState<'EN' | 'JP'>('EN')

  const links = [
    { id: 'projects', label: 'Works' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'about', 'skills', 'contact'].map(id => document.getElementById(id))
      const scrollPosition = window.scrollY + window.innerHeight * 0.35

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i]
        if (el && scrollPosition >= el.offsetTop) {
          setActive(el.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-14 py-6 flex justify-between items-center bg-transparent select-none">
      {/* Brand logo */}
      <button 
        onClick={() => scrollTo('hero')}
        className="font-black text-sm tracking-[0.3em] text-[#111] uppercase hover:text-[#c93b2b] transition-colors cursor-pointer"
      >
        MD AASIF
      </button>

      {/* Nav items + Language Toggle */}
      <div className="flex items-center gap-6 md:gap-9">
        <ul className="flex gap-6 md:gap-8 list-none m-0 p-0">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className={`text-xs uppercase tracking-[0.2em] font-mono transition-colors cursor-pointer ${
                  active === link.id
                    ? 'text-[#c93b2b] font-bold underline underline-offset-4'
                    : 'text-[#444] hover:text-[#111]'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Language switch button [ EN / JP ] */}
        <button
          onClick={() => setLang(l => l === 'EN' ? 'JP' : 'EN')}
          className="px-2.5 py-1 text-[11px] font-mono border border-black/20 rounded bg-white/60 hover:bg-white text-[#222] font-semibold transition-all cursor-pointer"
        >
          {lang}
        </button>
      </div>
    </nav>
  )
}

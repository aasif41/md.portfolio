import { Globe, Shrub } from 'lucide-react'

interface NavProps {
  act: 1 | 2
  onToggleAct: (act?: 1 | 2) => void
}

export default function Nav({ act, onToggleAct }: NavProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-8 md:px-14 py-6 flex justify-between items-center bg-transparent select-none pointer-events-auto">
      {/* Brand logo */}
      <button 
        onClick={() => {
          if (act !== 1) onToggleAct(1)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className={`font-bold text-sm tracking-[0.25em] en uppercase hover:text-[#c93b2b] transition-colors cursor-pointer ${
          act === 1 ? 'text-[#161216]' : 'text-white'
        }`}
      >
        MD AASIF
      </button>

      {/* Nav items & Act Toggle */}
      <div className="flex items-center gap-6 md:gap-8">
        {act === 2 && (
          <ul className="hidden md:flex gap-6 list-none m-0 p-0">
            {['projects', 'skills', 'contact'].map((id) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className="text-xs uppercase tracking-[0.2em] en text-[#aaa] hover:text-white transition-colors cursor-pointer"
                >
                  {id}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Act Switcher Pill */}
        <button
          onClick={() => onToggleAct()}
          className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer flex items-center gap-2 border shadow-sm ${
            act === 1
              ? 'bg-white/80 border-black/10 text-[#161216] hover:bg-white hover:border-[#c93b2b]'
              : 'bg-white/[0.08] border-white/20 text-white hover:bg-white/[0.15] hover:border-[#c93b2b]'
          }`}
        >
          {act === 1 ? (
            <><Globe size={12} /> Galaxy Act</>
          ) : (
            <><Shrub size={12} /> Shrine Act</>
          )}
        </button>
      </div>
    </nav>
  )
}

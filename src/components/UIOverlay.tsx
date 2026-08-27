import { useState, useEffect } from 'react'
import {
  Briefcase,
  Zap,
  GitMerge,
  Coffee,
  Globe,
  MapPin,
  Clock,
  Copy,
  Check,
  Download,
  ArrowRight,
  Star,
  ChevronDown,
  Shrub,
} from 'lucide-react'

interface UIOverlayProps {
  act: 1 | 2
  onContinue: () => void
  onSwitchAct: (act: 1 | 2) => void
}

const TOPICS = [
  { label: 'Full-Time Role 2026', icon: <Briefcase size={12} /> },
  { label: '3D Project',          icon: <Globe size={12} /> },
  { label: 'Open-Source Collab',  icon: <GitMerge size={12} /> },
  { label: 'Tech Chat',           icon: <Coffee size={12} /> },
]

export default function UIOverlay({ act, onContinue, onSwitchAct }: UIOverlayProps) {
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [message, setMessage] = useState('')
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0].label)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@mdaasif.dev')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="relative z-10 w-full pointer-events-none">
      {act === 1 ? (
        /* ========================================================================= */
        /* ============================ ACT 1: SAKURA SHRINE ======================= */
        /* ========================================================================= */
        <div className="text-[#161216]">
          {/* Hero Viewport */}
          <section className="h-screen flex flex-col justify-between p-8 md:p-14 select-none relative">
            <div className="max-w-xl pointer-events-auto pt-4">
              {/* Minimal Tiny Japanese Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-black/10 text-[10px] font-mono text-[#555] mb-3 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#c93b2b] animate-ping" />
                <span className="jp font-bold text-[#c93b2b]">ムハンマド アースィフ</span>
                <span className="text-[#888]">/</span>
                <span className="en font-bold uppercase tracking-wider text-[#161216]">2026</span>
              </div>

              {/* Clean Main Title */}
              <h1 className="text-4xl md:text-7xl font-bold en tracking-tight text-[#161216] mb-2 leading-none">
                MD AASIF
              </h1>

              {/* SubJob Title */}
              <h2 className="text-sm md:text-lg font-bold en tracking-wider text-[#161216] uppercase mb-4">
                Creative Full-Stack Developer & 3D Engineer
              </h2>

              {/* SubDescription */}
              <div className="text-sm md:text-base text-[#222] font-light leading-relaxed max-w-md mb-8">
                <p>
                  Final-year <strong className="font-bold text-[#161216]">BSc (Hons) Computer Science</strong> student. My main objective is to make cool WebGL 3D interactive experiences and scalable distributed systems accessible for everyone on the internet.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onContinue}
                  className="px-8 py-3.5 bg-[#161216] text-white font-mono text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-[#c93b2b] transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2 group"
                >
                  <span>Explore Universe</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Rotated Handle */}
            <div className="fixed top-12 right-8 md:right-12 pointer-events-auto hidden md:block">
              <a
                href="https://github.com/aasif41"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold en tracking-[0.2em] text-[#161216] hover:text-[#c93b2b] transition-colors"
                style={{ writingMode: 'vertical-rl' }}
              >
                @mdaasif // 2026
              </a>
            </div>

            {/* Scroll indicator */}
            <div className="flex flex-col items-center justify-center pb-4 pointer-events-none">
              <span className="text-[11px] font-bold en tracking-[0.25em] uppercase text-[#161216] mb-2">
                SCROLL TO START
              </span>
              <ChevronDown size={18} className="text-[#161216] animate-bounce" />
            </div>
          </section>

          {/* Act 1 Scroll Travel & Clean Click to Continue Prompt */}
          <section className="h-screen flex flex-col items-center justify-center p-8 select-none">
            <button
              onClick={onContinue}
              className="pointer-events-auto group cursor-pointer text-center p-8 transition-transform duration-300 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2 text-xs font-mono tracking-[0.3em] uppercase text-[#c93b2b] font-bold mb-4">
                <Star size={11} className="animate-pulse" />
                EXPLORE WORKS & GALAXY
                <Star size={11} className="animate-pulse" />
              </span>
              <h2
                className="text-5xl md:text-8xl font-black en tracking-tight transition-all duration-300 text-transparent group-hover:text-[#161216]"
                style={{ WebkitTextStroke: '2px #161216' }}
              >
                Click to continue
              </h2>
              <span className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-[#161216] text-white text-xs font-mono tracking-[0.2em] uppercase rounded-full group-hover:bg-[#c93b2b] transition-colors shadow-lg">
                Enter Project Universe
                <ArrowRight size={13} />
              </span>
            </button>
          </section>
        </div>
      ) : (
        /* ========================================================================= */
        /* ============================ ACT 2: DETECTIVE GALAXY ==================== */
        /* ========================================================================= */
        <div className="text-[#fffcfc] min-h-screen">
          {/* Works & Recognitions Section */}
          <section id="projects" className="min-h-screen px-8 md:px-14 py-20 relative">
            <div className="max-w-6xl mx-auto">
              {/* Header & Floating Preview */}
              <div className="grid md:grid-cols-2 gap-8 items-start mb-16 pointer-events-auto">
                <div>
                  <h1 className="text-4xl md:text-7xl font-bold en tracking-tight mb-4">
                    Last Project recognitions
                  </h1>
                  <h2 className="text-xl md:text-2xl font-bold en text-[#c93b2b] mb-6">
                    <a href="https://github.com/aasif41" target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-2">
                      3D Odyssey & Systems
                      <ArrowRight size={20} />
                    </a>
                  </h2>

                  {/* Recognitions List */}
                  <div className="space-y-3 font-mono text-xs md:text-sm text-[#bbb] mb-8">
                    <div className="p-3.5 bg-white/[0.05] rounded-xl border border-white/10 flex justify-between items-center hover:border-[#c93b2b] transition-all">
                      <span>2026 | 3D Japanese Shrine Odyssey</span>
                      <span className="text-[#c93b2b] font-bold">[ WebGL / R3F ]</span>
                    </div>
                    <div className="p-3.5 bg-white/[0.05] rounded-xl border border-white/10 flex justify-between items-center hover:border-[#c93b2b] transition-all">
                      <span>2025 | Cloud Collaborative Workspace</span>
                      <span className="text-[#c93b2b] font-bold">[ Distributed TS ]</span>
                    </div>
                    <div className="p-3.5 bg-white/[0.05] rounded-xl border border-white/10 flex justify-between items-center hover:border-[#c93b2b] transition-all">
                      <span>2025 | Neural Hand Gesture 3D Control</span>
                      <span className="text-[#c93b2b] font-bold">[ AI / Vision ]</span>
                    </div>
                    <div className="p-3.5 bg-white/[0.05] rounded-xl border border-white/10 flex justify-between items-center hover:border-[#c93b2b] transition-all">
                      <span>2025 | Microservices Async Benchmark</span>
                      <span className="text-[#c93b2b] font-bold">[ Go / gRPC ]</span>
                    </div>
                  </div>
                </div>

                {/* Floating Preview Window */}
                <div className="p-6 bg-white/[0.04] backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
                  <div className="w-full h-56 bg-gradient-to-br from-[#c93b2b]/20 to-black rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-white/10 mb-4">
                    <Globe size={36} className="text-[#c93b2b] mb-3" />
                    <span className="text-xs font-mono uppercase tracking-widest text-[#c93b2b] font-bold">Interactive 3D Galaxy Viewport</span>
                    <p className="text-xs text-[#888] mt-1 max-w-xs">Real-time WebGL rendering with physics simulation and dynamic lighting.</p>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono text-[#aaa]">
                    <span>STATUS: ONLINE</span>
                    <span>120 FPS WEBGL</span>
                  </div>
                </div>
              </div>

              {/* Big Section Headline */}
              <div className="text-center my-14 pointer-events-auto">
                <h2 className="text-3xl md:text-6xl font-light en tracking-wider mb-2">
                  3D Creative Web Developer
                </h2>
                <div className="w-16 h-[2px] bg-[#c93b2b] mx-auto mt-4" />
              </div>

              {/* Two-Column Editorial Story */}
              <div className="grid md:grid-cols-2 gap-10 mb-20 pointer-events-auto">
                <div className="p-8 bg-white/[0.03] rounded-3xl border border-white/10">
                  <h3 className="text-2xl font-bold en text-[#fffcfc] mb-4">
                    Tutorials & Articles
                  </h3>
                  <p className="text-sm md:text-base text-[#aaa] leading-relaxed font-light mb-4">
                    I write technical in-depth breakdowns on WebGL computer graphics, GLSL shaders, and distributed system architectures. You can explore my open-source code and experiments directly on GitHub.
                  </p>
                  <a
                    href="https://github.com/aasif41"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-[#c93b2b] hover:underline font-bold inline-flex items-center gap-1"
                  >
                    Follow on GitHub @aasif41
                    <ArrowRight size={11} />
                  </a>
                </div>

                <div className="p-8 bg-white/[0.03] rounded-3xl border border-white/10">
                  <h3 className="text-2xl font-bold en text-[#fffcfc] mb-4">
                    Education & Mission
                  </h3>
                  <p className="text-sm md:text-base text-[#aaa] leading-relaxed font-light mb-4">
                    Final-year BSc (Hons) Computer Science student graduating in 2026. Specialized in full-stack architecture, high-performance 3D rendering pipelines, and scalable backend infrastructure.
                  </p>
                  <span className="text-xs font-mono text-[#48cae4] font-bold">
                    Class of 2026 · Available for Full-Time Roles
                  </span>
                </div>
              </div>

              {/* Technical Stack */}
              <div id="skills" className="mb-20 pointer-events-auto">
                <div className="p-8 md:p-12 bg-white/[0.03] rounded-3xl border border-white/10">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c93b2b] font-bold block mb-4">
                    Technical Capabilities
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    {['React.js', 'TypeScript', 'Three.js', 'React Three Fiber', 'GLSL Shaders', 'Node.js', 'Python', 'Go', 'Docker', 'PostgreSQL', 'Redis', 'WebSockets', 'gRPC', 'Tailwind CSS'].map(tag => (
                      <span key={tag} className="px-4 py-2 bg-white/[0.05] rounded-xl border border-white/10 text-white font-medium hover:border-[#c93b2b] transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Transmission Terminal */}
              <div id="contact" className="mb-14 pointer-events-auto">
                <div className="p-8 md:p-14 bg-white/[0.04] backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-white/10">
                    <div>
                      <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#c93b2b] font-bold block mb-1">
                        04 // INITIATE TRANSMISSION
                      </span>
                      <h2 className="text-3xl md:text-5xl font-bold en text-[#fffcfc]">
                        Let's Build Together.
                      </h2>
                    </div>
                    <div className="p-3 bg-white/[0.05] rounded-xl border border-white/10 font-mono text-xs text-[#aaa] flex flex-col gap-1">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={10} className="text-[#c93b2b]" />
                        NEW DELHI, INDIA
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={10} className="text-[#aaa]" />
                        {currentTime} IST
                      </span>
                    </div>
                  </div>

                  {/* Topic Select Chips */}
                  <div className="mb-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#888] block mb-3">
                      Select Topic:
                    </span>
                    <div className="flex flex-wrap gap-2 font-mono text-xs">
                      {TOPICS.map(({ label, icon }) => (
                        <button
                          key={label}
                          onClick={() => setSelectedTopic(label)}
                          className={`px-4 py-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                            selectedTopic === label
                              ? 'bg-[#c93b2b] text-white border-[#c93b2b] font-bold'
                              : 'bg-white/[0.04] border-white/10 text-[#aaa] hover:bg-white/[0.08]'
                          }`}
                        >
                          {icon}
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Dispatcher */}
                  <div className="p-4 bg-black/40 rounded-2xl border border-white/10 mb-8">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message here..."
                      rows={3}
                      className="w-full bg-transparent p-2 text-sm font-sans text-white focus:outline-none resize-none"
                    />
                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                      <span className="text-xs font-mono text-[#888]">Destination: contact@mdaasif.dev</span>
                      <a
                        href={`mailto:contact@mdaasif.dev?subject=${encodeURIComponent(`[${selectedTopic}] Inquiry`)}&body=${encodeURIComponent(message)}`}
                        className="px-6 py-2 bg-[#c93b2b] text-white font-mono text-xs font-bold uppercase rounded-xl hover:bg-[#d94838] transition-all cursor-pointer inline-flex items-center gap-2"
                      >
                        Send Email
                        <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>

                  {/* Copy Email & Actions */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <button
                      onClick={copyEmail}
                      className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 hover:border-[#c93b2b] transition-all flex justify-between items-center cursor-pointer"
                    >
                      <div className="text-left font-mono">
                        <span className="text-[10px] text-[#777] block uppercase">Direct Email</span>
                        <span className="text-sm font-bold text-white">contact@mdaasif.dev</span>
                      </div>
                      <span className="px-3 py-1.5 bg-white/[0.08] rounded-lg text-xs font-mono text-white flex items-center gap-1">
                        {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
                      </span>
                    </button>

                    <a
                      href="#"
                      className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 hover:border-white transition-all flex justify-between items-center cursor-pointer"
                    >
                      <div className="text-left font-mono">
                        <span className="text-[10px] text-[#777] block uppercase">Resume (PDF)</span>
                        <span className="text-sm font-bold text-white">Download CV</span>
                      </div>
                      <span className="px-3 py-1.5 bg-white/[0.08] rounded-lg text-xs font-mono text-white flex items-center gap-1">
                        <Download size={12} /> Download
                      </span>
                    </a>
                  </div>

                  {/* Switch Back to Act 1 Button */}
                  <div className="text-center pt-6 border-t border-white/10">
                    <button
                      onClick={() => onSwitchAct(1)}
                      className="px-8 py-3 bg-white/[0.05] border border-white/15 text-xs font-mono tracking-widest uppercase rounded-full hover:bg-white/[0.1] transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <Shrub size={13} />
                      Return to Shrine Act 1
                    </button>
                  </div>
                </div>
              </div>

              <footer className="text-center text-xs font-mono text-[#666] tracking-widest uppercase py-8">
                © 2026 MD AASIF · CREATIVE 3D WEBGL PORTFOLIO
              </footer>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

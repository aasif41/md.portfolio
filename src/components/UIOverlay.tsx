import { useState, useEffect } from 'react'

export default function UIOverlay() {
  const [activeTab, setActiveTab] = useState<'all' | '3d' | 'backend' | 'ai'>('all')
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [message, setMessage] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('Full-Time Role')

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

  const projects = [
    {
      id: '01',
      title: '3D Japanese Shrine Odyssey',
      category: '3d',
      tag: 'WebGL / R3F / GLSL',
      year: '2026',
      desc: 'An immersive procedural 3D world with custom vertex shaders, real-time lighting physics, and 120 FPS momentum camera flight.',
      metrics: '120 FPS · 300+ Particles',
      stack: ['React', 'Three.js', 'R3F', 'GLSL', 'Tailwind'],
      link: 'https://github.com/aasif41',
      demo: '#',
      color: '#c93b2b'
    },
    {
      id: '02',
      title: 'Cloud Collaborative Workspace',
      category: 'backend',
      tag: 'Distributed Systems',
      year: '2025',
      desc: 'Real-time multi-user document synchronization engine utilizing CRDT operational transforms, Redis pub/sub, and WebSockets.',
      metrics: '15ms Latency · 99.9% Uptime',
      stack: ['TypeScript', 'Node.js', 'WebSockets', 'Redis', 'PostgreSQL'],
      link: 'https://github.com/aasif41',
      demo: '#',
      color: '#2a6f97'
    },
    {
      id: '03',
      title: 'Neural Hand Gesture 3D Control',
      category: 'ai',
      tag: 'Computer Vision & AI',
      year: '2025',
      desc: 'Edge machine learning pipeline converting webcam hand landmarks into 3D navigation vectors in the browser via TensorFlow.js.',
      metrics: '60 FPS ML Inference',
      stack: ['Python', 'TensorFlow.js', 'MediaPipe', 'WebGL'],
      link: 'https://github.com/aasif41',
      demo: '#',
      color: '#38b000'
    },
    {
      id: '04',
      title: 'Async Microservices Benchmark',
      category: 'backend',
      tag: 'Infrastructure & DevOps',
      year: '2025',
      desc: 'High-throughput stress testing suite evaluating gRPC latency, RabbitMQ message queues, and cache invalidation strategies.',
      metrics: '100k Req/sec Telemetry',
      stack: ['Docker', 'gRPC', 'RabbitMQ', 'Go', 'Prometheus'],
      link: 'https://github.com/aasif41',
      demo: '#',
      color: '#e07a5f'
    }
  ]

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab)

  return (
    <div className="relative z-10 w-full pointer-events-none text-[#111111]">
      {/* ================= HERO SECTION (Awwwards Creative Developer Style) ================= */}
      <section id="hero" className="min-h-screen flex flex-col justify-between p-8 md:p-16 select-none">
        {/* Top Information Cluster */}
        <div className="max-w-2xl pointer-events-auto pt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 border border-black/10 text-xs font-mono text-[#333] shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#c93b2b] animate-ping" />
              <span className="font-semibold uppercase tracking-widest text-[#c93b2b]">Available for 2026</span>
              <span className="text-[#888]">/</span>
              <span className="text-[#555]">New Delhi, India</span>
            </div>
            <span className="text-[11px] font-mono text-[#777] hidden sm:inline">{currentTime} IST</span>
          </div>

          <div className="relative mb-2">
            <span className="text-xs font-mono tracking-[0.35em] text-[#777] uppercase block mb-1">
              ムハンマド アースィフ · 2026 EDITION
            </span>
            <h1 className="text-6xl md:text-9xl font-black font-display tracking-tight text-[#111111] leading-[0.88]">
              MD AASIF
            </h1>
          </div>

          <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-[#c93b2b] uppercase font-bold mb-4">
            CREATIVE FULL-STACK ENGINEER & 3D DEVELOPER
          </p>

          <p className="text-base md:text-lg text-[#333] font-light leading-relaxed max-w-lg mb-8">
            Final-year <strong className="text-[#111] font-semibold">BSc (Hons) Computer Science</strong> student. Merging algorithmic computer science foundations with real-time 3D WebGL graphics and distributed systems.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="#projects" 
              className="px-8 py-3.5 bg-[#111111] text-white font-mono text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-[#c93b2b] transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2 group"
            >
              <span>Explore Works</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3.5 bg-white/85 border border-black/15 text-[#111] font-mono text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-white transition-all duration-300 shadow-sm cursor-pointer"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Vertical Social Handle on Right */}
        <div className="fixed top-14 right-8 md:right-14 pointer-events-auto hidden md:block">
          <a
            href="https://github.com/aasif41"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono tracking-[0.25em] text-[#222] hover:text-[#c93b2b] transition-colors"
            style={{ writingMode: 'vertical-rl' }}
          >
            @mdaasif // PORTFOLIO
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center justify-center pb-4 pointer-events-none">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#444] font-semibold mb-2">
            SCROLL TO EXPLORE
          </span>
          <div className="w-[1px] h-10 bg-[#111] animate-pulse" />
        </div>
      </section>

      {/* ================= SELECTED WORKS / PROJECTS SECTION ================= */}
      <section id="projects" className="min-h-[140vh] flex flex-col justify-center px-8 md:px-16 py-24">
        <div className="w-full max-w-6xl mx-auto">
          {/* Section Header with Category Tabs */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pointer-events-auto">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 bg-[#c93b2b] rounded-full" />
                <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#666] font-bold">
                  01 // SELECTED WORKS & SYSTEMS
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight text-[#111111] uppercase leading-tight">
                Featured Projects
              </h2>
            </div>

            {/* Interactive Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0 font-mono text-xs">
              {[
                { key: 'all', label: 'All Works' },
                { key: '3d', label: '3D WebGL' },
                { key: 'backend', label: 'Distributed Systems' },
                { key: 'ai', label: 'AI & Vision' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? 'bg-[#111] text-white font-semibold shadow-md'
                      : 'bg-white/70 border border-black/10 text-[#444] hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 gap-8 pointer-events-auto">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="bg-white/95 p-8 md:p-10 rounded-3xl border border-black/10 shadow-xl hover:shadow-2xl hover:border-[#c93b2b] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#c93b2b]">
                      {p.id} · {p.tag}
                    </span>
                    <span className="text-xs font-mono text-[#777]">{p.year}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold font-display text-[#111] mb-3 group-hover:text-[#c93b2b] transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-sm md:text-base text-[#444] leading-relaxed mb-6 font-light">
                    {p.desc}
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/[0.04] rounded-lg text-xs font-mono text-[#222] mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38b000]" />
                    <span className="font-semibold">{p.metrics}</span>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-black/10 text-[11px] font-mono text-[#555] mb-6">
                    {p.stack.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-black/[0.04] rounded-md border border-black/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 bg-[#111] text-white text-xs font-mono uppercase tracking-wider rounded-lg hover:bg-[#c93b2b] transition-colors cursor-pointer"
                    >
                      View Code ↗
                    </a>
                    <a
                      href={p.demo}
                      className="px-5 py-2.5 bg-black/[0.04] text-[#111] text-xs font-mono uppercase tracking-wider rounded-lg hover:bg-black/[0.08] transition-colors cursor-pointer"
                    >
                      Architecture Summary
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION (Editorial Magazine CS Profile) ================= */}
      <section id="about" className="min-h-screen flex items-center justify-end px-8 md:px-16 py-24">
        <div className="pointer-events-auto max-w-2xl bg-white/95 p-8 md:p-14 rounded-3xl border border-black/10 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 bg-[#c93b2b] rounded-full" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#666] font-bold">
              02 // BIOGRAPHY & PHILOSOPHY
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black font-display text-[#111] mb-6 tracking-tight">
            Engineering Rigor,<br />Creative Precision.
          </h2>

          <p className="text-[#333] text-base md:text-lg leading-relaxed mb-4 font-light">
            I am <strong className="text-[#111] font-semibold">Md Aasif</strong>, a final-year Computer Science undergraduate student specializing in modern full-stack web architecture, 3D WebGL computer graphics, and distributed systems.
          </p>

          <p className="text-[#555] text-sm md:text-base leading-relaxed mb-8 font-light">
            My engineering journey bridges academic computer science fundamentals — algorithms, data structures, and distributed state machines — with the creative possibilities of modern real-time WebGL rendering and intuitive human-computer interfaces.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-black/10 font-mono text-center">
            <div className="p-4 bg-black/[0.03] rounded-2xl border border-black/5">
              <span className="block text-2xl font-bold font-display text-[#c93b2b]">BSc (Hons)</span>
              <span className="text-[11px] text-[#666] uppercase font-mono">Computer Science</span>
            </div>
            <div className="p-4 bg-black/[0.03] rounded-2xl border border-black/5">
              <span className="block text-2xl font-bold font-display text-[#111]">2026</span>
              <span className="text-[11px] text-[#666] uppercase font-mono">Graduating Class</span>
            </div>
            <div className="p-4 bg-black/[0.03] rounded-2xl border border-black/5 col-span-2 md:col-span-1">
              <span className="block text-2xl font-bold font-display text-[#c93b2b]">Full-Stack</span>
              <span className="text-[11px] text-[#666] uppercase font-mono">3D & Systems</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SKILLS SECTION (High-End Technical Stack Matrix) ================= */}
      <section id="skills" className="min-h-screen flex items-center justify-start px-8 md:px-16 py-24">
        <div className="pointer-events-auto max-w-2xl w-full bg-white/95 p-8 md:p-14 rounded-3xl border border-black/10 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 bg-[#c93b2b] rounded-full" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#666] font-bold">
              03 // TECHNICAL ARSENAL & TOOLS
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black font-display text-[#111] mb-8 tracking-tight">
            Capabilities & Stack
          </h2>

          <div className="space-y-6">
            <div className="p-4 bg-black/[0.02] rounded-2xl border border-black/5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c93b2b] font-bold block mb-2.5">
                01 · Frontend & Creative 3D Engineering
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['React.js', 'TypeScript', 'Next.js', 'Three.js', 'React Three Fiber (R3F)', 'GLSL Shaders', 'GSAP', 'Tailwind CSS', 'Vite'].map(s => (
                  <span key={s} className="px-3.5 py-1.5 bg-white rounded-lg border border-black/10 text-[#222] font-medium shadow-sm hover:border-[#c93b2b] transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-black/[0.02] rounded-2xl border border-black/5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c93b2b] font-bold block mb-2.5">
                02 · Backend, Distributed Systems & Databases
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'WebSockets', 'RESTful APIs', 'gRPC'].map(s => (
                  <span key={s} className="px-3.5 py-1.5 bg-white rounded-lg border border-black/10 text-[#222] font-medium shadow-sm hover:border-[#c93b2b] transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-black/[0.02] rounded-2xl border border-black/5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c93b2b] font-bold block mb-2.5">
                03 · AI, Machine Learning & Vision
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['TensorFlow.js', 'MediaPipe', 'OpenCV', 'Edge Machine Learning', 'Python Data Science'].map(s => (
                  <span key={s} className="px-3.5 py-1.5 bg-white rounded-lg border border-black/10 text-[#222] font-medium shadow-sm hover:border-[#c93b2b] transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-black/[0.02] rounded-2xl border border-black/5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c93b2b] font-bold block mb-2.5">
                04 · DevOps, Cloud & Tooling
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['Docker', 'Git / GitHub', 'Linux CLI', 'CI/CD Automation', 'Postman', 'Vercel'].map(s => (
                  <span key={s} className="px-3.5 py-1.5 bg-white rounded-lg border border-black/10 text-[#222] font-medium shadow-sm hover:border-[#c93b2b] transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ULTRA-INTERACTIVE CONTACT TRANSMISSION TERMINAL ================= */}
      <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-8 md:px-16 py-24">
        <div className="pointer-events-auto max-w-3xl w-full bg-white/95 p-8 md:p-14 rounded-3xl border border-black/10 shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-black/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 bg-[#c93b2b] rounded-full" />
                <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#666] font-bold">
                  04 // INITIATE TRANSMISSION
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black font-display text-[#111] tracking-tight">
                Let's Build Together.
              </h2>
            </div>

            {/* Live Location Telemetry Widget */}
            <div className="p-3 bg-black/[0.03] rounded-xl border border-black/5 font-mono text-[11px] text-[#444] flex flex-col gap-0.5">
              <span className="text-[#111] font-bold">● NEW DELHI, INDIA</span>
              <span>28.6139° N, 77.2090° E</span>
              <span className="text-[#c93b2b]">{currentTime} IST (UTC+5:30)</span>
            </div>
          </div>

          {/* Quick Select Conversation Topic Chips */}
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#666] font-semibold block mb-3">
              Select Reason for Contact:
            </span>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {[
                '💼 Full-Time Role 2026',
                '⚡ Freelance / 3D Project',
                '🤝 Open-Source Collaboration',
                '☕ Coffee / Tech Chat'
              ].map(topic => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                    selectedTopic === topic
                      ? 'bg-[#111] text-white border-[#111] font-bold shadow-md'
                      : 'bg-white border-black/10 text-[#444] hover:bg-black/[0.04]'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Message Dispatcher Box */}
          <div className="mb-8">
            <div className="p-4 bg-black/[0.02] rounded-2xl border border-black/10">
              <div className="flex items-center justify-between mb-2 text-xs font-mono text-[#666]">
                <span>&gt; TRANSMISSION PAYLOAD:</span>
                <span className="text-[#c93b2b] font-bold">{selectedTopic}</span>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message or project requirements here..."
                rows={3}
                className="w-full bg-white p-3 rounded-xl border border-black/10 text-sm font-sans text-[#111] focus:outline-none focus:border-[#c93b2b] transition-all resize-none shadow-inner"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-[11px] font-mono text-[#777]">Destination: contact@mdaasif.dev</span>
                <a
                  href={`mailto:contact@mdaasif.dev?subject=${encodeURIComponent(`[${selectedTopic}] Inquiry from Portfolio`)}&body=${encodeURIComponent(message)}`}
                  className="px-6 py-2.5 bg-[#c93b2b] text-white font-mono text-xs font-bold tracking-wider uppercase rounded-xl hover:bg-[#d94838] transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>Launch Email Client</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* 1-Click Copy Email & Direct Links */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {/* Copy Button */}
            <button
              onClick={copyEmail}
              className="p-4 bg-white rounded-2xl border border-black/10 hover:border-[#c93b2b] shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="text-left font-mono">
                <span className="text-[10px] text-[#777] block uppercase">Direct Email</span>
                <span className="text-xs md:text-sm font-bold text-[#111] group-hover:text-[#c93b2b] transition-colors">
                  contact@mdaasif.dev
                </span>
              </div>
              <span className="px-3 py-1.5 bg-black/[0.04] rounded-lg text-xs font-mono text-[#333] group-hover:bg-[#c93b2b] group-hover:text-white transition-all">
                {copied ? '✓ Copied!' : 'Copy'}
              </span>
            </button>

            {/* Resume Button */}
            <a
              href="#"
              className="p-4 bg-white rounded-2xl border border-black/10 hover:border-[#111] shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="text-left font-mono">
                <span className="text-[10px] text-[#777] block uppercase">Curriculum Vitae</span>
                <span className="text-xs md:text-sm font-bold text-[#111]">
                  Download Resume (PDF)
                </span>
              </div>
              <span className="px-3 py-1.5 bg-black/[0.04] rounded-lg text-xs font-mono text-[#333] group-hover:bg-[#111] group-hover:text-white transition-all">
                Download ↓
              </span>
            </a>
          </div>

          {/* Social Network Nodes */}
          <div className="flex flex-wrap justify-center gap-6 pt-6 border-t border-black/10 text-xs font-mono uppercase text-[#666]">
            {[
              { name: 'GitHub', url: 'https://github.com/aasif41' },
              { name: 'LinkedIn', url: 'https://linkedin.com' },
              { name: 'Twitter / X', url: 'https://twitter.com' },
              { name: 'LeetCode', url: 'https://leetcode.com' }
            ].map(social => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#c93b2b] transition-colors font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>{social.name}</span>
                <span className="text-[10px]">↗</span>
              </a>
            ))}
          </div>
        </div>

        <footer className="mt-14 text-xs font-mono tracking-widest text-[#777] uppercase flex items-center gap-3">
          <span>© 2026 MD AASIF</span>
          <span>·</span>
          <span>CREATIVE WEBGL 3D PORTFOLIO</span>
        </footer>
      </section>
    </div>
  )
}

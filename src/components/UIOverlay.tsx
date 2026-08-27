export default function UIOverlay() {
  return (
    <div className="relative z-10 w-full pointer-events-none text-[#111111]">
      {/* ================= HERO SECTION (Exact 1:1 Renaud Style) ================= */}
      <section id="hero" className="min-h-screen flex flex-col justify-between p-8 md:p-14 select-none">
        {/* Top Header Information */}
        <div className="max-w-2xl pointer-events-auto">
          {/* Japanese Katakana Name */}
          <h1 className="text-3xl md:text-5xl font-black font-sans tracking-tight mb-2 text-[#111111] whitespace-nowrap">
            ムハンマド アースィフ
          </h1>
          <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-[#444] uppercase mb-4">
            MD AASIF
          </p>

          <p className="text-xs md:text-sm font-mono tracking-[0.2em] text-[#111] uppercase font-bold mb-4">
            CREATIVE FULL-STACK DEVELOPER
          </p>

          <p className="text-sm md:text-base text-[#444] font-light leading-relaxed max-w-md">
            Final-year BSc (Hons) Computer Science student. My main objective is to make high-performance WebGL 3D interactive experiences and scalable distributed systems accessible for everyone.
          </p>
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
            @mdaasif
          </a>
        </div>

        {/* Scroll Indicator at Bottom Center */}
        <div className="flex flex-col items-center justify-center pb-6 pointer-events-none">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#333] font-semibold mb-2">
            SCROLL TO START
          </span>
          <div className="w-[1px] h-10 bg-[#333] animate-pulse" />
        </div>
      </section>

      {/* ================= SELECTED WORKS / PROJECTS SECTION ================= */}
      <section id="projects" className="min-h-[140vh] flex flex-col justify-center px-8 md:px-14 py-20">
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Recognitions & Works Index */}
          <div className="pointer-events-auto md:sticky md:top-28">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#c93b2b] rounded-full" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#555] font-bold">
                01 // WORKS & SYSTEMS
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#111111] uppercase mb-8">
              Selected Projects
            </h2>

            <div className="space-y-4 font-mono text-xs text-[#444]">
              <div className="p-3.5 bg-white/80 backdrop-blur-sm rounded-xl border border-black/5 flex justify-between items-center hover:border-black/20 transition-all shadow-sm">
                <span>2026 | 3D Japanese Shrine Odyssey</span>
                <span className="text-[#c93b2b] font-bold">[ WebGL / R3F ]</span>
              </div>
              <div className="p-3.5 bg-white/80 backdrop-blur-sm rounded-xl border border-black/5 flex justify-between items-center hover:border-black/20 transition-all shadow-sm">
                <span>2025 | Cloud Collaborative Canvas</span>
                <span className="text-[#c93b2b] font-bold">[ Distributed TS ]</span>
              </div>
              <div className="p-3.5 bg-white/80 backdrop-blur-sm rounded-xl border border-black/5 flex justify-between items-center hover:border-black/20 transition-all shadow-sm">
                <span>2025 | Neural Hand Gesture 3D Control</span>
                <span className="text-[#c93b2b] font-bold">[ AI / Vision ]</span>
              </div>
              <div className="p-3.5 bg-white/80 backdrop-blur-sm rounded-xl border border-black/5 flex justify-between items-center hover:border-black/20 transition-all shadow-sm">
                <span>2025 | Microservices Async Benchmark</span>
                <span className="text-[#c93b2b] font-bold">[ Go / gRPC ]</span>
              </div>
            </div>
          </div>

          {/* Right Column: Project Showcase Cards */}
          <div className="space-y-8 pointer-events-auto">
            {/* Card 1 */}
            <div className="bg-white/90 p-8 rounded-2xl border border-black/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#c93b2b] font-bold tracking-widest">01 · 3D WEBGL</span>
                <span className="text-xs font-mono text-[#666]">2026</span>
              </div>
              <h3 className="text-2xl font-bold text-[#111] mb-2">
                3D Interactive Japanese Odyssey
              </h3>
              <p className="text-sm text-[#444] leading-relaxed mb-4 font-light">
                An interactive low-poly Japanese shrine exploration built in React Three Fiber with procedural Torii gate generation, sakura blossom simulation, and cinematic camera momentum physics.
              </p>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-black/5 text-[11px] font-mono text-[#555]">
                <span className="px-2.5 py-1 bg-black/5 rounded">React</span>
                <span className="px-2.5 py-1 bg-black/5 rounded">Three.js</span>
                <span className="px-2.5 py-1 bg-black/5 rounded">R3F</span>
                <span className="px-2.5 py-1 bg-black/5 rounded">Tailwind</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/90 p-8 rounded-2xl border border-black/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#c93b2b] font-bold tracking-widest">02 · DISTRIBUTED SYSTEMS</span>
                <span className="text-xs font-mono text-[#666]">2025</span>
              </div>
              <h3 className="text-2xl font-bold text-[#111] mb-2">
                Cloud Collaborative Workspace
              </h3>
              <p className="text-sm text-[#444] leading-relaxed mb-4 font-light">
                Real-time multi-user document synchronization engine utilizing CRDT conflict-free resolution, distributed Redis pub/sub messaging, and low-latency WebSockets.
              </p>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-black/5 text-[11px] font-mono text-[#555]">
                <span className="px-2.5 py-1 bg-black/5 rounded">TypeScript</span>
                <span className="px-2.5 py-1 bg-black/5 rounded">Node.js</span>
                <span className="px-2.5 py-1 bg-black/5 rounded">WebSockets</span>
                <span className="px-2.5 py-1 bg-black/5 rounded">Redis</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/90 p-8 rounded-2xl border border-black/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#c93b2b] font-bold tracking-widest">03 · COMPUTER VISION</span>
                <span className="text-xs font-mono text-[#666]">2025</span>
              </div>
              <h3 className="text-2xl font-bold text-[#111] mb-2">
                Neural Hand Gesture 3D Controller
              </h3>
              <p className="text-sm text-[#444] leading-relaxed mb-4 font-light">
                Real-time edge machine learning application translating spatial camera hand landmarks into smooth 3D navigation vectors in the browser with TensorFlow.js.
              </p>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-black/5 text-[11px] font-mono text-[#555]">
                <span className="px-2.5 py-1 bg-black/5 rounded">Python</span>
                <span className="px-2.5 py-1 bg-black/5 rounded">TensorFlow.js</span>
                <span className="px-2.5 py-1 bg-black/5 rounded">WebGL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="min-h-screen flex items-center justify-end px-8 md:px-14 py-20">
        <div className="pointer-events-auto max-w-xl bg-white/90 p-8 md:p-12 rounded-2xl border border-black/10 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-[#c93b2b] rounded-full" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#555] font-bold">
              02 // BIOGRAPHY & EDUCATION
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-[#111] mb-6 tracking-tight">
            About Md Aasif
          </h2>

          <p className="text-[#333] text-base md:text-lg leading-relaxed mb-4 font-light">
            I am a final-year <strong className="text-[#111] font-semibold">BSc (Hons) Computer Science</strong> student specializing in modern full-stack web architecture, 3D WebGL computer graphics, and distributed systems.
          </p>

          <p className="text-[#555] text-sm md:text-base leading-relaxed mb-6 font-light">
            My engineering philosophy centers on writing clean, scalable, high-performance code that powers engaging, human-centric visual experiences.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/10 font-mono text-center">
            <div className="p-3 bg-black/[0.03] rounded-lg">
              <span className="block text-xl font-bold text-[#c93b2b]">BSc (Hons)</span>
              <span className="text-[10px] text-[#666] uppercase">Computer Science</span>
            </div>
            <div className="p-3 bg-black/[0.03] rounded-lg">
              <span className="block text-xl font-bold text-[#111]">2026</span>
              <span className="text-[10px] text-[#666] uppercase">Graduating Year</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SKILLS SECTION ================= */}
      <section id="skills" className="min-h-screen flex items-center justify-start px-8 md:px-14 py-20">
        <div className="pointer-events-auto max-w-xl w-full bg-white/90 p-8 md:p-12 rounded-2xl border border-black/10 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-[#c93b2b] rounded-full" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#555] font-bold">
              03 // TECHNICAL STACK
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-[#111] mb-6 tracking-tight">
            Capabilities & Arsenal
          </h2>

          <div className="space-y-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c93b2b] font-bold block mb-2">
                01 · Frontend & Creative 3D
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['React.js', 'TypeScript', 'Three.js', 'R3F', 'GLSL Shaders', 'GSAP', 'Tailwind CSS'].map(s => (
                  <span key={s} className="px-3 py-1 bg-black/[0.05] rounded-md border border-black/5 text-[#222]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c93b2b] font-bold block mb-2">
                02 · Backend & Databases
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'REST APIs'].map(s => (
                  <span key={s} className="px-3 py-1 bg-black/[0.05] rounded-md border border-black/5 text-[#222]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c93b2b] font-bold block mb-2">
                03 · DevOps & Workflow
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['Docker', 'Git / GitHub', 'Linux', 'Vite', 'CI/CD Pipelines'].map(s => (
                  <span key={s} className="px-3 py-1 bg-black/[0.05] rounded-md border border-black/5 text-[#222]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-8 md:px-14 py-20 text-center">
        <div className="pointer-events-auto max-w-xl w-full bg-white/90 p-10 md:p-14 rounded-2xl border border-black/10 shadow-xl">
          <span className="text-xs font-mono text-[#c93b2b] tracking-[0.3em] uppercase font-bold block mb-3">
            04 // INITIATE CONTACT
          </span>

          <h2 className="text-4xl md:text-6xl font-black text-[#111] tracking-tight mb-4">
            Let's Talk.
          </h2>

          <p className="text-sm md:text-base text-[#555] font-light leading-relaxed mb-8 max-w-md mx-auto">
            Currently open for software engineering roles and creative tech collaborations for 2026.
          </p>

          <a 
            href="mailto:contact@mdaasif.dev" 
            className="inline-block px-10 py-4 bg-[#111] text-white font-mono text-xs tracking-[0.25em] uppercase rounded-xl hover:bg-[#c93b2b] transition-all duration-300 shadow-md mb-8 cursor-pointer"
          >
            Say Hello → contact@mdaasif.dev
          </a>

          <div className="flex justify-center gap-6 pt-6 border-t border-black/10 text-xs font-mono uppercase text-[#666]">
            <a href="https://github.com/aasif41" target="_blank" rel="noreferrer" className="hover:text-[#c93b2b] transition-colors">
              GitHub
            </a>
            <span>·</span>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#c93b2b] transition-colors">
              LinkedIn
            </a>
            <span>·</span>
            <a href="#" className="hover:text-[#c93b2b] transition-colors">
              Download CV
            </a>
          </div>
        </div>

        <footer className="mt-14 text-xs font-mono tracking-widest text-[#777] uppercase">
          © 2026 MD AASIF · CRAFTED WITH REACT & THREE.JS
        </footer>
      </section>
    </div>
  )
}

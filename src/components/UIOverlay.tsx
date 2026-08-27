export default function UIOverlay() {
  return (
    <div className="relative z-10 w-full pointer-events-none text-[#111111]">
      {/* ================= HERO SECTION (Ultra-Pro Creative Developer) ================= */}
      <section id="hero" className="min-h-screen flex flex-col justify-between p-8 md:p-16 select-none">
        {/* Top Header Information */}
        <div className="max-w-2xl pointer-events-auto pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-black/10 text-xs font-mono text-[#333] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#c93b2b] animate-ping" />
            <span className="font-semibold uppercase tracking-widest text-[#c93b2b]">Available for 2026 Roles</span>
            <span className="text-[#888]">·</span>
            <span className="text-[#666]">New Delhi, India</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-extrabold font-display tracking-tight text-[#111111] mb-3 leading-[0.9]">
            MD AASIF
          </h1>

          <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-[#111] uppercase font-bold mb-4">
            CREATIVE FULL-STACK ENGINEER & 3D DEVELOPER
          </p>

          <p className="text-base md:text-lg text-[#444] font-light leading-relaxed max-w-lg mb-8">
            Final-year <strong className="text-[#111] font-semibold">BSc (Hons) Computer Science</strong> student. Crafting immersive 3D WebGL interactive experiences, distributed systems, and high-performance digital architectures.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="#projects" 
              className="px-8 py-3.5 bg-[#111111] text-white font-mono text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-[#c93b2b] transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2 group"
            >
              <span>Explore Archive</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a 
              href="#about" 
              className="px-8 py-3.5 bg-white/80 border border-black/15 text-[#111] font-mono text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-white transition-all duration-300 shadow-sm cursor-pointer"
            >
              Biography
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
            @mdaasif // 2026
          </a>
        </div>

        {/* Scroll Indicator at Bottom Center */}
        <div className="flex flex-col items-center justify-center pb-4 pointer-events-none">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#333] font-semibold mb-2">
            SCROLL TO EXPLORE
          </span>
          <div className="w-[1px] h-10 bg-[#111] animate-pulse" />
        </div>
      </section>

      {/* ================= SELECTED WORKS / PROJECTS SECTION ================= */}
      <section id="projects" className="min-h-[140vh] flex flex-col justify-center px-8 md:px-16 py-24">
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
          {/* Left Column: Timeline & Works Index */}
          <div className="pointer-events-auto md:sticky md:top-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-[#c93b2b] rounded-full" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#555] font-bold">
                01 // INDEXED WORKS & SYSTEMS
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight text-[#111111] uppercase mb-8 leading-tight">
              Selected Projects
            </h2>

            <div className="space-y-4 font-mono text-xs text-[#333]">
              <div className="p-4 bg-white/85 rounded-xl border border-black/10 flex justify-between items-center hover:border-[#c93b2b] transition-all shadow-sm">
                <div>
                  <span className="font-bold text-[#111]">01 · 3D Japanese Shrine Odyssey</span>
                  <p className="text-[11px] text-[#666] font-sans mt-0.5">Interactive WebGL procedural 3D world</p>
                </div>
                <span className="text-[#c93b2b] font-bold">[ WebGL / R3F ]</span>
              </div>

              <div className="p-4 bg-white/85 rounded-xl border border-black/10 flex justify-between items-center hover:border-[#c93b2b] transition-all shadow-sm">
                <div>
                  <span className="font-bold text-[#111]">02 · Cloud Collaborative Canvas</span>
                  <p className="text-[11px] text-[#666] font-sans mt-0.5">Real-time CRDT multi-user engine</p>
                </div>
                <span className="text-[#c93b2b] font-bold">[ Distributed TS ]</span>
              </div>

              <div className="p-4 bg-white/85 rounded-xl border border-black/10 flex justify-between items-center hover:border-[#c93b2b] transition-all shadow-sm">
                <div>
                  <span className="font-bold text-[#111]">03 · Neural Hand Gesture 3D Control</span>
                  <p className="text-[11px] text-[#666] font-sans mt-0.5">Edge ML computer vision navigation</p>
                </div>
                <span className="text-[#c93b2b] font-bold">[ AI / Vision ]</span>
              </div>

              <div className="p-4 bg-white/85 rounded-xl border border-black/10 flex justify-between items-center hover:border-[#c93b2b] transition-all shadow-sm">
                <div>
                  <span className="font-bold text-[#111]">04 · Microservices Async Benchmark</span>
                  <p className="text-[11px] text-[#666] font-sans mt-0.5">High-throughput gRPC telemetry suite</p>
                </div>
                <span className="text-[#c93b2b] font-bold">[ Go / gRPC ]</span>
              </div>
            </div>
          </div>

          {/* Right Column: Project Showcase Cards */}
          <div className="space-y-8 pointer-events-auto">
            {/* Card 1 */}
            <div className="bg-white/95 p-8 md:p-10 rounded-2xl border border-black/10 shadow-xl hover:border-[#c93b2b] transition-all duration-300 group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#c93b2b] font-bold tracking-widest">01 · 3D WEBGL GRAPHICS</span>
                <span className="text-xs font-mono text-[#666]">2026</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-[#111] mb-3 group-hover:text-[#c93b2b] transition-colors">
                Interactive 3D Japanese Odyssey
              </h3>
              <p className="text-sm md:text-base text-[#444] leading-relaxed mb-6 font-light">
                An award-winning inspired WebGL interactive experience built with React Three Fiber, featuring procedural Torii gates, sakura blossom particle physics, and cinematic camera momentum scrolling.
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/10 text-[11px] font-mono text-[#444]">
                {['React', 'Three.js', 'R3F', 'GLSL Shaders', 'GSAP', 'Tailwind CSS'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-black/[0.04] rounded-md border border-black/5 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/95 p-8 md:p-10 rounded-2xl border border-black/10 shadow-xl hover:border-[#c93b2b] transition-all duration-300 group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#c93b2b] font-bold tracking-widest">02 · DISTRIBUTED SYSTEMS</span>
                <span className="text-xs font-mono text-[#666]">2025</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-[#111] mb-3 group-hover:text-[#c93b2b] transition-colors">
                Cloud Collaborative Workspace
              </h3>
              <p className="text-sm md:text-base text-[#444] leading-relaxed mb-6 font-light">
                A distributed real-time document synchronization platform utilizing conflict-free replicated data types (CRDTs), low-latency WebSockets, Redis pub/sub messaging, and PostgreSQL transactional persistence.
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/10 text-[11px] font-mono text-[#444]">
                {['TypeScript', 'Node.js', 'WebSockets', 'Redis', 'PostgreSQL', 'Docker'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-black/[0.04] rounded-md border border-black/5 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/95 p-8 md:p-10 rounded-2xl border border-black/10 shadow-xl hover:border-[#c93b2b] transition-all duration-300 group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#c93b2b] font-bold tracking-widest">03 · COMPUTER VISION & AI</span>
                <span className="text-xs font-mono text-[#666]">2025</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-[#111] mb-3 group-hover:text-[#c93b2b] transition-colors">
                Neural Hand Gesture 3D Controller
              </h3>
              <p className="text-sm md:text-base text-[#444] leading-relaxed mb-6 font-light">
                Real-time edge machine learning application translating spatial camera hand landmarks into fluid 3D spatial navigation vectors in the browser with TensorFlow.js and MediaPipe models.
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/10 text-[11px] font-mono text-[#444]">
                {['Python', 'TensorFlow.js', 'MediaPipe', 'WebGL', 'OpenCV'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-black/[0.04] rounded-md border border-black/5 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white/95 p-8 md:p-10 rounded-2xl border border-black/10 shadow-xl hover:border-[#c93b2b] transition-all duration-300 group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#c93b2b] font-bold tracking-widest">04 · INFRASTRUCTURE & PERFORMANCE</span>
                <span className="text-xs font-mono text-[#666]">2025</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-[#111] mb-3 group-hover:text-[#c93b2b] transition-colors">
                Asynchronous Microservices Benchmark
              </h3>
              <p className="text-sm md:text-base text-[#444] leading-relaxed mb-6 font-light">
                A high-throughput load testing and telemetry pipeline evaluating latency, p99 percentiles, and cache invalidation bottlenecks across gRPC, RabbitMQ message brokers, and Go microservice endpoints.
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/10 text-[11px] font-mono text-[#444]">
                {['Docker', 'gRPC', 'RabbitMQ', 'Go', 'Prometheus', 'Grafana'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-black/[0.04] rounded-md border border-black/5 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION (Editorial CS Student Profile) ================= */}
      <section id="about" className="min-h-screen flex items-center justify-end px-8 md:px-16 py-24">
        <div className="pointer-events-auto max-w-2xl bg-white/95 p-8 md:p-14 rounded-3xl border border-black/10 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 bg-[#c93b2b] rounded-full" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#555] font-bold">
              02 // BIOGRAPHY & ENGINEERING FOCUS
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
            <div className="p-4 bg-black/[0.03] rounded-xl">
              <span className="block text-2xl font-bold font-display text-[#c93b2b]">BSc (Hons)</span>
              <span className="text-[11px] text-[#666] uppercase">Computer Science</span>
            </div>
            <div className="p-4 bg-black/[0.03] rounded-xl">
              <span className="block text-2xl font-bold font-display text-[#111]">2026</span>
              <span className="text-[11px] text-[#666] uppercase">Graduating Class</span>
            </div>
            <div className="p-4 bg-black/[0.03] rounded-xl col-span-2 md:col-span-1">
              <span className="block text-2xl font-bold font-display text-[#c93b2b]">Full-Stack</span>
              <span className="text-[11px] text-[#666] uppercase">3D & Systems</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SKILLS SECTION (High-End Technical Stack Matrix) ================= */}
      <section id="skills" className="min-h-screen flex items-center justify-start px-8 md:px-16 py-24">
        <div className="pointer-events-auto max-w-2xl w-full bg-white/95 p-8 md:p-14 rounded-3xl border border-black/10 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 bg-[#c93b2b] rounded-full" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#555] font-bold">
              03 // TECHNICAL ARSENAL & TOOLS
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black font-display text-[#111] mb-8 tracking-tight">
            Capabilities & Stack
          </h2>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c93b2b] font-bold block mb-2.5">
                01 · Frontend & Creative 3D Engineering
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['React.js', 'TypeScript', 'Next.js', 'Three.js', 'React Three Fiber (R3F)', 'GLSL Shaders', 'GSAP', 'Tailwind CSS', 'Vite'].map(s => (
                  <span key={s} className="px-3.5 py-1.5 bg-black/[0.04] rounded-lg border border-black/5 text-[#222] font-medium hover:border-[#c93b2b] transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c93b2b] font-bold block mb-2.5">
                02 · Backend, Distributed Systems & Databases
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'WebSockets', 'RESTful APIs', 'gRPC'].map(s => (
                  <span key={s} className="px-3.5 py-1.5 bg-black/[0.04] rounded-lg border border-black/5 text-[#222] font-medium hover:border-[#c93b2b] transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c93b2b] font-bold block mb-2.5">
                03 · AI, Machine Learning & Vision
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['TensorFlow.js', 'MediaPipe', 'OpenCV', 'Edge Machine Learning', 'Python Data Science'].map(s => (
                  <span key={s} className="px-3.5 py-1.5 bg-black/[0.04] rounded-lg border border-black/5 text-[#222] font-medium hover:border-[#c93b2b] transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c93b2b] font-bold block mb-2.5">
                04 · DevOps, Cloud & Workflow
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['Docker', 'Git / GitHub', 'Linux CLI', 'CI/CD Automation', 'Postman', 'Vercel'].map(s => (
                  <span key={s} className="px-3.5 py-1.5 bg-black/[0.04] rounded-lg border border-black/5 text-[#222] font-medium hover:border-[#c93b2b] transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-8 md:px-16 py-24 text-center">
        <div className="pointer-events-auto max-w-2xl w-full bg-white/95 p-10 md:p-16 rounded-3xl border border-black/10 shadow-2xl">
          <span className="text-xs font-mono text-[#c93b2b] tracking-[0.3em] uppercase font-bold block mb-3">
            04 // INITIATE TRANSMISSION
          </span>

          <h2 className="text-4xl md:text-6xl font-black font-display text-[#111] tracking-tight mb-4 leading-tight">
            Let's Build Something<br />Extraordinary.
          </h2>

          <p className="text-base md:text-lg text-[#555] font-light leading-relaxed mb-8 max-w-md mx-auto">
            I am currently open for software engineering roles, full-stack positions, and creative tech collaborations for 2026.
          </p>

          <a 
            href="mailto:contact@mdaasif.dev" 
            className="inline-block px-10 py-4 bg-[#111111] text-white font-mono text-xs tracking-[0.25em] uppercase rounded-xl hover:bg-[#c93b2b] transition-all duration-300 shadow-lg mb-8 cursor-pointer"
          >
            Say Hello → contact@mdaasif.dev
          </a>

          <div className="flex justify-center gap-8 pt-6 border-t border-black/10 text-xs font-mono uppercase text-[#666]">
            <a href="https://github.com/aasif41" target="_blank" rel="noreferrer" className="hover:text-[#c93b2b] transition-colors font-semibold">
              GitHub
            </a>
            <span>·</span>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#c93b2b] transition-colors font-semibold">
              LinkedIn
            </a>
            <span>·</span>
            <a href="#" className="hover:text-[#c93b2b] transition-colors font-semibold">
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

export default function UIOverlay() {
  return (
    <div className="relative z-10 w-full pointer-events-none">
      {/* ================= HERO SECTION ================= */}
      <section id="hero" className="min-h-screen flex flex-col justify-end px-8 md:px-20 pb-20 pt-32">
        <div className="max-w-4xl pointer-events-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1c1c1c] border border-white/10 mb-8 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#c93b2b] animate-ping" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#ffaa66] font-mono font-medium">
              BSc (Hons) Computer Science · Final Year
            </span>
          </div>

          {/* Hero Name Header */}
          <div className="relative">
            <span className="text-xs font-mono text-[#888] uppercase tracking-[0.4em] block mb-2 font-medium">
              CREATIVE DEVELOPER // 2026 EDITION
            </span>
            <h1 className="text-7xl md:text-[10.5rem] font-black font-heading tracking-tighter leading-[0.8] text-[#f0ece4] mb-6 select-none">
              MD<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f0ece4] via-[#ffffff] to-[#ffaa66]">
                AASIF
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-2xl text-[#b0b0a8] font-light max-w-2xl leading-relaxed mb-8">
            Creative Full-Stack Engineer & 3D WebGL Developer exploring the intersection of distributed systems, high-performance web graphics, and intuitive interface design.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-[#c93b2b] text-white font-medium text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-[#d94838] transition-all duration-300 shadow-[0_0_30px_rgba(201,59,43,0.5)] flex items-center gap-3 cursor-pointer group"
            >
              <span>Explore Projects</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a 
              href="#about" 
              className="px-8 py-4 bg-[#181818] border border-white/15 text-[#f0ece4] font-medium text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-[#222] hover:border-white/30 transition-all duration-300 cursor-pointer"
            >
              About Me
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute right-8 md:right-20 bottom-14 flex flex-col items-center gap-3 pointer-events-none select-none">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#777] font-mono rotate-90 origin-right translate-x-3 mb-10">
            Scroll to Navigate
          </span>
          <div className="w-[1.5px] h-20 bg-gradient-to-b from-[#c93b2b] via-[#ffaa66] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="min-h-screen flex items-center justify-end px-8 md:px-20 py-28">
        <div className="pointer-events-auto max-w-2xl bg-[#121212]/92 p-8 md:p-14 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-[#c93b2b] tracking-[0.25em] uppercase font-bold">01 // Profile</span>
            <div className="h-[1px] w-12 bg-[#c93b2b]/40" />
            <span className="text-xs font-mono text-[#777] uppercase">About Md Aasif</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black font-heading text-[#f0ece4] mb-6 tracking-tight">
            Engineering Code,<br />Designing Reality.
          </h2>

          <p className="text-[#a8a8a0] text-lg leading-relaxed mb-6 font-light">
            I am <strong className="text-[#f0ece4] font-semibold">Md Aasif</strong>, a final-year Computer Science student passionate about crafting digital artifacts that combine rock-solid computer science engineering with cutting-edge visual experiences.
          </p>

          <p className="text-[#a8a8a0] text-base leading-relaxed mb-8 font-light">
            Whether architecting distributed RESTful and real-time backend microservices or creating interactive 3D WebGL worlds with Three.js and shaders, I thrive on tackling complex engineering challenges and turning ambitious ideas into polished digital realities.
          </p>

          {/* Academic & Competency Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center">
            <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-white/5">
              <span className="block text-2xl md:text-3xl font-black text-[#c93b2b] font-heading">BSc (Hons)</span>
              <span className="text-[11px] text-[#888] uppercase tracking-wider font-mono">Computer Science</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-white/5">
              <span className="block text-2xl md:text-3xl font-black text-[#f0ece4] font-heading">2026</span>
              <span className="text-[11px] text-[#888] uppercase tracking-wider font-mono">Graduating Class</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-white/5 col-span-2 md:col-span-1">
              <span className="block text-2xl md:text-3xl font-black text-[#ffaa66] font-heading">Full Stack</span>
              <span className="text-[11px] text-[#888] uppercase tracking-wider font-mono">3D & Systems</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SKILLS SECTION ================= */}
      <section id="skills" className="min-h-screen flex items-center justify-start px-8 md:px-20 py-28">
        <div className="pointer-events-auto max-w-2xl w-full bg-[#121212]/92 p-8 md:p-14 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-[#c93b2b] tracking-[0.25em] uppercase font-bold">02 // Capabilities</span>
            <div className="h-[1px] w-12 bg-[#c93b2b]/40" />
            <span className="text-xs font-mono text-[#777] uppercase">Skill Arsenal</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black font-heading text-[#f0ece4] mb-8 tracking-tight">
            Technical Stack & Tooling
          </h2>

          <div className="space-y-7">
            {/* Category 1 */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#ffaa66] font-mono font-semibold">
                  01 · Frontend & Creative Engineering
                </span>
                <span className="text-[11px] font-mono text-[#777]">React · TS · WebGL</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {['React.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite', 'HTML5/Modern CSS', 'GSAP Animation'].map((skill) => (
                  <span key={skill} className="px-3.5 py-1.5 rounded-xl bg-[#1c1c1c] border border-white/10 text-xs text-[#f0ece4] font-medium hover:border-[#c93b2b] hover:bg-[#c93b2b]/15 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Category 2 */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#ffaa66] font-mono font-semibold">
                  02 · 3D Graphics & Game Engine Tech
                </span>
                <span className="text-[11px] font-mono text-[#777]">Three.js · R3F · Shaders</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {['Three.js', 'React Three Fiber (R3F)', 'Drei', 'GLSL Shaders', 'Particle Physics', 'Blender Low-Poly Modeling'].map((skill) => (
                  <span key={skill} className="px-3.5 py-1.5 rounded-xl bg-[#1c1c1c] border border-white/10 text-xs text-[#f0ece4] font-medium hover:border-[#c93b2b] hover:bg-[#c93b2b]/15 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Category 3 */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#ffaa66] font-mono font-semibold">
                  03 · Backend, Cloud & DevOps
                </span>
                <span className="text-[11px] font-mono text-[#777]">Node · Python · SQL · Docker</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs', 'WebSockets', 'Docker', 'Git/GitHub'].map((skill) => (
                  <span key={skill} className="px-3.5 py-1.5 rounded-xl bg-[#1c1c1c] border border-white/10 text-xs text-[#f0ece4] font-medium hover:border-[#c93b2b] hover:bg-[#c93b2b]/15 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROJECTS SECTION ================= */}
      <section id="projects" className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-28">
        <div className="pointer-events-auto max-w-5xl mx-auto w-full">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1c1c] border border-white/10 mb-4">
              <span className="text-xs font-mono text-[#c93b2b] tracking-[0.25em] uppercase font-bold">
                03 // Selected Works
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-heading text-[#f0ece4] tracking-tight">
              Featured Projects & Systems
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-7">
            {/* Project 1 */}
            <div className="bg-[#121212]/92 p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl hover:border-[#c93b2b]/60 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c93b2b]/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-[#c93b2b]/20 transition-all" />
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-[#ffaa66] tracking-widest uppercase">01 · WebGL / 3D Graphics</span>
                  <span className="text-xs text-[#777] font-mono">2026</span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#f0ece4] mb-3 group-hover:text-[#ffaa66] transition-colors">
                  Awwwards-Inspired 3D Shrine Odyssey
                </h3>
                <p className="text-[#a0a09a] text-sm leading-relaxed mb-6 font-light">
                  An award-winning inspired WebGL interactive experience built with React Three Fiber, featuring celestial moon illumination, procedural Torii gates, sakura petal physics simulations, and inertial camera momentum scrolling.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {['React', 'Three.js', 'R3F', 'GLSL', 'GSAP', 'Tailwind'].map(tag => (
                  <span key={tag} className="text-[11px] font-mono px-3 py-1 rounded-lg bg-[#1a1a1a] text-[#d0ccc4] border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-[#121212]/92 p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl hover:border-[#ffaa66]/60 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffaa66]/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-[#ffaa66]/20 transition-all" />
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-[#ffaa66] tracking-widest uppercase">02 · Distributed Systems</span>
                  <span className="text-xs text-[#777] font-mono">2025</span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#f0ece4] mb-3 group-hover:text-[#ffaa66] transition-colors">
                  Cloud Collaborative Workspace
                </h3>
                <p className="text-[#a0a09a] text-sm leading-relaxed mb-6 font-light">
                  A distributed multi-user canvas and document synchronization engine utilizing operational transforms (CRDTs), low-latency WebSockets, Redis pub/sub messaging, and PostgreSQL transactional persistence.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {['TypeScript', 'Node.js', 'WebSockets', 'Redis', 'PostgreSQL'].map(tag => (
                  <span key={tag} className="text-[11px] font-mono px-3 py-1 rounded-lg bg-[#1a1a1a] text-[#d0ccc4] border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-[#121212]/92 p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl hover:border-[#c93b2b]/60 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c93b2b]/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-[#c93b2b]/20 transition-all" />
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-[#ffaa66] tracking-widest uppercase">03 · Computer Vision & AI</span>
                  <span className="text-xs text-[#777] font-mono">2025</span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#f0ece4] mb-3 group-hover:text-[#ffaa66] transition-colors">
                  Neural Hand Gesture 3D Controller
                </h3>
                <p className="text-[#a0a09a] text-sm leading-relaxed mb-6 font-light">
                  Real-time edge machine learning application using TensorFlow.js and MediaPipe to detect complex spatial hand landmarks via webcam, converting raw coordinates into fluid 3D spatial navigation vectors.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {['Python', 'TensorFlow.js', 'MediaPipe', 'WebGL', 'OpenCV'].map(tag => (
                  <span key={tag} className="text-[11px] font-mono px-3 py-1 rounded-lg bg-[#1a1a1a] text-[#d0ccc4] border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project 4 */}
            <div className="bg-[#121212]/92 p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl hover:border-[#ffaa66]/60 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffaa66]/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-[#ffaa66]/20 transition-all" />
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-[#ffaa66] tracking-widest uppercase">04 · Infrastructure & DevOps</span>
                  <span className="text-xs text-[#777] font-mono">2025</span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#f0ece4] mb-3 group-hover:text-[#ffaa66] transition-colors">
                  Asynchronous Microservice Benchmark
                </h3>
                <p className="text-[#a0a09a] text-sm leading-relaxed mb-6 font-light">
                  A high-throughput load testing and telemetry pipeline evaluating latency, p99 percentiles, and cache invalidation bottlenecks across gRPC, RabbitMQ message brokers, and Go microservice endpoints.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {['Docker', 'gRPC', 'RabbitMQ', 'Go', 'Prometheus', 'Grafana'].map(tag => (
                  <span key={tag} className="text-[11px] font-mono px-3 py-1 rounded-lg bg-[#1a1a1a] text-[#d0ccc4] border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-8 md:px-20 py-28 text-center">
        <div className="pointer-events-auto max-w-2xl w-full bg-[#121212]/92 p-10 md:p-16 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <span className="text-xs font-mono text-[#c93b2b] tracking-[0.3em] uppercase font-bold block mb-4">
            04 // Connect
          </span>

          <h2 className="text-4xl md:text-6xl font-black font-heading text-[#f0ece4] tracking-tight mb-6">
            Let's Build Something<br />Extraordinary.
          </h2>

          <p className="text-[#a8a8a0] text-base md:text-lg font-light leading-relaxed mb-10 max-w-lg mx-auto">
            I am actively seeking software engineering and creative technology roles for 2026. Whether you have an innovative project in mind or want to connect, feel free to reach out.
          </p>

          <a 
            href="mailto:contact@mdaasif.dev" 
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#c93b2b] text-white font-semibold text-xs tracking-[0.25em] uppercase rounded-xl hover:bg-[#d94838] transition-all duration-300 shadow-[0_0_35px_rgba(201,59,43,0.55)] mb-10 cursor-pointer group"
          >
            <span>Initiate Transmission</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>

          <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/10">
            {[
              { name: 'GitHub', url: 'https://github.com' },
              { name: 'LinkedIn', url: 'https://linkedin.com' },
              { name: 'Email', url: 'mailto:contact@mdaasif.dev' },
              { name: 'Download CV', url: '#' }
            ].map(social => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono tracking-widest uppercase text-[#888880] hover:text-[#ffaa66] transition-colors cursor-pointer"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <footer className="mt-16 text-xs text-[#666] font-mono tracking-widest uppercase flex items-center gap-3">
          <span>© 2026 MD AASIF</span>
          <span>·</span>
          <span>CREATIVE WEBGL PORTFOLIO</span>
        </footer>
      </section>
    </div>
  )
}

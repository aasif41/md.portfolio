import React, { useState, useMemo } from 'react'
import {
  SiThreedotjs,
  SiWebgl,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiNodedotjs,
  SiPython,
  SiGo,
  SiDocker,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiGraphql,
  SiGit,
  SiLinux,
  SiBlender,
  SiFigma,
  SiPostman,
  SiCplusplus,
  SiFlutter,
  SiDart,
  SiKotlin,
  SiDjango,
  SiAndroid,
} from 'react-icons/si'
import {
  Search,
  Sparkles,
  Layers,
  Cpu,
  Database,
  Wrench,
  Smartphone,
  Activity,
  Terminal,
  CheckCircle2,
  Zap,
} from 'lucide-react'

export interface SkillItem {
  id: string
  name: string
  category: 'frontend' | 'mobile' | 'backend' | 'cloud' | 'tools'
  categoryLabel: string
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
  brandColor: string
  level: string
  score: number
  description: string
  highlights: string[]
  useCase: string
}

const SKILLS_DATA: SkillItem[] = [
  // ── Frontend & 3D WebGL ──
  {
    id: 'threejs',
    name: 'Three.js',
    category: 'frontend',
    categoryLabel: 'Frontend & 3D',
    icon: SiThreedotjs,
    brandColor: '#049EF4',
    level: 'Specialist',
    score: 96,
    description: 'Custom 3D scene graphs, procedural shaders, camera rigs, and performance-optimized WebGL render loops.',
    highlights: ['GLSL Shaders', 'PBR Materials', 'Camera Animation Rigs', 'Draw Call Optimization'],
    useCase: 'Interactive 3D portfolios, space visualizations, and immersive digital artifacts.',
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    categoryLabel: 'Frontend & 3D',
    icon: SiReact,
    brandColor: '#61DAFB',
    level: 'Production-Grade',
    score: 98,
    description: 'High-performance reactive interfaces, modular component architecture, and React Three Fiber 3D bridges.',
    highlights: ['React 19 Hooks', 'Fiber Reconciliation', 'R3F Integrations', 'Custom State Engines'],
    useCase: 'Modern interactive web applications, high-density control dashboards, and real-time visualizers.',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    categoryLabel: 'Frontend & 3D',
    icon: SiTypescript,
    brandColor: '#3178C6',
    level: 'Mastered',
    score: 95,
    description: 'Strict end-to-end type safety, generic utility types, and clean API schema contracts.',
    highlights: ['Generics & Discriminated Unions', 'Strict Compiler Configs', 'API Type Contracts', 'Zero Any Policy'],
    useCase: 'Enterprise web systems, large-scale portal engines, and typed graphics pipelines.',
  },
  {
    id: 'webgl',
    name: 'WebGL & GLSL',
    category: 'frontend',
    categoryLabel: 'Frontend & 3D',
    icon: SiWebgl,
    brandColor: '#990000',
    level: 'Specialist',
    score: 90,
    description: 'Custom vertex and fragment shaders, post-processing filters, raymarching, and GPU buffer management.',
    highlights: ['Fragment Shaders', 'Vertex Displacement', 'Noise & FBM', 'GPU Math Optimization'],
    useCase: 'Atmospheric volumetric fog, procedural star fields, and holographic sci-fi UI overlays.',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    categoryLabel: 'Frontend & 3D',
    icon: SiNextdotjs,
    brandColor: '#FFFFFF',
    level: 'Production-Grade',
    score: 92,
    description: 'Server-side rendering, App Router architecture, static site generation, and optimized image pipelines.',
    highlights: ['Server Components (RSC)', 'Edge Middleware', 'App Router Routing', 'Optimized Hydration'],
    useCase: 'SEO-critical web portals, high-speed documentation hubs, and production landing platforms.',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Frontend & 3D',
    icon: SiTailwindcss,
    brandColor: '#06B6D4',
    level: 'Mastered',
    score: 97,
    description: 'Utility-first responsive layouts, custom design tokens, cyber-minimalist aesthetics, and glassmorphism.',
    highlights: ['Tailwind v4 Engine', 'Custom Theming', 'Fluid Typography', 'Hardware-Accelerated Transitions'],
    useCase: 'Sleek dark-mode dashboards, interactive HUDs, and responsive cross-device layouts.',
  },
  {
    id: 'javascript',
    name: 'JavaScript (ESNext)',
    category: 'frontend',
    categoryLabel: 'Frontend & 3D',
    icon: SiJavascript,
    brandColor: '#F7DF1E',
    level: 'Mastered',
    score: 98,
    description: 'Asynchronous event loops, DOM performance optimizations, Web Audio API, and modern ES features.',
    highlights: ['Event Loop Mechanics', 'Async / Await / Workers', 'Canvas & Web APIs', 'Memory Management'],
    useCase: 'Core web browser scripting, interactive animation loops, and event-driven data streaming.',
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'frontend',
    categoryLabel: 'Frontend & 3D',
    icon: SiVite,
    brandColor: '#646CFF',
    level: 'Production-Grade',
    score: 94,
    description: 'Instant lightning-fast HMR, Rollup bundling, ESM modules, and custom shader asset loader plugins.',
    highlights: ['Instant Cold Starts', 'Custom Asset Plugins', 'Tree-shaking Bundling', 'Fast Development Cycles'],
    useCase: 'Next-gen web development environments, Three.js rapid prototyping, and production builds.',
  },

  // ── Mobile App Development ──
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'mobile',
    categoryLabel: 'Mobile Apps',
    icon: SiFlutter,
    brandColor: '#02569B',
    level: 'Production-Grade',
    score: 94,
    description: 'Multi-platform mobile and desktop UI engineering with declarative widgets, smooth 120 FPS animations, and native platform channels.',
    highlights: ['Declarative Widget Trees', 'Custom RenderObjects', 'Bloc & Provider State', 'Native Platform Channels'],
    useCase: 'Cross-platform iOS & Android college companion apps, fluid tactile mobile UIs, and real-time student dashboards.',
  },
  {
    id: 'dart',
    name: 'Dart',
    category: 'mobile',
    categoryLabel: 'Mobile Apps',
    icon: SiDart,
    brandColor: '#0175C2',
    level: 'Advanced',
    score: 92,
    description: 'Client-optimized object-oriented language featuring sound null safety, AOT native compilation, and isolates for heavy computation.',
    highlights: ['Sound Null Safety', 'AOT & JIT Compilation', 'Isolates & Concurrency', 'Async Streams & Futures'],
    useCase: 'Core computational logic, type-safe API serialization, and high-performance cross-platform mobile architectures.',
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    category: 'mobile',
    categoryLabel: 'Mobile Apps',
    icon: SiKotlin,
    brandColor: '#7F52FF',
    level: 'Advanced',
    score: 89,
    description: 'Modern concise JVM and Android language with coroutines, flow streams, Jetpack Compose, and seamless Java interoperability.',
    highlights: ['Coroutines & StateFlow', 'Jetpack Compose UI', 'Null-Safe Architecture', 'Android Jetpack Libraries'],
    useCase: 'Native Android applications, background push notification services, and hardware-accelerated mobile features.',
  },
  {
    id: 'android',
    name: 'Android SDK',
    category: 'mobile',
    categoryLabel: 'Mobile Apps',
    icon: SiAndroid,
    brandColor: '#3DDC84',
    level: 'Advanced',
    score: 90,
    description: 'Native Android ecosystem engineering, lifecycle management, background WorkManager jobs, and device sensor integration.',
    highlights: ['Activity & Fragment Lifecycle', 'WorkManager & Background Tasks', 'Sensor & Hardware APIs', 'Material Design 3'],
    useCase: 'Production Android app builds, device sensor tracking, APK packaging, and native hardware optimization.',
  },

  // ── Backend & Systems ──
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    categoryLabel: 'Backend & Systems',
    icon: SiNodedotjs,
    brandColor: '#5FA04E',
    level: 'Production-Grade',
    score: 94,
    description: 'Event-driven backend servers, asynchronous I/O architectures, RESTful APIs, and socket engines.',
    highlights: ['Event-Driven Concurrency', 'Express / Fastify', 'Streaming File I/O', 'JWT / Auth Pipelines'],
    useCase: 'Enterprise backend backbones, real-time college portal APIs, and automated service layers.',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    categoryLabel: 'Backend & Systems',
    icon: SiPython,
    brandColor: '#FFD438',
    level: 'Advanced',
    score: 91,
    description: 'Scripting, backend service automation, data parsing, algorithmic problem solving, and API integrations.',
    highlights: ['FastAPI / Flask', 'Data Processing', 'Automation Scripts', 'Async Coroutines'],
    useCase: 'Microservices, backend data pipelines, math simulations, and rapid algorithmic prototyping.',
  },
  {
    id: 'django',
    name: 'Django',
    category: 'backend',
    categoryLabel: 'Backend & Systems',
    icon: SiDjango,
    brandColor: '#44B78B',
    level: 'Production-Grade',
    score: 93,
    description: 'Batteries-included high-level Python web framework with powerful ORM, automated migrations, Django REST Framework (DRF), and robust authentication.',
    highlights: ['Django ORM & QuerySets', 'Django REST Framework (DRF)', 'Role-Based Authentication', 'Admin Automation Engine'],
    useCase: 'Enterprise Python backends, rapid REST API prototyping, scalable relational schemas, and administrative data portals.',
  },
  {
    id: 'go',
    name: 'Go (Golang)',
    category: 'backend',
    categoryLabel: 'Backend & Systems',
    icon: SiGo,
    brandColor: '#00ADD8',
    level: 'Advanced',
    score: 87,
    description: 'High-throughput microservices, lightweight goroutine concurrency, and low-latency networking.',
    highlights: ['Goroutines & Channels', 'Low Latency Services', 'Minimal Memory Footprint', 'Strict Typing'],
    useCase: 'High-concurrency streaming servers, lightweight worker daemons, and microservices.',
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'backend',
    categoryLabel: 'Backend & Systems',
    icon: SiGraphql,
    brandColor: '#E10098',
    level: 'Advanced',
    score: 88,
    description: 'Declarative data fetching, strongly typed schemas, resolvers, and eliminating over-fetching.',
    highlights: ['Schema Design', 'Resolvers & Batched Queries', 'Type Generation', 'Apollo / Relay Integration'],
    useCase: 'Unified API aggregation layers, client-optimized data payloads, and complex relation querying.',
  },
  {
    id: 'cplusplus',
    name: 'C++',
    category: 'backend',
    categoryLabel: 'Backend & Systems',
    icon: SiCplusplus,
    brandColor: '#00599C',
    level: 'Proficient',
    score: 84,
    description: 'Object-oriented systems programming, memory pointers, DSA mastery, and hardware-near logic.',
    highlights: ['Data Structures & Algorithms', 'Pointers & Memory', 'OOP Paradigms', 'High-Performance Math'],
    useCase: 'Algorithmic computer science fundamentals, compute-heavy routines, and graphics pipelines.',
  },

  // ── Database & Cloud ──
  {
    id: 'docker',
    name: 'Docker',
    category: 'cloud',
    categoryLabel: 'Database & Cloud',
    icon: SiDocker,
    brandColor: '#2496ED',
    level: 'Production-Grade',
    score: 92,
    description: 'Containerized reproducible microservices, multi-stage lightweight builds, and local orchestration.',
    highlights: ['Multi-Stage Dockerfiles', 'Docker Compose Networks', 'Volume Persistence', 'Image Optimization'],
    useCase: 'Consistent development environments, automated container deployments, and microservice stacks.',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'cloud',
    categoryLabel: 'Database & Cloud',
    icon: SiPostgresql,
    brandColor: '#4169E1',
    level: 'Mastered',
    score: 95,
    description: 'Relational data modeling, ACID transactions, complex joins, indexing, and performant query planning.',
    highlights: ['Relational Schema Design', 'B-Tree & GIN Indexing', 'Role-Based Access Control', 'Triggers & Stored Procedures'],
    useCase: 'Mission-critical relational data for Tribhuvan Portal, user authentication, and attendance ledgers.',
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'cloud',
    categoryLabel: 'Database & Cloud',
    icon: SiRedis,
    brandColor: '#DC382D',
    level: 'Advanced',
    score: 89,
    description: 'In-memory key-value caching, session storage, Pub/Sub messaging, and rate-limiting buffers.',
    highlights: ['In-Memory Key-Value Caching', 'Pub/Sub Event Bus', 'TTL Expiry Models', 'Sub-millisecond Reads'],
    useCase: 'API response caching, authenticated user sessions, and real-time message queuing.',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'cloud',
    categoryLabel: 'Database & Cloud',
    icon: SiMongodb,
    brandColor: '#47A248',
    level: 'Advanced',
    score: 88,
    description: 'Document-oriented flexible NoSQL schemas, aggregation pipelines, and JSON document indexing.',
    highlights: ['Dynamic Schema Design', 'Aggregation Pipelines', 'Fast Prototyping', 'Atlas Cloud Hosting'],
    useCase: 'Flexible content storage, nested activity logs, and polymorphic application records.',
  },
  {
    id: 'linux',
    name: 'Linux / Bash',
    category: 'cloud',
    categoryLabel: 'Database & Cloud',
    icon: SiLinux,
    brandColor: '#FCC624',
    level: 'Advanced',
    score: 90,
    description: 'Server shell scripting, process management, SSH access, cron jobs, and production server upkeep.',
    highlights: ['Shell Script Automation', 'Process Monitoring', 'Systemd Daemons', 'SSH & Firewall Security'],
    useCase: 'Cloud VPS deployment environments, CI/CD pipeline automation, and local developer workflows.',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'cloud',
    categoryLabel: 'Database & Cloud',
    icon: SiGit,
    brandColor: '#F05032',
    level: 'Mastered',
    score: 96,
    description: 'Version control workflows, atomic commits, interactive rebase, pull-request reviews, and GitHub Actions.',
    highlights: ['Feature Branching', 'Interactive Rebasing', 'GitHub Actions CI/CD', 'Open-Source Collaboration'],
    useCase: 'Collaborative code review, automated continuous integration tests, and version history auditing.',
  },

  // ── Tools & Creative ──
  {
    id: 'blender',
    name: 'Blender 3D',
    category: 'tools',
    categoryLabel: 'Tools & Creative',
    icon: SiBlender,
    brandColor: '#E87D0D',
    level: 'Advanced',
    score: 88,
    description: 'Low-poly 3D modeling, UV unwrapping, baking materials, and exporting optimized GLTF/GLB web assets.',
    highlights: ['Low-Poly Modeling', 'GLTF/GLB Optimization', 'PBR Material Baking', 'Rigging & Animation'],
    useCase: 'Japanese Torii gate models, low-poly Sakura trees, custom celestial rings, and 3D web assets.',
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'tools',
    categoryLabel: 'Tools & Creative',
    icon: SiFigma,
    brandColor: '#F24E1E',
    level: 'Advanced',
    score: 92,
    description: 'UI/UX wireframing, interactive prototypes, design system design tokens, and vector asset export.',
    highlights: ['Component Variants', 'Auto-Layout Systems', 'Design Tokens', 'Rapid Prototyping'],
    useCase: 'Designing portfolio interfaces, folder-stack UI wireframes, and enterprise dashboard mockups.',
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'tools',
    categoryLabel: 'Tools & Creative',
    icon: SiPostman,
    brandColor: '#FF6C37',
    level: 'Mastered',
    score: 95,
    description: 'REST API testing, automated collection runners, environment variables, and mock server endpoints.',
    highlights: ['Automated Test Scripts', 'Environment Variables', 'Collection Runners', 'API Schema Validation'],
    useCase: 'Thorough API endpoint testing, RBAC permission verification, and automated regression runs.',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Technologies', icon: Layers },
  { id: 'frontend', label: 'Frontend & 3D', icon: Sparkles },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
  { id: 'backend', label: 'Backend & Systems', icon: Cpu },
  { id: 'cloud', label: 'Database & Cloud', icon: Database },
  { id: 'tools', label: 'Tools & Creative', icon: Wrench },
]

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null)

  // Filter skills based on selected category and search input
  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      const matchesCategory = activeCategory === 'all' || skill.category === activeCategory
      const matchesSearch =
        searchQuery.trim() === '' ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // Active skill in HUD (hovered one, or fallback to first filtered item or Three.js)
  const displaySkill = hoveredSkill || filteredSkills[0] || SKILLS_DATA[0]

  return (
    <section id="skills" className="min-h-screen px-4 sm:px-6 md:px-12 py-16 md:py-24 relative selection:bg-[#c93b2b] selection:text-white w-full max-w-full">
      {/* Background ambient lighting accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-[#c93b2b]/10 via-[#48cae4]/5 to-transparent blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full pointer-events-auto">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#c93b2b] font-bold mb-3 shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#c93b2b] animate-ping" />
              <span>02 // ARCHITECTURAL STACK &amp; CAPABILITIES</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold en tracking-tight text-white mb-3">
              Technical Arsenal
            </h2>
            <p className="text-sm md:text-base text-[#999] max-w-2xl font-light leading-relaxed">
              Crafting across the entire continuum — from low-latency distributed backend services and relational databases to real-time WebGL graphics and interactive 3D shaders.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs text-[#aaa] bg-white/[0.03] backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/10 shrink-0">
            <div className="px-2.5 sm:px-3 py-1.5 bg-white/[0.05] rounded-xl border border-white/10 text-white font-bold flex items-center gap-1.5 text-[11px] sm:text-xs">
              <Activity size={13} className="text-[#c93b2b]" />
              <span>{SKILLS_DATA.length} MODULES READY</span>
            </div>
            <span className="text-[#666] hidden sm:inline">|</span>
            <div className="flex items-center gap-1 text-[#48cae4]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#48cae4] animate-pulse" />
              <span>PRODUCTION TESTED</span>
            </div>
          </div>
        </div>

        {/* ── Controls Row: Category Filter Chips & Quick Search ── */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8 pb-6 border-b border-white/10">
          
          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const count = cat.id === 'all' 
                ? SKILLS_DATA.length 
                : SKILLS_DATA.filter(s => s.category === cat.id).length
              const isActive = activeCategory === cat.id

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-mono transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer border ${
                    isActive
                      ? 'bg-white/10 border-[#c93b2b] text-white font-bold shadow-[0_0_20px_rgba(201,59,43,0.3)]'
                      : 'bg-white/[0.03] border-white/10 text-[#888] hover:text-white hover:bg-white/[0.07] hover:border-white/20'
                  }`}
                >
                  <Icon size={12} className={isActive ? 'text-[#c93b2b]' : 'text-[#777]'} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isActive ? 'bg-[#c93b2b]/30 text-white' : 'bg-white/10 text-[#666]'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Real-time Search Box */}
          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack (e.g. Three, Docker)..."
              className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#c93b2b] rounded-xl pl-9 pr-8 py-2 text-xs font-mono text-white placeholder-[#666] outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777] hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── Main Layout: Interactive Skills Grid (Left 65%) + Live Telemetry HUD (Right 35%) ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* ── SKILLS INTERACTIVE GRID (8 cols on lg) ── */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3.5">
              {filteredSkills.map((skill) => {
                const IconComponent = skill.icon
                const isHovered = hoveredSkill?.id === skill.id

                return (
                  <div
                    key={skill.id}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="group relative p-3 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md select-none"
                    style={{
                      backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                      borderColor: isHovered ? `${skill.brandColor}66` : 'rgba(255, 255, 255, 0.08)',
                      transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'none',
                      boxShadow: isHovered
                        ? `0 12px 30px -10px ${skill.brandColor}33, 0 0 20px ${skill.brandColor}15`
                        : 'none',
                    }}
                  >
                    {/* Ambient Radial Hover Glow behind card */}
                    <div
                      className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none"
                      style={{
                        backgroundColor: skill.brandColor,
                        opacity: isHovered ? 0.25 : 0,
                      }}
                    />

                    {/* Top Row: Translucent / Frosted Icon Container */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 relative"
                        style={{
                          backgroundColor: isHovered ? `${skill.brandColor}15` : 'rgba(255, 255, 255, 0.03)',
                          borderColor: isHovered ? `${skill.brandColor}40` : 'rgba(255, 255, 255, 0.1)',
                          boxShadow: isHovered ? `0 0 16px ${skill.brandColor}40` : 'none',
                        }}
                      >
                        {/* THE ICON: Frosted/Translucent Monochromatic by default, Color blooms on hover */}
                        <IconComponent
                          size={22}
                          className="transition-all duration-300"
                          style={{
                            color: isHovered ? skill.brandColor : 'rgba(255, 255, 255, 0.35)',
                            transform: isHovered ? 'scale(1.12)' : 'scale(1)',
                            filter: isHovered
                              ? `drop-shadow(0 0 8px ${skill.brandColor}80)`
                              : 'grayscale(100%) opacity(0.5)',
                          }}
                        />
                      </div>

                      {/* Score Indicator Pill */}
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md border transition-colors duration-300"
                        style={{
                          backgroundColor: isHovered ? `${skill.brandColor}18` : 'rgba(255, 255, 255, 0.03)',
                          borderColor: isHovered ? `${skill.brandColor}30` : 'rgba(255, 255, 255, 0.08)',
                          color: isHovered ? skill.brandColor : '#777',
                        }}
                      >
                        {skill.score}%
                      </span>
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-sm font-bold tracking-tight text-white mb-1 group-hover:text-white transition-colors">
                      {skill.name}
                    </h3>

                    {/* Sub-tag Category */}
                    <span className="text-[10px] font-mono text-[#888] block truncate mb-3">
                      {skill.categoryLabel}
                    </span>

                    {/* Micro Mastery Bar */}
                    <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${skill.score}%`,
                          backgroundColor: isHovered ? skill.brandColor : 'rgba(255, 255, 255, 0.15)',
                          boxShadow: isHovered ? `0 0 8px ${skill.brandColor}` : 'none',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {filteredSkills.length === 0 && (
              <div className="p-12 text-center bg-white/[0.02] border border-white/10 rounded-2xl">
                <p className="text-sm font-mono text-[#888] mb-2">No technologies found matching &quot;{searchQuery}&quot;</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all') }}
                  className="px-4 py-2 bg-white/10 rounded-xl text-xs font-mono text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Aesthetic Stack Footer Note */}
            <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#777]">
              <span className="flex items-center gap-2">
                <Terminal size={13} className="text-[#c93b2b]" />
                Hover any module to awaken brand chromas &amp; inspect telemetry
              </span>
              <span className="hidden sm:inline text-[#555]">ACTIVE_PROTOCOL: 2026</span>
            </div>
          </div>

          {/* ── RIGHT TELEMETRY INSPECTOR HUD (4 cols on lg - Sticky follows user down the entire grid) ── */}
          <div 
            className="lg:col-span-4 self-start relative"
            style={{
              position: 'sticky',
              top: '100px',
              zIndex: 20,
            }}
          >
            <div className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
              
              {/* Luminous corner aura based on display skill brand color */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-700 -z-10"
                style={{
                  backgroundColor: displaySkill.brandColor,
                  opacity: 0.15,
                }}
              />

              {/* HUD Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#aaa]">
                  <Zap size={13} className="text-[#c93b2b]" />
                  <span>MODULE INSPECTOR</span>
                </div>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                  style={{
                    color: displaySkill.brandColor,
                    borderColor: `${displaySkill.brandColor}40`,
                    backgroundColor: `${displaySkill.brandColor}12`,
                  }}
                >
                  {displaySkill.level}
                </span>
              </div>

              {/* Large Spotlight Icon + Title */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 relative shrink-0"
                  style={{
                    backgroundColor: `${displaySkill.brandColor}15`,
                    borderColor: `${displaySkill.brandColor}40`,
                    boxShadow: `0 0 25px ${displaySkill.brandColor}35`,
                  }}
                >
                  {React.createElement(displaySkill.icon, {
                    size: 32,
                    style: {
                      color: displaySkill.brandColor,
                      filter: `drop-shadow(0 0 10px ${displaySkill.brandColor}90)`,
                    },
                  })}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white en tracking-tight">
                    {displaySkill.name}
                  </h4>
                  <span className="text-xs font-mono text-[#888]">
                    {displaySkill.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Architectural Description */}
              <div className="mb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#777] block mb-1.5">
                  Architectural Role
                </span>
                <p className="text-xs text-[#bbb] leading-relaxed font-light">
                  {displaySkill.description}
                </p>
              </div>

              {/* Key Capabilities / Highlights Chips */}
              <div className="mb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#777] block mb-2">
                  Key Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {displaySkill.highlights.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-white/90 flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={10} style={{ color: displaySkill.brandColor }} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Portfolio Use Case */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 mb-6">
                <span className="text-[10px] font-mono text-[#c93b2b] uppercase tracking-wider block mb-1 font-bold">
                  Portfolio Implementation
                </span>
                <p className="text-xs text-[#ddd] font-mono leading-snug">
                  {displaySkill.useCase}
                </p>
              </div>

              {/* Mastery Telemetry Gauge */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-[#888]">PROFICIENCY INDEX</span>
                  <span style={{ color: displaySkill.brandColor }} className="font-bold">
                    {displaySkill.score} / 100
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${displaySkill.score}%`,
                      backgroundColor: displaySkill.brandColor,
                      boxShadow: `0 0 10px ${displaySkill.brandColor}`,
                    }}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

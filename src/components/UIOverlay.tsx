import { useState, useRef } from 'react'
import {
  GitMerge,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileCode,
  ExternalLink,
  X,
} from 'lucide-react'

import SkillsSection from './SkillsSection'
import ContactSection from './ContactSection'

interface UIOverlayProps {
  act: 1 | 2
  onContinue: () => void
  onSwitchAct: (act: 1 | 2) => void
}

export interface ProjectItem {
  id: string
  folderTab: string
  title: string
  badge: string
  year: string
  shortDesc: string
  fullDesc: string
  tech: string[]
  githubUrl: string
  liveDemoUrl?: string
  modules: { name: string; tech: string; status: string }[]
  metrics: { label: string; val: string }[]
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'watch_party',
    folderTab: '01 // WATCH_PARTY',
    title: 'WatchParty — Sync & Stream',
    badge: 'REAL-TIME FULL-STACK WEB APP',
    year: '2026',
    shortDesc: 'Full-stack platform for hosting private watch rooms where friends & family can stream videos in perfect sync, chat live, and video call — all in one shared room via a simple room code.',
    fullDesc: 'Built and deployed a full-stack web application (watchparty.website) enabling users to create private watch rooms and stream video synchronously with friends remotely. Engineered real-time video synchronization, live chat, video calling, and screen sharing using WebRTC and Socket.io, supporting multiple concurrent connections per room with minimal playback lag.',
    tech: ['React 18', 'Node.js', 'Socket.IO', 'WebRTC', 'Firebase Auth', 'Tailwind CSS'],
    githubUrl: 'https://github.com/aasif41/watch-party-app',
    liveDemoUrl: 'https://watchparty.website',
    modules: [
      { name: 'Real-Time Video Sync Engine', tech: 'Socket.IO + WebRTC', status: 'Active' },
      { name: 'Live Chat with XSS Protection', tech: 'Socket.IO / DOMPurify', status: 'Active' },
      { name: 'Video Call & Screen Sharing', tech: 'WebRTC Peer-to-Peer', status: 'Active' },
      { name: 'Google OAuth & Room Access Control', tech: 'Firebase Auth', status: 'Active' },
    ],
    metrics: [
      { label: 'Real-Time', val: 'WebRTC + Socket.IO' },
      { label: 'Auth', val: 'Google OAuth' },
      { label: 'Sync', val: 'Multi-User Playback' },
      { label: 'Security', val: 'DOMPurify / XSS Safe' },
    ],
  },
  {
    id: 'tribhuvan_portal',
    folderTab: '02 // TRIBHUVAN_PORTAL',
    title: 'Tribhuvan College Portal & App',
    badge: 'FEATURED FULL-STACK & MOBILE',
    year: '2026',
    shortDesc: 'Comprehensive multi-role institutional ecosystem with dedicated dashboards for Admins, Teachers, and Students, automated attendance tracking, dynamic timetables & cross-platform React Native app.',
    fullDesc: 'A complete full-stack enterprise campus management system. Engineered secure role-based access control (RBAC), subject-wise attendance logs, timetable builders, announcement feeds, and a React Native mobile application for student smartphones.',
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'React Native', 'JWT / RBAC', 'Tailwind CSS'],
    githubUrl: 'https://github.com/aasif41/tribhuvan_portal',
    liveDemoUrl: 'https://tribhuvan-portal-web.vercel.app/',
    modules: [
      { name: 'Admin Control & Institutional RBAC', tech: 'Node.js / Express', status: 'Active' },
      { name: 'Teacher Class & Subject Attendance Engine', tech: 'PostgreSQL / SQL', status: 'Active' },
      { name: 'Student Timetable, Notices & Profile Hub', tech: 'React / TypeScript', status: 'Active' },
      { name: 'Cross-Platform Student Mobile Client', tech: 'React Native / Expo', status: 'Active' },
    ],
    metrics: [
      { label: 'Architecture', val: 'Multi-Role RBAC' },
      { label: 'Security', val: 'Zero-Vulnerability JWT' },
      { label: 'Platforms', val: 'Web + Android/iOS' },
      { label: 'Database', val: 'PostgreSQL Relational' },
    ],
  },
  {
    id: 'ai_resume_builder',
    folderTab: '03 // AI_RESUME_BUILDER',
    title: 'AI Resume & Portfolio Builder',
    badge: 'AI-POWERED WEB APPLICATION',
    year: '2026',
    shortDesc: 'Intelligent web platform for crafting professional resumes and live personal portfolio websites with AI content recommendations, multi-template styling, and clean HTML/CSS exports.',
    fullDesc: 'Built an AI-assisted web platform enabling users to create ATS-friendly professional resumes and live personal portfolio sites from a single simple interface. Features integrated generative AI suggestions for real-time phrasing improvements, customizable multi-template themes, and one-click clean HTML/CSS codebase exports for portfolios.',
    tech: ['React.js', 'JavaScript', 'Generative AI API', 'Tailwind CSS', 'HTML5 / CSS3'],
    githubUrl: 'https://github.com/aasif41/ai-resume-builder',
    liveDemoUrl: 'https://ai-resume-builder-iota-lake-23.vercel.app/',
    modules: [
      { name: 'AI Resume Analyzer & Feedback Engine', tech: 'AI API / NLP', status: 'Active' },
      { name: 'Multi-Template Dynamic Resume Styler', tech: 'React / Dynamic CSS', status: 'Active' },
      { name: 'Auto-Generated Portfolio Website Builder', tech: 'HTML/CSS Exporter', status: 'Active' },
      { name: 'Interactive Form & Live Preview Sync', tech: 'React State / Hooks', status: 'Active' },
    ],
    metrics: [
      { label: 'Intelligence', val: 'AI Content Feedback' },
      { label: 'Export', val: 'PDF + HTML/CSS' },
      { label: 'Templates', val: 'Multi-Style ATS' },
      { label: 'Output', val: 'Resume + Portfolio' },
    ],
  },
  {
    id: 'multimodal_ai',
    folderTab: '04 // MULTIMODAL_AI',
    title: 'Multimodal AI Chat & Vision Assistant',
    badge: 'CONVERSATIONAL & VISION AI',
    year: '2026',
    shortDesc: 'ChatGPT/Gemini-inspired AI chatbot engineered with Groq API for ultra-fast text inference and Hugging Face Vision models for image recognition, instant recipe extraction, and live photo Q&A.',
    fullDesc: 'Engineered a full-featured multimodal AI web assistant inspired by modern conversational AI platforms. Integrates Groq API for near-instant text generation and Hugging Face Vision APIs for computer vision tasks — enabling users to upload dish photos for recipe and ingredient breakdowns or snap live camera photos for contextual visual analysis.',
    tech: ['React.js', 'JavaScript', 'Groq API', 'Hugging Face API', 'Tailwind CSS', 'HTML5 / CSS3'],
    githubUrl: 'https://github.com/aasif41/MultimodelAI',
    liveDemoUrl: 'https://multimodal-ai-seven.vercel.app/',
    modules: [
      { name: 'Ultra-Fast Chat Inference Engine', tech: 'Groq Llama 3 API', status: 'Active' },
      { name: 'Image & Recipe Recognition Vision Pipeline', tech: 'Hugging Face Vision', status: 'Active' },
      { name: 'Live Camera Capture & Visual Inspector', tech: 'WebRTC / Canvas', status: 'Active' },
      { name: 'ChatGPT-Style Responsive Stream UI/UX', tech: 'React / Markdown', status: 'Active' },
    ],
    metrics: [
      { label: 'LLM Speed', val: 'Groq Ultra-Fast' },
      { label: 'Vision AI', val: 'Hugging Face API' },
      { label: 'Input Mode', val: 'Text + Image + Cam' },
      { label: 'Interface', val: 'Chatbot UX / UI' },
    ],
  },
  {
    id: 'notespace_app',
    folderTab: '05 // NOTESPACE_APP',
    title: 'NoteSpace — Note-Taking & Task App',
    badge: 'CROSS-PLATFORM FLUTTER APP',
    year: '2026',
    shortDesc: 'Feature-rich multi-format note-taking & task management app built with Flutter/Dart. Supports mind mapping, voice memos, checklists, private locked notes, canvas sketches, and JSON backups.',
    fullDesc: 'Engineered a versatile, high-performance note-taking and productivity app built with Flutter and Dart for Android, iOS, and Windows. Accommodates rich text notes, interactive checklists, integrated to-dos, audio voice notes, freehand sketches, biometric/PIN private note locks, customizable desktop/home screen widgets, and complete JSON file import/export backups.',
    tech: ['Flutter', 'Dart', 'SQLite', 'Audio Recording API', 'Biometric Auth', 'Cross-Platform'],
    githubUrl: 'https://github.com/aasif41/NoteSpace',
    modules: [
      { name: 'Multi-Format Input Engine', tech: 'Voice / Sketch / Text', status: 'Active' },
      { name: 'Encrypted Private Note Vault', tech: 'Biometric / PIN Auth', status: 'Active' },
      { name: 'To-Do & Interactive Checklists', tech: 'Stateful Task Engine', status: 'Active' },
      { name: 'JSON Portable Backup & Restore', tech: 'File I/O / Serialization', status: 'Active' },
    ],
    metrics: [
      { label: 'Platform', val: 'Android / iOS / Win' },
      { label: 'Framework', val: 'Flutter & Dart' },
      { label: 'Storage', val: 'Local SQLite DB' },
      { label: 'Privacy', val: 'PIN / Biometric Lock' },
    ],
  },
]

export default function UIOverlay({ act, onContinue, onSwitchAct }: UIOverlayProps) {
  // Stacked Folder State (Detail is closed by default as requested!)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isDossierClosing, setIsDossierClosing] = useState(false)
  const [isEmbedInteractive, setIsEmbedInteractive] = useState(false)

  const closeDossier = () => {
    setIsDossierClosing(true)
    setTimeout(() => {
      setIsDetailOpen(false)
      setIsDossierClosing(false)
    }, 370)
  }

  const folderContainerRef = useRef<HTMLDivElement>(null)

  const isWheelThrottled = useRef(false)
  const handleFolderWheel = (e: WheelEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isWheelThrottled.current) return

    if (Math.abs(e.deltaY) > 5) {
      isWheelThrottled.current = true
      if (e.deltaY > 0) {
        setActiveProjectIndex((prev) => (prev + 1) % PROJECTS_DATA.length)
      } else {
        setActiveProjectIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length)
      }
      setTimeout(() => {
        isWheelThrottled.current = false
      }, 220)
    }
  }

  // Callback ref to bind non-passive wheel listener immediately upon mounting in DOM
  const folderRefCallback = (node: HTMLDivElement | null) => {
    if (folderContainerRef.current) {
      folderContainerRef.current.removeEventListener('wheel', handleFolderWheel)
    }
    folderContainerRef.current = node
    if (node) {
      node.addEventListener('wheel', handleFolderWheel, { passive: false })
    }
  }

  const activeProject = PROJECTS_DATA[activeProjectIndex]

  return (
    <div className="relative z-10 w-full pointer-events-none">
      {act === 1 ? (
        /* ========================================================================= */
        /* ============================ ACT 1: SAKURA SHRINE ======================= */
        /* ========================================================================= */
        <div className="text-[#161216]">
          {/* Hero Viewport */}
          <section className="h-screen flex flex-col justify-between p-5 sm:p-8 md:p-14 pt-20 sm:pt-24 md:pt-28 select-none relative">
            <div className="max-w-xl pointer-events-none pt-2">
              {/* Minimal Tiny Japanese Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-black/10 text-[10px] font-mono text-[#555] mb-3 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#c93b2b] animate-ping" />
                <span className="jp font-bold text-[#c93b2b]">ムハンマド アースィフ</span>
                <span className="text-[#888]">/</span>
                <span className="en font-bold uppercase tracking-wider text-[#161216]">2026</span>
              </div>

              {/* Clean Main Title */}
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-aquire tracking-tight text-[#161216] mb-2 leading-tight">
                MD AASIF
              </h1>

              {/* SubJob Title */}
              <h2 className="text-xs sm:text-sm md:text-lg font-bold font-movement tracking-widest text-[#161216] uppercase mb-3 sm:mb-4">
                Creative Full-Stack Developer &amp; 3D Engineer
              </h2>

              {/* SubDescription */}
              <div className="text-xs sm:text-sm md:text-base text-[#222] font-light leading-relaxed max-w-md mb-6 sm:mb-8">
                <p>
                  Final-year <strong className="font-bold text-[#161216]">BSc (Hons) CS</strong> student who codes in two dimensions and designs in three. Full-stack by trade, 3D designer by obsession — building WebGL experiences the internet remembers.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onContinue}
                  className="pointer-events-auto px-8 py-3.5 bg-[#161216] text-white font-mono text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-[#c93b2b] transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2 group"
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

            {/* Bottom-Left Minimal Pure Text Scroll Indicator */}
            <div className="pointer-events-none self-start pb-2 flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-[#161216]">
              <span>SCROLL TO WALK</span>
              <ChevronDown size={14} className="animate-bounce text-[#c93b2b]" />
            </div>
          </section>

          {/* Act 1 Scroll Travel & Clean Click to Continue Prompt */}
          <section className="h-screen flex flex-col items-center justify-center select-none pointer-events-none w-full overflow-hidden">
            <button
              onClick={onContinue}
              className="pointer-events-auto group cursor-pointer text-center w-full h-[65vh] md:h-[75vh] flex flex-col items-center justify-center transition-transform duration-200 hover:scale-[1.02] will-change-transform px-4"
            >
              <h2
                className="pointer-events-none whitespace-nowrap text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold font-movement uppercase tracking-wider transition-colors duration-200 text-transparent group-hover:text-[#161216] group-hover:[-webkit-text-fill-color:#161216] group-hover:[-webkit-text-stroke-color:#161216]"
                style={{ WebkitTextStroke: '2px #161216' }}
              >
                Click to continue
              </h2>
            </button>
          </section>
        </div>
      ) : (
        /* ========================================================================= */
        /* ============================ ACT 2: GALAXY SPACE ======================== */
        /* ========================================================================= */
        <div className="text-[#fffcfc]">

          {/* ── SECTION 1: PROJECTS ── full screen */}
          <section id="projects" className="min-h-screen px-4 sm:px-6 md:px-12 py-16 md:py-20 relative">
            <div className="max-w-7xl mx-auto">
              {/* Header & Floating Preview */}
              <div className="grid md:grid-cols-2 gap-8 items-start mb-16 pointer-events-auto">
                <div>
                  <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold en tracking-tight mb-3 sm:mb-4">
                    Last Project recognitions
                  </h1>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold en text-[#c93b2b] mb-4 sm:mb-6">
                    <a href="https://watchparty.website" target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-2">
                      WatchParty — Sync &amp; Stream
                      <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                    </a>
                  </h2>

                  {/* Recognitions / Features List */}
                  <div className="space-y-2.5 sm:space-y-3 font-mono text-xs md:text-sm text-[#bbb] mb-8">
                    <div className="p-3 sm:p-3.5 bg-white/[0.05] rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3 hover:border-[#c93b2b] transition-all">
                      <span className="text-[11px] sm:text-xs md:text-sm">2026 | Real-Time Video Synchronization</span>
                      <span className="text-[#c93b2b] font-bold text-[10px] sm:text-xs shrink-0">[ Socket.IO / WebRTC ]</span>
                    </div>
                    <div className="p-3 sm:p-3.5 bg-white/[0.05] rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3 hover:border-[#c93b2b] transition-all">
                      <span className="text-[11px] sm:text-xs md:text-sm">2026 | Live Multi-User Chat &amp; XSS Defense</span>
                      <span className="text-[#c93b2b] font-bold text-[10px] sm:text-xs shrink-0">[ Node.js / DOMPurify ]</span>
                    </div>
                    <div className="p-3 sm:p-3.5 bg-white/[0.05] rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3 hover:border-[#c93b2b] transition-all">
                      <span className="text-[11px] sm:text-xs md:text-sm">2026 | Peer-to-Peer Video Call &amp; Screen Share</span>
                      <span className="text-[#c93b2b] font-bold text-[10px] sm:text-xs shrink-0">[ WebRTC Mesh ]</span>
                    </div>
                    <div className="p-3 sm:p-3.5 bg-white/[0.05] rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3 hover:border-[#c93b2b] transition-all">
                      <span className="text-[11px] sm:text-xs md:text-sm">2026 | Google OAuth &amp; Room Access Control</span>
                      <span className="text-[#c93b2b] font-bold text-[10px] sm:text-xs shrink-0">[ Firebase Auth ]</span>
                    </div>
                  </div>
                </div>

                {/* WatchParty Live Interactive Preview Window */}
                <div className="p-5 md:p-6 bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                  {/* Atmospheric background glow */}
                  <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#c93b2b]/15 rounded-full blur-3xl pointer-events-none" />

                  {/* Browser Chrome Header */}
                  <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-3">
                    {/* Mac Window Dots */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
                    </div>

                    {/* URL Bar Pill */}
                    <a
                      href="https://watchparty.website"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] font-mono text-[#aaa] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-white font-medium">watchparty.website</span>
                    </a>

                    {/* External Link */}
                    <a
                      href="https://watchparty.website"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#aaa] hover:text-white transition-colors p-1 cursor-pointer"
                      title="Open in new tab"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  {/* Live Interactive Web App Frame */}
                  <div className="relative w-full h-[360px] sm:h-[400px] md:h-[440px] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-inner mb-4 group/frame">
                    <iframe
                      src="https://watchparty.website"
                      title="WatchParty Live Interactive Application"
                      className={`border-0 w-full h-full ${
                        isEmbedInteractive ? 'pointer-events-auto' : 'pointer-events-none md:pointer-events-auto'
                      }`}
                      style={{
                        transform: 'scale(0.48)',
                        transformOrigin: 'top left',
                        width: '208.33%',
                        height: '208.33%',
                      }}
                    />

                    {/* Mobile Touch Overlay to allow scrolling without getting stuck */}
                    {!isEmbedInteractive && (
                      <div 
                        onClick={() => setIsEmbedInteractive(true)}
                        className="md:hidden absolute inset-0 bg-black/35 backdrop-blur-[1px] flex flex-col items-center justify-center gap-2 cursor-pointer z-10 p-4 text-center"
                      >
                        <span className="px-3.5 py-1.5 rounded-full bg-[#c93b2b] text-white font-mono text-xs font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
                          <span>Tap to Interact</span>
                          <ExternalLink size={12} />
                        </span>
                        <span className="text-[10px] font-mono text-[#ddd] bg-black/70 px-2.5 py-0.5 rounded-full">
                          (Scroll freely elsewhere on page)
                        </span>
                      </div>
                    )}

                    {/* Floating Live Interaction Badge */}
                    <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 pointer-events-none shadow-md z-20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="truncate max-w-[190px] sm:max-w-none">LIVE APP // REAL-TIME SYNC</span>
                    </div>

                    {isEmbedInteractive && (
                      <button
                        onClick={() => setIsEmbedInteractive(false)}
                        className="md:hidden absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/80 border border-white/20 text-[10px] font-mono text-[#bbb] hover:text-white z-20"
                      >
                        Lock Scroll
                      </button>
                    )}
                  </div>

                  {/* Tech stack pills & Launch button */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                      <span className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[#bbb]">React 18</span>
                      <span className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[#bbb]">Socket.IO</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#c93b2b]/20 border border-[#c93b2b]/40 text-[#c93b2b] font-bold">WebRTC P2P</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="https://github.com/aasif41/watch-party-app"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 rounded-xl text-xs font-mono text-[#ccc] hover:text-white transition-all inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <GitMerge size={12} />
                        <span>Repo</span>
                      </a>
                      <a
                        href="https://watchparty.website"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 bg-[#c93b2b] hover:bg-[#d94838] rounded-xl text-xs font-mono font-bold text-white transition-all inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(201,59,43,0.3)] cursor-pointer"
                      >
                        <span>Open Fullscreen</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Big Section Headline */}
              <div className="text-center my-14 pointer-events-auto">
                <h2 className="text-3xl md:text-6xl font-light en tracking-wider mb-2">
                  Developed Projects
                </h2>
                <div className="w-16 h-[2px] bg-[#c93b2b] mx-auto mt-4" />
              </div>

              {/* â”€â”€ 50/50 Screen Split: Left Folder & Right Dossier (Matching Identical Dimensions) â”€â”€ */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch pointer-events-auto mt-6">
                
                {/* â”€â”€ LEFT HALF: Authentic Folder Stack (50% Split, Exact Reference Silhouette) â”€â”€ */}
                <div className="w-full flex flex-col justify-center">
                  
                  {/* â”€â”€ THE FOLDER STACK CONTAINER (Intercepts scroll wheel & prevents page scroll) â”€â”€ */}
                  <div 
                    ref={folderRefCallback}
                    className="relative w-full h-[450px] select-none cursor-pointer group"
                    onClick={() => setIsDetailOpen(true)}
                  >
                    {/* Render Stacked Folders behind (Layers 3 & 2) with clean low opacity and zero body text */}
                    {PROJECTS_DATA.map((proj, idx) => {
                      const offset = (idx - activeProjectIndex + PROJECTS_DATA.length) % PROJECTS_DATA.length
                      if (offset === 0 || offset > 2) return null

                      const isNext = offset === 1
                      const translateX = isNext ? 22 : 44
                      const translateY = isNext ? -18 : -34
                      const scale = isNext ? 0.97 : 0.94
                      const opacity = isNext ? 0.6 : 0.35
                      const zIndex = isNext ? 20 : 10

                      return (
                        <div
                          key={proj.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveProjectIndex(idx)
                          }}
                          className="absolute inset-0 transition-all duration-300 ease-out hover:brightness-125 cursor-pointer"
                          style={{
                            transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
                            opacity,
                            zIndex,
                          }}
                        >
                          {/* Exact Folder Silhouette SVG */}
                          <svg viewBox="0 0 560 450" className="w-full h-full drop-shadow-xl" preserveAspectRatio="none">
                            {/* Back Plate with Tab */}
                            <path
                              d="M 18 68 L 18 36 C 18 20, 30 12, 48 12 L 180 12 C 200 12, 214 22, 228 38 C 244 54, 258 60, 278 60 L 530 60 C 546 60, 554 70, 554 86 L 554 430 C 554 444, 540 450, 524 450 L 48 450 C 32 450, 18 444, 18 430 Z"
                              fill="#16161e"
                              stroke="rgba(255, 255, 255, 0.15)"
                              strokeWidth="1.5"
                            />
                            {/* Front Pocket */}
                            <path
                              d="M 18 80 C 18 64, 30 54, 48 54 L 530 54 C 546 54, 554 64, 554 80 L 554 430 C 554 444, 540 450, 524 450 L 48 450 C 32 450, 18 444, 18 430 Z"
                              fill="#101015"
                              stroke="rgba(255, 255, 255, 0.12)"
                              strokeWidth="1.5"
                            />
                          </svg>

                          {/* Clean Dim Tab Indicator (No body text, prevents collision with front file) */}
                          <div 
                            className="absolute top-[28px] left-8 font-mono text-[11px] text-white/50 font-bold flex items-center gap-1.5"
                            style={{ opacity: isNext ? 0.7 : 0.4 }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                            <span>{proj.folderTab.split(' // ')[0]}</span>
                          </div>
                        </div>
                      )
                    })}

                    {/* â”€â”€ ACTIVE FRONT FOLDER (Solid Opaque Charcoal Body to Prevent Ghosting) â”€â”€ */}
                    <div 
                      className="absolute inset-0 z-30 transition-all duration-300 drop-shadow-2xl"
                    >
                      <div className="relative w-full h-full">
                        
                        {/* 1. Vector SVG Folder Shell Matching Reference Design */}
                        <svg viewBox="0 0 560 450" className="w-full h-full absolute inset-0 pointer-events-none" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="folderBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#22222c" />
                              <stop offset="100%" stopColor="#16161f" />
                            </linearGradient>
                            <linearGradient id="folderFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#181822" />
                              <stop offset="40%" stopColor="#13131b" />
                              <stop offset="100%" stopColor="#0d0d12" />
                            </linearGradient>
                          </defs>

                          {/* Back Flap with Smooth Curved Tab */}
                          <path
                            d="M 18 68 L 18 36 C 18 20, 30 12, 48 12 L 180 12 C 200 12, 214 22, 228 38 C 244 54, 258 60, 278 60 L 530 60 C 546 60, 554 70, 554 86 L 554 430 C 554 444, 540 450, 524 450 L 48 450 C 32 450, 18 444, 18 430 Z"
                            fill="url(#folderBackGrad)"
                            stroke="rgba(255, 255, 255, 0.25)"
                            strokeWidth="1.5"
                          />

                          {/* Front Pocket with Rounded Corners (Solid Opaque to completely block background bleed) */}
                          <path
                            d="M 18 80 C 18 64, 30 54, 48 54 L 530 54 C 546 54, 554 64, 554 80 L 554 430 C 554 444, 540 450, 524 450 L 48 450 C 32 450, 18 444, 18 430 Z"
                            fill="url(#folderFrontGrad)"
                            stroke="rgba(255, 255, 255, 0.22)"
                            strokeWidth="1.5"
                          />

                          {/* 2 Bottom Embossed Accent Lines (Matching Reference Icon) */}
                          <line x1="48" y1="418" x2="524" y2="418" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />
                          <line x1="48" y1="428" x2="524" y2="428" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.5" />
                        </svg>

                        {/* 2. Top-Left Tab Content (Vertically centered with balanced padding) */}
                        <div className="absolute top-[26px] left-8 z-10 flex items-center gap-2 font-mono text-xs text-[#fffcfc] font-bold">
                          <span className="w-2 h-2 rounded-full bg-[#c93b2b] animate-pulse" />
                          <span>{activeProject.folderTab}</span>
                        </div>

                        {/* Top-Right Quick Project Change Buttons (No numbers, sleek compact stepper placed higher on rim) */}
                        <div className="absolute top-[2px] right-7 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-xl border border-white/15 shadow-md">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveProjectIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length)
                            }}
                            className="p-1.5 text-[#bbb] hover:text-white hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                            title="Previous Project"
                          >
                            <ChevronLeft size={14} />
                          </button>
                          <div className="w-[1px] h-3.5 bg-white/15" />
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveProjectIndex((prev) => (prev + 1) % PROJECTS_DATA.length)
                            }}
                            className="p-1.5 text-[#bbb] hover:text-white hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                            title="Next Project"
                          >
                            <ChevronRight size={14} />
                          </button>
                        </div>

                        {/* 3. Front Pocket Content Container */}
                        <div className="absolute top-16 inset-x-8 bottom-10 z-20 flex flex-col justify-between p-4">
                          
                          {/* Info Header */}
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2.5">
                              <span className="px-3 py-0.5 bg-[#c93b2b]/15 border border-[#c93b2b]/30 rounded text-[11px] font-mono text-[#c93b2b] font-bold uppercase tracking-wider">
                                {activeProject.badge}
                              </span>
                              <span className="text-xs font-mono text-[#888]">{activeProject.year}</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold en text-[#fffcfc] mb-3 leading-snug group-hover:text-[#c93b2b] transition-colors">
                              {activeProject.title}
                            </h3>

                            <p className="text-xs md:text-sm text-[#bbb] leading-relaxed line-clamp-3 font-light mb-3">
                              {activeProject.shortDesc}
                            </p>
                          </div>

                          {/* Tech Stack & Action Bar */}
                          <div>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {activeProject.tech.map((t) => (
                                <span key={t} className="px-2.5 py-0.5 bg-white/[0.06] border border-white/10 rounded-md text-[11px] font-mono text-[#ddd]">
                                  {t}
                                </span>
                              ))}
                            </div>

                            {/* Buttons on Front */}
                            <div className="flex items-center justify-between gap-3 pt-3.5 border-t border-white/10">
                              <div className="flex items-center gap-3">
                                <a
                                  href={activeProject.githubUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-4 py-2 bg-[#c93b2b] text-white font-mono text-xs font-bold rounded-xl hover:bg-[#d94838] transition-all inline-flex items-center gap-2 shadow-md shadow-[#c93b2b]/30"
                                >
                                  <GitMerge size={13} />
                                  GitHub
                                </a>
                                {activeProject.liveDemoUrl && (
                                  <a
                                    href={activeProject.liveDemoUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-mono text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2"
                                  >
                                    <ExternalLink size={13} />
                                    Live Demo
                                  </a>
                                )}
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveProjectIndex((prev) => (prev + 1) % PROJECTS_DATA.length)
                                  }}
                                  className="text-xs font-mono text-[#bbb] hover:text-white inline-flex items-center gap-1 cursor-pointer transition-colors"
                                  title="Cycle to next project"
                                >
                                  <span>Next</span>
                                  <ArrowRight size={12} />
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setIsDetailOpen(true)
                                  }}
                                  className="text-xs font-mono text-[#c93b2b] hover:underline font-bold inline-flex items-center gap-1.5 cursor-pointer"
                                >
                                  <span>Open File ↗</span>
                                </button>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── RIGHT HALF: Mac-Genie Expansion from Left Folder ── */}
                <div className="w-full flex flex-col justify-center">
                  {isDetailOpen && (
                  <div
                    className={`w-full h-[450px] bg-white/[0.04] backdrop-blur-2xl rounded-3xl border border-white/15 shadow-2xl p-6 md:p-7 flex flex-col justify-between relative overflow-hidden origin-left ${
                      isDossierClosing ? 'dossier-close pointer-events-none' : 'dossier-open'
                    }`}
                  >
                    {/* Top Red Rim Line */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#c93b2b] to-transparent" />

                    {/* Header + Close Button */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-white/10 shrink-0">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-[#c93b2b]/20 rounded-xl border border-[#c93b2b]/40 text-[#c93b2b]">
                          <FileCode size={18} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono tracking-widest uppercase text-[#c93b2b] font-bold block">
                            EXTRACTED SYSTEM DOSSIER
                          </span>
                          <h4 className="text-lg md:text-xl font-bold en text-[#fffcfc]">
                            {activeProject.title}
                          </h4>
                        </div>
                      </div>
                      <button
                        onClick={closeDossier}
                        className="px-3 py-1.5 bg-white/[0.08] hover:bg-[#c93b2b] border border-white/15 hover:border-[#c93b2b] rounded-xl text-xs font-mono text-white transition-all cursor-pointer inline-flex items-center gap-1.5 group shadow-md shrink-0"
                        title="Close dossier back into file"
                      >
                        <span>Close</span>
                        <X size={14} className="group-hover:rotate-90 transition-transform" />
                      </button>
                    </div>

                    {/* Full Project Description */}
                    <p className="text-xs md:text-sm text-[#ccc] leading-relaxed font-light">
                      {activeProject.fullDesc}
                    </p>

                    {/* Architecture Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {activeProject.metrics.map((m) => (
                        <div key={m.label} className="p-2.5 bg-black/50 rounded-xl border border-white/10 text-center">
                          <span className="text-[9px] font-mono uppercase tracking-wider text-[#888] block mb-1">
                            {m.label}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-white block truncate">
                            {m.val}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* System Modules List */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#888] block mb-1.5">
                        SYSTEM ARCHITECTURE &amp; MODULES:
                      </span>
                      <div className="grid sm:grid-cols-2 gap-2 font-mono text-xs">
                        {activeProject.modules.map((mod) => (
                          <div key={mod.name} className="p-2.5 bg-white/[0.03] rounded-xl border border-white/10 flex items-center justify-between">
                            <div className="min-w-0 pr-2">
                              <span className="text-[#eee] font-medium block text-[11px] truncate">
                                {mod.name}
                              </span>
                              <span className="text-[10px] text-[#777]">{mod.tech}</span>
                            </div>
                            <span className="text-[9px] text-[#48cae4] px-1.5 py-0.5 bg-[#48cae4]/10 rounded border border-[#48cae4]/20 shrink-0">
                              {mod.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                  )}
                </div>

              </div>
            </div>
          </section>

          {/* ── SECTION 2: SKILLS ── */}
          <SkillsSection />

          {/* ── SECTION 3: CONTACT ── */}
          <ContactSection onSwitchAct={onSwitchAct} />
        </div>
      )}
    </div>
  )
}

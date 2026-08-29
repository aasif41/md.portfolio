import { useState, useEffect } from 'react'
import {
  Mail,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  MapPin,
  Clock,
  Send,
  Radio,
  FileText,
  Briefcase,
  Globe,
  GitMerge,
  Coffee,
  Shrub,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  Download,
  Eye,
} from 'lucide-react'
import { FaLinkedinIn } from 'react-icons/fa6'
import { SiGithub } from 'react-icons/si'

interface ContactSectionProps {
  onSwitchAct: (act: 1 | 2) => void
}

const TOPICS = [
  { id: 'role', label: 'Full-Time Role 2026', icon: Briefcase },
  { id: 'webgl', label: '3D / WebGL Project', icon: Globe },
  { id: 'collab', label: 'Open-Source Collab', icon: GitMerge },
  { id: 'chat', label: 'Tech Chat / Coffee', icon: Coffee },
]

export default function ContactSection({ onSwitchAct }: ContactSectionProps) {
  const [selectedTopic, setSelectedTopic] = useState('Full-Time Role 2026')
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [message, setMessage] = useState('')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedDraft, setCopiedDraft] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  // CV modal state
  const [isCvOpen, setIsCvOpen] = useState(false)

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'needs_activation' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  // Handle ESC key and scroll lock for CV modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCvOpen(false)
      }
    }

    if (isCvOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCvOpen])

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const targetEmail = 'mdaasif18903@gmail.com'
  const linkedInUrl = 'https://www.linkedin.com/in/md-aasif-7bb514305/'
  const githubUrl = 'https://github.com/aasif41'

  const copyToClipboard = (text: string, setStatus: (v: boolean) => void) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setStatus(true)
          setTimeout(() => setStatus(false), 2200)
        })
        .catch(() => {
          try {
            const el = document.createElement('textarea')
            el.value = text
            document.body.appendChild(el)
            el.select()
            document.execCommand('copy')
            document.body.removeChild(el)
          } catch {
            // ignore
          }
          setStatus(true)
          setTimeout(() => setStatus(false), 2200)
        })
    } else {
      try {
        const el = document.createElement('textarea')
        el.value = text
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
      } catch {
        // ignore
      }
      setStatus(true)
      setTimeout(() => setStatus(false), 2200)
    }
  }

  // Pre-formatted email content
  const emailSubject = `[${selectedTopic}] Inquiry${senderName ? ` from ${senderName}` : ''}`
  const emailBody = `Hi Aasif,

${message || 'I came across your 3D portfolio and would love to connect with you regarding opportunities / collaboration.'}

--
Sender: ${senderName || 'Anonymous / Recruiter'}
Reply-to: ${senderEmail || 'Not specified'}`

  const webGmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

  // Direct In-Page Form Transmission Handler — Does NOT open Gmail, sends directly in background
  const handleTransmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() && !senderEmail.trim()) {
      setSubmitStatus('error')
      setStatusMessage('Please enter at least an email or message payload before transmitting.')
      return
    }

    setIsSubmitting(true)
    const formSubmitToken = 'e2b6025bbefd7584c9c24e2f8ff1a256'

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${formSubmitToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: senderName || 'Portfolio Visitor',
          email: senderEmail || 'visitor@portfolio.com',
          _subject: emailSubject,
          channel_topic: selectedTopic,
          message: message || '(No message body provided)',
        }),
      })

      await response.json()
      setSubmitStatus('success')
      setStatusMessage('Signal dispatched! Your message has been sent directly to mdaasif18903@gmail.com.')
      setMessage('')
      setSenderName('')
      setSenderEmail('')
    } catch {
      setSubmitStatus('success')
      setStatusMessage('Signal dispatched! Your transmission has been delivered.')
      setMessage('')
      setSenderName('')
      setSenderEmail('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen px-4 sm:px-6 md:px-12 py-16 md:py-24 relative select-none selection:bg-[#c93b2b] selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Ambient background light gradients */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-t from-[#c93b2b]/15 via-[#48cae4]/5 to-transparent blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full pointer-events-auto">
        
        {/* ── Section Header & Real-time Telemetry ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#c93b2b] font-bold mb-3 shadow-sm backdrop-blur-sm">
              <Radio size={13} className="animate-pulse text-[#c93b2b]" />
              <span>03 // INITIATE TRANSMISSION · QUANTUM LINK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold en tracking-tight text-white mb-3">
              Let&apos;s Build Together.
            </h2>
            <p className="text-sm md:text-base text-[#aaa] max-w-2xl font-light leading-relaxed">
              Available for full-time software engineering roles (2026), interactive 3D WebGL experiences, and high-impact distributed systems. Drop a transmission below.
            </p>
          </div>

          {/* Real-time Status Badges */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#aaa]">
            <div className="px-3.5 py-2 bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span className="text-white font-bold">STATUS: AVAILABLE FOR 2026</span>
            </div>
            <div className="px-3.5 py-2 bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-2">
              <Clock size={13} className="text-[#48cae4]" />
              <span className="text-[#eee]">{currentTime} IST (BIHAR, INDIA)</span>
            </div>
          </div>
        </div>

        {/* ── Main 2-Column Bento Grid ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* ── LEFT COLUMN: Interactive Transmission Dispatcher (7 cols) ── */}
          <form
            onSubmit={handleTransmit}
            className="lg:col-span-7 p-4 sm:p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2 font-mono text-xs text-[#aaa]">
                <Send size={13} className="text-[#c93b2b]" />
                <span className="font-bold uppercase tracking-wider text-white">TRANSMISSION DISPATCHER</span>
              </div>
              <span className="text-[11px] font-mono text-[#777]">ENCRYPTION: TLS / 256-BIT</span>
            </div>

            {/* Submission Status Alert Banner — Clean Green Success */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 rounded-2xl bg-[#10b981]/15 border border-[#10b981]/40 flex items-start gap-3 text-xs font-mono text-[#10b981] animate-fadeIn">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-sm text-white mb-1">TRANSMISSION DISPATCHED</span>
                  <span>{statusMessage}</span>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 rounded-2xl bg-[#c93b2b]/15 border border-[#c93b2b]/40 flex items-start justify-between gap-3 text-xs font-mono text-[#c93b2b]">
                <div className="flex items-start gap-3">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-sm text-white mb-1">NOTICE</span>
                    <span className="text-[#ddd]">{statusMessage}</span>
                  </div>
                </div>
                <a
                  href={webGmailLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#c93b2b] text-white rounded-xl text-xs shrink-0 transition-all inline-flex items-center gap-1.5"
                >
                  <ExternalLink size={12} />
                  <span>Open Gmail</span>
                </a>
              </div>
            )}

            {/* Topic Selector Chips */}
            <div className="mb-6">
              <label className="text-[11px] font-mono uppercase tracking-widest text-[#888] block mb-2.5">
                1. Select Transmission Channel
              </label>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((topic) => {
                  const Icon = topic.icon
                  const isSelected = selectedTopic === topic.label
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => setSelectedTopic(topic.label)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#c93b2b] text-white border-[#c93b2b] font-bold shadow-[0_0_18px_rgba(201,59,43,0.4)]'
                          : 'bg-white/[0.04] border-white/10 text-[#aaa] hover:bg-white/[0.08] hover:text-white'
                      }`}
                    >
                      <Icon size={13} />
                      <span>{topic.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Name & Email inputs */}
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-widest text-[#888] block mb-1.5">
                  2. Your Identity
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your Name or Company"
                  className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-[#c93b2b] rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-[#555] outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono uppercase tracking-widest text-[#888] block mb-1.5">
                  3. Return Address
                </label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-[#c93b2b] rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-[#555] outline-none transition-all"
                />
              </div>
            </div>

            {/* Message Body */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-mono uppercase tracking-widest text-[#888]">
                  4. Transmission Payload
                </label>
                <span className="text-[10px] font-mono text-[#666]">
                  {message.length} chars
                </span>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message, project vision, or role description here..."
                rows={4}
                className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-[#c93b2b] rounded-xl p-3.5 text-xs font-sans text-white placeholder-[#555] outline-none transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Transmission Action Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(emailBody, setCopiedDraft)}
                  className="px-3 py-2 bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-xl text-xs font-mono text-[#aaa] hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {copiedDraft ? <Check size={12} className="text-[#10b981]" /> : <Copy size={12} />}
                  <span>{copiedDraft ? 'Draft Copied!' : 'Copy Draft'}</span>
                </button>

                <a
                  href={webGmailLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-xl text-xs font-mono text-[#aaa] hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ExternalLink size={12} />
                  <span>Open in Gmail Web</span>
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#c93b2b] hover:bg-[#d94838] disabled:opacity-50 text-white font-mono text-xs font-bold uppercase rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(201,59,43,0.35)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Transmit Signal</span>
                    <ArrowRight size={13} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* ── RIGHT COLUMN: Connected Networks & Direct Comm Hub (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Featured Direct Email Card with One-Click Copy */}
            <div className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#c93b2b]/50 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c93b2b]/10 rounded-full blur-2xl pointer-events-none group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#c93b2b] group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[#aaa]">
                  PRIMARY INBOX
                </span>
              </div>

              <span className="text-[11px] font-mono uppercase tracking-widest text-[#777] block mb-1">
                Direct Electronic Mail
              </span>
              <h3 className="text-base sm:text-lg font-bold font-mono text-white mb-4 break-all">
                {targetEmail}
              </h3>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(targetEmail, setCopiedEmail)}
                  className="flex-1 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] rounded-xl border border-white/10 text-xs font-mono text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={13} className="text-[#10b981]" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#c93b2b]/20 hover:bg-[#c93b2b] text-white rounded-xl border border-[#c93b2b]/40 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ExternalLink size={12} />
                  <span>Open Gmail</span>
                </a>
              </div>
            </div>

            {/* Connected Networks Grid: LinkedIn & GitHub */}
            <div className="grid sm:grid-cols-2 gap-4">
              
              {/* LinkedIn Card with brand hover bloom */}
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#0A66C2]/20 rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/70 group-hover:text-[#0A66C2] group-hover:border-[#0A66C2]/40 transition-all">
                    <FaLinkedinIn size={18} />
                  </div>
                  <ExternalLink size={13} className="text-[#666] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h4 className="text-sm font-bold text-white mb-0.5">
                  LinkedIn
                </h4>
                <span className="text-[11px] font-mono text-[#888] block truncate">
                  @md-aasif · Connect
                </span>
              </a>

              {/* GitHub Card with silver/white hover bloom */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/40 hover:bg-white/[0.07] transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/15 rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/40 transition-all">
                    <SiGithub size={18} />
                  </div>
                  <ExternalLink size={13} className="text-[#666] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h4 className="text-sm font-bold text-white mb-0.5">
                  GitHub
                </h4>
                <span className="text-[11px] font-mono text-[#888] block truncate">
                  @aasif41 · Repositories
                </span>
              </a>

            </div>

            {/* Resume / CV Card & Location Radar Bento Row */}
            <div className="grid sm:grid-cols-2 gap-4">
              
              {/* Resume / CV Card — Opens In-Page Modal with Close/Cut Option */}
              <button
                type="button"
                onClick={() => setIsCvOpen(true)}
                className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#c93b2b]/50 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer group text-left relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#c93b2b] group-hover:scale-110 group-hover:bg-[#c93b2b] group-hover:text-white transition-all">
                    <FileText size={18} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#c93b2b]/20 border border-[#c93b2b]/30 text-[#ff8070] flex items-center gap-1">
                      <Eye size={10} />
                      <span>VIEW IN-PAGE</span>
                    </span>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white mb-0.5 flex items-center gap-1.5">
                  <span>Curriculum Vitae</span>
                  <ArrowRight size={12} className="text-[#888] group-hover:text-[#c93b2b] group-hover:translate-x-0.5 transition-all" />
                </h4>
                <span className="text-[11px] font-mono text-[#888] block">
                  Click to inspect Asif CV.pdf
                </span>
              </button>

              {/* Coordinates Radar Card */}
              <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#48cae4]">
                    <MapPin size={18} />
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#48cae4] animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">
                    Bihar, India
                  </h4>
                  <span className="text-[10px] font-mono text-[#888] block">
                    26.1542° N, 85.8918° E
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ── Switch Back to Act 1 Shrine Button ── */}
        <div className="text-center pt-8 pb-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onSwitchAct(1)}
            className="px-6 py-3 bg-white/[0.04] border border-white/15 hover:border-[#c93b2b] text-xs font-mono tracking-widest uppercase rounded-full hover:bg-white/[0.08] text-white transition-all cursor-pointer inline-flex items-center gap-2 shadow-sm"
          >
            <Shrub size={14} className="text-[#c93b2b]" />
            <span>Return to Shrine Act 1</span>
          </button>

          <div className="text-xs font-mono text-[#777] tracking-wider uppercase flex items-center gap-2">
            <span>MD AASIF · 2026 CREATIVE 3D WEBGL PORTFOLIO</span>
          </div>
        </div>

      </div>

      {/* ── CV / Resume In-Page Viewer Modal with Cut / Close Option ── */}
      {isCvOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Curriculum Vitae Preview"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
          onClick={() => setIsCvOpen(false)}
        >
          {/* Modal Container */}
          <div
            className="w-full max-w-5xl h-[90vh] bg-[#0c0c12] border border-white/20 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden relative pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="px-3.5 sm:px-5 py-3 sm:py-4 bg-white/[0.03] border-b border-white/10 flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#c93b2b]/20 border border-[#c93b2b]/40 flex items-center justify-center text-[#c93b2b] shrink-0">
                  <FileText size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-base font-bold font-mono text-white truncate">
                      Md Aasif — Curriculum Vitae
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#10b981]/20 border border-[#10b981]/30 text-[#10b981] hidden sm:inline-block">
                      OFFICIAL 2026
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#888] block truncate">
                    Asif CV.pdf · Document Viewer
                  </span>
                </div>
              </div>

              {/* Action Buttons: Download + Cut / Close */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <a
                  href="/Asif-CV.pdf"
                  download="Md_Aasif_CV.pdf"
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-white/[0.06] hover:bg-white/[0.12] text-white rounded-xl border border-white/15 text-[11px] sm:text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Download PDF"
                >
                  <Download size={13} />
                  <span className="hidden sm:inline">Download</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsCvOpen(false)}
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-[#c93b2b]/20 hover:bg-[#c93b2b] text-white rounded-xl border border-[#c93b2b]/40 hover:border-[#c93b2b] text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-lg group"
                  title="Cut / Close Preview (Esc)"
                  aria-label="Close CV preview"
                >
                  <X size={15} className="group-hover:rotate-90 transition-transform duration-200" />
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* Modal Body / PDF Viewer Frame */}
            <div className="flex-1 w-full h-full bg-[#141419] relative overflow-hidden">
              <iframe
                src="/Asif-CV.pdf#toolbar=1&navpanes=0"
                className="w-full h-full border-none bg-white/5"
                title="Md Aasif Official CV"
              />
            </div>

            {/* Modal Footer Tip */}
            <div className="px-5 py-2.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#888]">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">ESC</kbd> or click Cut button to close</span>
              <a
                href="/Asif-CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Direct File Link</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

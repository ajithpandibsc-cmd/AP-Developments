import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap, Shield, Layers, Star, ChevronRight, Sparkles } from 'lucide-react'
import Logo from '../components/Logo'
import ServiceCard from '../components/ServiceCard'
import ReviewCard from '../components/ReviewCard'
import Button from '../components/Button'

/* ── Hero 3D Core ─────────────────────────────────── */
function APCore() {
  const coreRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth  - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const LABELS = ['WEB', 'CONTENT', 'VIDEO', 'DESIGN', 'AI']
  const COLORS  = ['#7C3AED', '#06B6D4', '#F97316', '#A3E635', '#EC4899']

  return (
    <div
      ref={coreRef}
      className="relative w-72 h-72 md:w-96 md:h-96 float-anim select-none"
      style={{
        transform: `perspective(900px) rotateX(${mouse.y * -0.5}deg) rotateY(${mouse.x * 0.5}deg)`,
        transition: 'transform 0.08s linear',
      }}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '30s' }}
        viewBox="0 0 384 384" fill="none">
        <circle cx="192" cy="192" r="170" stroke="url(#ring-grad)" strokeWidth="1" strokeDasharray="6 10" />
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="384" y2="384" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Inner glow */}
      <div className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />

      {/* Center logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl flex items-center justify-center border border-[rgba(124,58,237,0.3)]"
          style={{ background: 'rgba(124,58,237,0.1)', backdropFilter: 'blur(20px)' }}>
          <Logo size={72} />
        </div>
      </div>

      {/* Orbiting service labels */}
      {LABELS.map((label, i) => {
        const angle = (i / LABELS.length) * 2 * Math.PI - Math.PI / 2
        const r     = 150
        const x     = 50 + (r / 3.84) * Math.cos(angle)
        const y     = 50 + (r / 3.84) * Math.sin(angle)
        return (
          <div
            key={label}
            className="absolute text-xs font-display font-bold px-2.5 py-1 rounded-lg"
            style={{
              left: `${x}%`, top: `${y}%`,
              transform: 'translate(-50%,-50%)',
              color: COLORS[i],
              background: `${COLORS[i]}15`,
              border: `1px solid ${COLORS[i]}30`,
            }}
          >
            {label}
          </div>
        )
      })}

      {/* Decorative orbs */}
      <div className="absolute -inset-8 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08), transparent 60%)' }} />
    </div>
  )
}

/* ── Animated ticker ──────────────────────────────── */
function Ticker() {
  const items = ['Web Development', 'Content Creation', 'Video Editing', 'Graphic Design', 'AI Planning', 'Brand Identity']
  return (
    <div className="overflow-hidden py-4 border-y border-[var(--border)]" aria-hidden="true">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-sm font-medium text-[var(--muted)] flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ── Services data ────────────────────────────────── */
const SERVICES = [
  {
    icon: '🌐', title: 'Web Development', color: '#7C3AED', id: 'web',
    description: 'Modern, responsive and scalable websites built around your business goals — from landing pages and portfolios to complete web applications.',
    features: ['Business & Portfolio Sites','E-Commerce','React Applications','Full-Stack Apps','API Integration','Performance Optimization'],
    cta: 'Build My Website', ctaLink: '/project-planner',
  },
  {
    icon: '✍️', title: 'Content Creation', color: '#06B6D4', id: 'content',
    description: 'Content that communicates your idea clearly and gives your brand a consistent digital voice across every platform.',
    features: ['Social Media Content','Website Copy','Marketing Content','Product Descriptions','Brand Storytelling','Content Strategy'],
    cta: 'Plan My Content', ctaLink: '/project-planner',
  },
  {
    icon: '🎬', title: 'Video Editing', color: '#F97316', id: 'video',
    description: 'Transform raw footage into engaging videos designed for social media, brands, creators and businesses.',
    features: ['Reels & Shorts','YouTube Videos','Promotional Videos','Motion Graphics','Color Grading','Subtitles & Transitions'],
    cta: 'Edit My Video', ctaLink: '/project-planner',
  },
  {
    icon: '🎨', title: 'Graphic Designing', color: '#A3E635', id: 'design',
    description: 'Visual identities and digital designs that make your brand recognizable and professional everywhere.',
    features: ['Logo & Brand Identity','Social Media Creatives','Posters & Banners','Thumbnails','Business Cards','UI Graphics'],
    cta: 'Design My Brand', ctaLink: '/project-planner',
  },
]

/* ── Why AP ───────────────────────────────────────── */
const WHY = [
  { icon: <Zap size={22} />, title: 'All-in-One Studio', desc: 'Web, content, video and design — no need to juggle multiple freelancers.' },
  { icon: <Sparkles size={22} />, title: 'AI-Assisted Planning', desc: 'Get an instant project estimate before committing to a single rupee.' },
  { icon: <Layers size={22} />, title: 'End-to-End Delivery', desc: 'From idea to live product, we handle every phase of your project.' },
  { icon: <Shield size={22} />, title: 'Transparent Pricing', desc: 'No hidden costs. Clear packages, clear timelines, clear deliverables.' },
]

/* ── How We Work ─────────────────────────────────── */
const STEPS = [
  { n: '01', title: 'Describe Your Idea',     desc: 'Tell us what you want to build — service type, description, and budget.' },
  { n: '02', title: 'AI Project Analysis',    desc: 'Our AI analyzes your brief and gives a detailed scope & timeline estimate.' },
  { n: '03', title: 'Review & Book',          desc: 'Review the proposal, choose a package, and confirm the booking.' },
  { n: '04', title: 'Pay Securely Online',    desc: 'Pay via UPI, card, or net banking. Payments are verified server-side.' },
  { n: '05', title: 'We Build & Deliver',     desc: 'Track your project live from your dashboard. We deliver on time.' },
]

/* ── Sample Reviews ───────────────────────────────── */
const REVIEWS = [
  { name: 'Rahul M.', rating: 5, comment: 'AP Developments built our e-commerce site with incredible attention to detail. The booking process was seamless.', projectType: 'E-Commerce Website', verified: true },
  { name: 'Priya K.', rating: 5, comment: 'The AI planner was a game-changer — I got an accurate estimate in minutes. Very professional team.', projectType: 'Brand Identity', verified: true },
  { name: 'Arjun S.', rating: 5, comment: 'Video editing quality exceeded my expectations. Turnaround was fast and communication was excellent.', projectType: 'Reel & Short-form Video', verified: false },
]

/* ── Main Component ───────────────────────────────── */
export default function Home() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60])

  return (
    <main>
      {/* ── Hero ───────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
        {/* BG orbs */}
        <div className="orb w-[600px] h-[600px] bg-[var(--primary)] -left-64 -top-64" />
        <div className="orb w-[500px] h-[500px] bg-[var(--secondary)] -right-48 bottom-0 opacity-10" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ y: heroY }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold border border-[var(--border)]"
                style={{ background: 'rgba(124,58,237,0.1)', color: 'var(--primary)' }}>
                <Sparkles size={13} />
                Digital Studio — Web • Content • Video • Design
              </div>

              {/* Headline */}
              <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.08] mb-6">
                <span className="block">Build.</span>
                <span className="block gradient-text">Create.</span>
                <span className="block">Edit. Design.</span>
              </h1>

              <p className="text-[var(--muted)] text-lg leading-relaxed mb-10 max-w-lg">
                Turn your idea into a powerful digital experience. AP Developments combines development, content, video, and design under one creative studio.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link to="/project-planner" id="hero-start-project">
                  <Button size="lg">
                    Start a Project <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/projects" id="hero-explore-work">
                  <Button variant="secondary" size="lg">
                    Explore Our Work
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-[var(--border)]">
                {[['50+','Projects Done'],['4','Services'],['100%','Client Satisfaction']].map(([n,l]) => (
                  <div key={l}>
                    <div className="font-display font-bold text-2xl gradient-text">{n}</div>
                    <div className="text-xs text-[var(--muted)] mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="flex justify-center items-center"
            >
              <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl shadow-primary/20 float-anim">
                <img src="/src/assets/hero_bg.jpg" alt="AP Developments Studio" className="w-full h-auto object-cover max-w-md xl:max-w-lg rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Ticker ─────────────────────────────── */}
      <Ticker />

      {/* ── Services ──────────────────────────── */}
      <section className="section" id="services">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-[var(--border)]"
              style={{ color: 'var(--secondary)', background: 'rgba(6,182,212,0.1)' }}>
              What We Offer
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Services Built for Results</h2>
            <p className="text-[var(--muted)] max-w-xl mx-auto">Four focused services. One cohesive studio experience.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {SERVICES.map((s) => <ServiceCard key={s.id} {...s} />)}
          </div>

          <div className="text-center mt-10">
            <Link to="/services">
              <Button variant="secondary" size="md">
                View All Services <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why AP ────────────────────────────── */}
      <section className="section" id="why-ap">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-[var(--border)]"
                style={{ color: 'var(--accent)', background: 'rgba(249,115,22,0.1)' }}>
                Why Choose AP
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Your idea.<br />
                <span className="gradient-text">Our digital craft.</span>
              </h2>
              <p className="text-[var(--muted)] leading-relaxed mb-8">
                We don't just execute tasks — we understand your goal and engineer a result. Every project at AP Developments is handled with creative precision and technical depth.
              </p>
              <Link to="/about">
                <Button variant="ghost">Learn Our Story <ArrowRight size={16} /></Button>
              </Link>
            </motion.div>

            {/* Right: feature grid */}
            <div className="grid grid-cols-2 gap-4">
              {WHY.map((w, i) => (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-5 border border-[var(--border)] hover:border-[var(--primary)]/40 transition-colors"
                  style={{ background: 'var(--card-bg)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-[var(--primary)]"
                    style={{ background: 'rgba(124,58,237,0.12)' }}>
                    {w.icon}
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-2">{w.title}</h3>
                  <p className="text-[var(--muted)] text-xs leading-relaxed">{w.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ──────────────────── */}
      <section className="section" id="projects-preview">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
          >
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-[var(--border)]"
                style={{ color: 'var(--highlight)', background: 'rgba(163,230,53,0.08)' }}>
                Portfolio
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Featured Work</h2>
            </div>
            <Link to="/projects">
              <Button variant="secondary" size="sm">View All Projects <ChevronRight size={15} /></Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title:'E-Commerce Platform', category:'Web', description:'Full-stack shop with Razorpay checkout, admin panel, and inventory management.', tech:['React','Node.js','MongoDB','Razorpay'], result:'3× increase in online orders', color:'#7C3AED' },
              { title:'Brand Identity Package', category:'Design', description:'Complete visual identity for a wellness startup — logo, palette, typography, and social templates.', tech:['Illustrator','Figma'], result:'Consistent across 8 platforms', color:'#A3E635' },
              { title:'YouTube Channel Reel', category:'Video', description:'Short-form reel series for a tech creator with custom motion graphics and color grading.', tech:['Premiere Pro','After Effects'], result:'2M+ total views', color:'#F97316' },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--primary)]/40 transition-colors"
                style={{ background: 'var(--card-bg)' }}
              >
                <div className="h-48 relative overflow-hidden"
                  style={{ background: `radial-gradient(circle at 30% 50%, ${p.color}20, transparent 70%)` }}>
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-5 font-display font-bold">
                    {p.title.charAt(0)}
                  </div>
                  <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: `${p.color}22`, color: p.color, border: `1px solid ${p.color}40` }}>
                    {p.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="font-display font-bold">{p.title}</h3>
                  <p className="text-[var(--muted)] text-sm">{p.description}</p>
                  <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl"
                    style={{ background: `${p.color}10`, color: p.color, border: `1px solid ${p.color}20` }}>
                    {p.result}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {p.tech.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-lg border border-[var(--border)] text-[var(--muted)]">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Work ───────────────────────── */}
      <section className="section" id="how-we-work">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-[var(--border)]"
              style={{ color: 'var(--primary)', background: 'rgba(124,58,237,0.1)' }}>
              Our Process
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">How We Work</h2>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5"
              style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }} />

            <div className="grid lg:grid-cols-5 gap-8">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-lg relative z-10 border border-[var(--border)]"
                      style={{ background: 'var(--bg)', color: 'var(--primary)' }}>
                      {s.n}
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-2">{s.title}</h3>
                  <p className="text-[var(--muted)] text-xs leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Planner CTA ─────────────────────── */}
      <section className="section" id="ai-planner-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))', border: '1px solid rgba(124,58,237,0.25)' }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="orb w-64 h-64 bg-[var(--primary)] left-1/4 top-0 opacity-10" />
              <div className="orb w-48 h-48 bg-[var(--secondary)] right-1/4 bottom-0 opacity-10" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold border border-[rgba(124,58,237,0.4)]"
                style={{ color: 'var(--primary)', background: 'rgba(124,58,237,0.1)' }}>
                <Sparkles size={13} />
                AP AI Project Planner
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Know your project<br />
                <span className="gradient-text">scope in minutes.</span>
              </h2>
              <p className="text-[var(--muted)] max-w-lg mx-auto mb-8">
                Describe your idea. Our AI analyzes it and gives you a realistic scope, timeline, and budget estimate — before you commit.
              </p>
              <Link to="/project-planner" id="home-ai-planner-cta">
                <Button size="xl">
                  Try AI Project Planner <ArrowRight size={18} />
                </Button>
              </Link>
              <p className="mt-4 text-xs text-[var(--muted)]">
                AI-generated estimate. Final pricing confirmed after project review.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Reviews ───────────────────────────── */}
      <section className="section" id="reviews-preview">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
          >
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-[var(--border)]"
                style={{ color: 'var(--accent)', background: 'rgba(249,115,22,0.1)' }}>
                Client Feedback
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">What Clients Say</h2>
              <p className="text-xs text-[var(--muted)] mt-2">⚠ Sample reviews for demonstration. Real reviews collected after project completion.</p>
            </div>
            <Link to="/reviews">
              <Button variant="secondary" size="sm">All Reviews <ChevronRight size={15} /></Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => <ReviewCard key={r.name} review={r} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────── */}
      <section className="section pb-24" id="final-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Ready to build<br />
              <span className="gradient-text">something great?</span>
            </h2>
            <p className="text-[var(--muted)] text-lg mb-10">
              Let's turn your idea into a polished digital experience. Start with a free AI estimate — no commitment required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/project-planner" id="final-cta-planner">
                <Button size="xl">Start a Project <ArrowRight size={18} /></Button>
              </Link>
              <Link to="/contact" id="final-cta-contact">
                <Button variant="secondary" size="xl">Get in Touch</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

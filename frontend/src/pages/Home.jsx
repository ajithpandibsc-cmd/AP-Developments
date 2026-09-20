import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, ChevronRight, Sparkles, Zap, Shield, Layers } from 'lucide-react'
import ServiceCard from '../components/ServiceCard'
import ReviewCard from '../components/ReviewCard'
import Button from '../components/Button'
import heroVisual from '../assets/hero_visual.jpg'

/* ─────────────────────────────────────────────────────────
   HERO VISUAL — generated image with float animation
───────────────────────────────────────────────────────── */
function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.18, ease: 'easeOut' }}
      style={{ width: '100%', position: 'relative' }}
    >
      {/* Warm glow behind the image */}
      <div style={{
        position: 'absolute',
        inset: '-15% -10%',
        background: 'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(255,100,0,0.20) 0%, rgba(255,170,0,0.06) 50%, transparent 75%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <motion.img
        src={heroVisual}
        alt="AP Developments – laptop with code editor, floating tech icons: React, HTML5, CSS3, JavaScript, Node.js"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '100%',
          maxWidth: '620px',
          height: 'auto',
          display: 'block',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          filter: 'drop-shadow(0 28px 64px rgba(255,90,0,0.30)) drop-shadow(0 8px 24px rgba(0,0,0,0.75))',
        }}
      />
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────
   SCROLLING TICKER
───────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────
   SERVICES DATA
───────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: '🌐', title: 'Web Development', color: '#FF5E00', id: 'web',
    description: 'Modern, responsive and scalable websites built around your business goals — from landing pages and portfolios to complete web applications.',
    features: ['Business & Portfolio Sites','E-Commerce','React Applications','Full-Stack Apps','API Integration','Performance Optimization'],
    cta: 'Build My Website', ctaLink: '/project-planner',
  },
  {
    icon: '✍️', title: 'Content Creation', color: '#FFB800', id: 'content',
    description: 'Content that communicates your idea clearly and gives your brand a consistent digital voice across every platform.',
    features: ['Social Media Content','Website Copy','Marketing Content','Product Descriptions','Brand Storytelling','Content Strategy'],
    cta: 'Plan My Content', ctaLink: '/project-planner',
  },
  {
    icon: '🎬', title: 'Video Editing', color: '#F43F5E', id: 'video',
    description: 'Transform raw footage into engaging videos designed for social media, brands, creators and businesses.',
    features: ['Reels & Shorts','YouTube Videos','Promotional Videos','Motion Graphics','Color Grading','Subtitles & Transitions'],
    cta: 'Edit My Video', ctaLink: '/project-planner',
  },
  {
    icon: '🎨', title: 'Graphic Designing', color: '#10B981', id: 'design',
    description: 'Visual identities and digital designs that make your brand recognizable and professional everywhere.',
    features: ['Logo & Brand Identity','Social Media Creatives','Posters & Banners','Thumbnails','Business Cards','UI Graphics'],
    cta: 'Design My Brand', ctaLink: '/project-planner',
  },
]

/* ─────────────────────────────────────────────────────────
   WHY AP
───────────────────────────────────────────────────────── */
const WHY = [
  { icon: <Zap size={22} />,      title: 'All-in-One Studio',    desc: 'Web, content, video and design — no need to juggle multiple freelancers.' },
  { icon: <Sparkles size={22} />, title: 'AI-Assisted Planning',  desc: 'Get an instant project estimate before committing to a single rupee.' },
  { icon: <Layers size={22} />,   title: 'End-to-End Delivery',   desc: 'From idea to live product, we handle every phase of your project.' },
  { icon: <Shield size={22} />,   title: 'Transparent Pricing',   desc: 'No hidden costs. Clear packages, clear timelines, clear deliverables.' },
]

/* ─────────────────────────────────────────────────────────
   HOW WE WORK
───────────────────────────────────────────────────────── */
const STEPS = [
  { n: '01', title: 'Describe Your Idea',   desc: 'Tell us what you want to build — service type, description, and budget.' },
  { n: '02', title: 'AI Project Analysis',  desc: 'Our AI analyzes your brief and gives a detailed scope & timeline estimate.' },
  { n: '03', title: 'Review & Book',        desc: 'Review the proposal, choose a package, and confirm the booking.' },
  { n: '04', title: 'Pay Securely Online',  desc: 'Pay via UPI, card, or net banking. Payments are verified server-side.' },
  { n: '05', title: 'We Build & Deliver',   desc: 'Track your project live from your dashboard. We deliver on time.' },
]

/* ─────────────────────────────────────────────────────────
   SAMPLE REVIEWS
───────────────────────────────────────────────────────── */
const REVIEWS = [
  { name: 'Rahul M.',  rating: 5, comment: 'AP Developments built our e-commerce site with incredible attention to detail. The booking process was seamless.', projectType: 'E-Commerce Website',    verified: true  },
  { name: 'Priya K.',  rating: 5, comment: 'The AI planner was a game-changer — I got an accurate estimate in minutes. Very professional team.',               projectType: 'Brand Identity',        verified: true  },
  { name: 'Arjun S.',  rating: 5, comment: 'Video editing quality exceeded my expectations. Turnaround was fast and communication was excellent.',              projectType: 'Reel & Short-form Video',verified: false },
]

/* ─────────────────────────────────────────────────────────
   FEATURE BLOCKS (bottom of hero)
───────────────────────────────────────────────────────── */
const FEATURE_BLOCKS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    label: 'Clean Code',
    desc: 'Well-structured &\nmaintainable code',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    label: 'Responsive Design',
    desc: 'Looks great on\nall devices',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    label: 'Fast Performance',
    desc: 'Optimized for\nspeed & SEO',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: 'Ongoing Support',
    desc: 'Always here\nfor you',
  },
]

/* ═════════════════════════════════════════════════════════
   MAIN EXPORT
═════════════════════════════════════════════════════════ */
export default function Home() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -40])

  return (
    <main>
      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          paddingTop: 80,
          paddingBottom: 48,
          background: '#090909',
        }}
      >
        {/* Right-side amber glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: [
            'radial-gradient(ellipse 55% 65% at 72% 48%, rgba(255,90,0,0.20) 0%, transparent 65%)',
            'radial-gradient(ellipse 38% 38% at 72% 48%, rgba(255,175,0,0.09) 0%, transparent 55%)',
          ].join(', '),
        }} />
        {/* Subtle left accent */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-8%',
          width: 380, height: 380, borderRadius: '50%',
          background: 'rgba(255,94,0,0.05)', filter: 'blur(90px)', pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div className="hero-grid">

            {/* ── LEFT ── */}
            <motion.div
              className="hero-left"
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ y: heroY }}
            >
              {/* Badge */}
              <motion.div
                className="hero-badge"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
              >
                <span className="hero-badge-dot" />
                Build Your Dream Website
              </motion.div>

              {/* Heading */}
              <h1 className="hero-heading">
                <span className="hero-heading-white">Web Development</span>
                <span className="hero-heading-orange">That Brings Your Ideas to Life</span>
              </h1>

              {/* Sub */}
              <p className="hero-sub">
                I create modern, responsive and high-performing websites
                that help businesses grow and make a lasting impression.
              </p>

              {/* CTAs */}
              <div className="hero-ctas">
                <Link to="/project-planner" id="hero-start-project">
                  <motion.button
                    className="btn-primary-hero"
                    whileHover={{ scale: 1.045, boxShadow: '0 0 38px rgba(255,94,0,0.58)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Start a Project <ArrowRight size={16} strokeWidth={2.5} />
                  </motion.button>
                </Link>

                <Link to="/projects" id="hero-watch-work">
                  <motion.button
                    className="btn-ghost-hero"
                    whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.10)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="btn-ghost-play">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="white">
                        <polygon points="2,1 11,6 2,11" />
                      </svg>
                    </span>
                    Watch My Work
                  </motion.button>
                </Link>
              </div>

              {/* Feature blocks */}
              <div className="hero-features">
                {FEATURE_BLOCKS.map((f, i) => (
                  <motion.div
                    key={f.label}
                    className="feature-block"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32 + i * 0.09 }}
                  >
                    <div className="feature-icon">{f.icon}</div>
                    <div className="feature-label">{f.label}</div>
                    <div className="feature-desc">{f.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── RIGHT ── */}
            <motion.div
              className="hero-right"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: 'easeOut' }}
            >
              <HeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          TICKER
      ════════════════════════════════ */}
      <Ticker />

      {/* ════════════════════════════════
          SERVICES
      ════════════════════════════════ */}
      <section className="section" id="services">
        <div className="container">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
            <div className="section-badge" style={{ color:'var(--secondary)', background:'rgba(255,184,0,0.1)' }}>What We Offer</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Services Built for Results</h2>
            <p className="text-[var(--muted)] max-w-xl mx-auto">Four focused services. One cohesive studio experience.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {SERVICES.map((s) => <ServiceCard key={s.id} {...s} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/services"><Button variant="secondary" size="md">View All Services <ChevronRight size={16} /></Button></Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          WHY AP
      ════════════════════════════════ */}
      <section className="section" id="why-ap">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
              <div className="section-badge" style={{ color:'var(--accent)', background:'rgba(244,63,94,0.1)' }}>Why Choose AP</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Your idea.<br /><span className="gradient-text">Our digital craft.</span>
              </h2>
              <p className="text-[var(--muted)] leading-relaxed mb-8">
                We don't just execute tasks — we understand your goal and engineer a result. Every project at AP Developments is handled with creative precision and technical depth.
              </p>
              <Link to="/about"><Button variant="ghost">Learn Our Story <ArrowRight size={16} /></Button></Link>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {WHY.map((w, i) => (
                <motion.div key={w.title} initial={{ opacity:0, y:25 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-5 border border-[var(--border)] hover:border-[var(--primary)]/40 transition-colors"
                  style={{ background:'var(--card-bg)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-[var(--primary)]" style={{ background:'rgba(255,94,0,0.12)' }}>{w.icon}</div>
                  <h3 className="font-display font-semibold text-sm mb-2">{w.title}</h3>
                  <p className="text-[var(--muted)] text-xs leading-relaxed">{w.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          FEATURED PROJECTS
      ════════════════════════════════ */}
      <section className="section" id="projects-preview">
        <div className="container">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <div className="section-badge" style={{ color:'var(--highlight)', background:'rgba(16,185,129,0.08)' }}>Portfolio</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Featured Work</h2>
            </div>
            <Link to="/projects"><Button variant="secondary" size="sm">View All Projects <ChevronRight size={15} /></Button></Link>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title:'E-Commerce Platform',    category:'Web',    description:'Full-stack shop with Razorpay checkout, admin panel, and inventory management.',                      tech:['React','Node.js','MongoDB','Razorpay'], result:'3× increase in online orders', color:'#FF5E00' },
              { title:'Brand Identity Package', category:'Design', description:'Complete visual identity for a wellness startup — logo, palette, typography, and social templates.', tech:['Illustrator','Figma'],                   result:'Consistent across 8 platforms',  color:'#10B981' },
              { title:'YouTube Channel Reel',   category:'Video',  description:'Short-form reel series for a tech creator with custom motion graphics and color grading.',           tech:['Premiere Pro','After Effects'],        result:'2M+ total views',               color:'#FFB800' },
            ].map((p, i) => (
              <motion.div key={p.title} initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--primary)]/40 transition-colors"
                style={{ background:'var(--card-bg)' }}>
                <div className="h-48 relative overflow-hidden" style={{ background:`radial-gradient(circle at 30% 50%, ${p.color}20, transparent 70%)` }}>
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-5 font-display font-bold">{p.title.charAt(0)}</div>
                  <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background:`${p.color}22`, color:p.color, border:`1px solid ${p.color}40` }}>{p.category}</span>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="font-display font-bold">{p.title}</h3>
                  <p className="text-[var(--muted)] text-sm">{p.description}</p>
                  <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl"
                    style={{ background:`${p.color}10`, color:p.color, border:`1px solid ${p.color}20` }}>{p.result}</div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {p.tech.map(t => <span key={t} className="text-xs px-2.5 py-1 rounded-lg border border-[var(--border)] text-[var(--muted)]">{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          HOW WE WORK
      ════════════════════════════════ */}
      <section className="section" id="how-we-work">
        <div className="container">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
            <div className="section-badge" style={{ color:'var(--primary)', background:'rgba(255,94,0,0.1)' }}>Our Process</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">How We Work</h2>
          </motion.div>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5"
              style={{ background:'linear-gradient(90deg, var(--primary), var(--secondary))' }} />
            <div className="grid lg:grid-cols-5 gap-8">
              {STEPS.map((s, i) => (
                <motion.div key={s.n} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-lg relative z-10 border border-[var(--border)]"
                      style={{ background:'var(--bg)', color:'var(--primary)' }}>{s.n}</div>
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-2">{s.title}</h3>
                  <p className="text-[var(--muted)] text-xs leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          AI PLANNER CTA
      ════════════════════════════════ */}
      <section className="section" id="ai-planner-cta">
        <div className="container">
          <motion.div initial={{ opacity:0, scale:0.97 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
            className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
            style={{ background:'linear-gradient(135deg, rgba(255,94,0,0.12), rgba(255,184,0,0.08))', border:'1px solid rgba(255,94,0,0.22)' }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="orb w-64 h-64 bg-[var(--primary)] left-1/4 top-0 opacity-10" />
              <div className="orb w-48 h-48 bg-[var(--secondary)] right-1/4 bottom-0 opacity-10" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold border border-[rgba(255,94,0,0.35)]"
                style={{ color:'var(--primary)', background:'rgba(255,94,0,0.1)' }}>
                <Sparkles size={13} /> AP AI Project Planner
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Know your project<br /><span className="gradient-text">scope in minutes.</span>
              </h2>
              <p className="text-[var(--muted)] max-w-lg mx-auto mb-8">
                Describe your idea. Our AI analyzes it and gives you a realistic scope, timeline, and budget estimate — before you commit.
              </p>
              <Link to="/project-planner" id="home-ai-planner-cta">
                <Button size="xl">Try AI Project Planner <ArrowRight size={18} /></Button>
              </Link>
              <p className="mt-4 text-xs text-[var(--muted)]">AI-generated estimate. Final pricing confirmed after project review.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════
          REVIEWS
      ════════════════════════════════ */}
      <section className="section" id="reviews-preview">
        <div className="container">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <div className="section-badge" style={{ color:'var(--accent)', background:'rgba(244,63,94,0.1)' }}>Client Feedback</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">What Clients Say</h2>
              <p className="text-xs text-[var(--muted)] mt-2">⚠ Sample reviews for demonstration. Real reviews collected after project completion.</p>
            </div>
            <Link to="/reviews"><Button variant="secondary" size="sm">All Reviews <ChevronRight size={15} /></Button></Link>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => <ReviewCard key={r.name} review={r} index={i} />)}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          FINAL CTA
      ════════════════════════════════ */}
      <section className="section pb-24" id="final-cta">
        <div className="container">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Ready to build<br /><span className="gradient-text">something great?</span>
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

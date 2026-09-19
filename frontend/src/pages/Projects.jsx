import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'

const ALL_PROJECTS = [
  { id:1, title:'E-Commerce Platform',    category:'Web',     description:'Full-stack shop with Razorpay checkout, admin panel & inventory management.', tech:['React','Node.js','MongoDB','Razorpay'], result:'3× increase in online orders' },
  { id:2, title:'Restaurant Website',     category:'Web',     description:'Responsive multi-page site with online reservations, menu, and Google Maps integration.', tech:['React','Tailwind','Node.js'], result:'40% increase in walk-ins' },
  { id:3, title:'Brand Identity Package', category:'Design',  description:'Complete visual identity for a wellness startup — logo, palette, typography, social templates.', tech:['Illustrator','Figma'], result:'8 platforms, 1 consistent look' },
  { id:4, title:'YouTube Channel Reels',  category:'Video',   description:'Short-form reel series with custom motion graphics and professional color grading.', tech:['Premiere Pro','After Effects'], result:'2M+ total views' },
  { id:5, title:'Product Launch Campaign',category:'Content', description:'Full launch content strategy with social posts, email sequence, and ad copy.', tech:['Notion','Canva'], result:'₹4L revenue in first week' },
  { id:6, title:'SaaS Landing Page',      category:'Web',     description:'High-converting product landing page with animated sections and Stripe checkout.', tech:['React','Framer Motion','Stripe'], result:'18% conversion rate' },
  { id:7, title:'Podcast Brand Kit',      category:'Design',  description:'Custom podcast cover art, social templates, episode thumbnails, and intro animation.', tech:['Figma','After Effects'], result:'Cover featured on Spotify India' },
  { id:8, title:'Product Review Video',   category:'Video',   description:'B-roll-heavy product showcase video with voiceover, subtitles, and brand transitions.', tech:['Premiere Pro','DaVinci Resolve'], result:'500K+ YouTube views' },
  { id:9, title:'Fashion Blog Content',   category:'Content', description:'30-day Instagram content calendar, caption strategy, and story scripts for a fashion influencer.', tech:['Notion','Canva'], result:'45% follower growth' },
]

const CATEGORIES = ['All', 'Web', 'Content', 'Video', 'Design']

export default function Projects() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.category === active)

  return (
    <main className="pt-24">
      {/* Header */}
      <section className="section pb-0 relative overflow-hidden">
        <div className="orb w-96 h-96 bg-[var(--secondary)] right-0 top-0 opacity-10" />
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-[var(--border)]"
              style={{ color: 'var(--secondary)', background: 'rgba(6,182,212,0.1)' }}>
              Portfolio
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Projects That<br />
              <span style={{ color: 'var(--secondary)' }}>Delivered Results</span>
            </h1>
            <p className="text-[var(--muted)] max-w-xl mx-auto">
              A curated selection of work across web, content, video, and design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="section pb-0">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center" role="tablist" aria-label="Project categories">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                role="tab"
                aria-selected={active === cat}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  active === cat
                    ? 'text-white border-[var(--primary)]'
                    : 'text-[var(--muted)] border-[var(--border)] hover:text-white hover:border-[var(--primary)]/40'
                }`}
                style={active === cat ? { background: 'rgba(124,58,237,0.2)' } : {}}
              >
                {cat}
                <span className="ml-2 text-xs opacity-60">
                  {cat === 'All' ? ALL_PROJECTS.length : ALL_PROJECTS.filter(p => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filtered.length > 0
                ? filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)
                : (
                  <div className="col-span-full text-center py-24 text-[var(--muted)]">
                    No projects in this category yet.
                  </div>
                )
              }
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}

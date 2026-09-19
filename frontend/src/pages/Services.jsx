import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import Button from '../components/Button'

const SERVICES = [
  {
    id: 'web',
    emoji: '🌐',
    title: 'Web Development',
    tagline: 'Modern, responsive and scalable websites built around your business goals.',
    color: '#7C3AED',
    description:
      'From simple landing pages to complex full-stack applications, we engineer web experiences that perform, scale, and convert. Every site is mobile-first, SEO-ready, and built with clean, maintainable code.',
    features: [
      'Business & Portfolio Websites',
      'E-Commerce Solutions',
      'React Single-Page Applications',
      'Full-Stack Web Applications',
      'REST & GraphQL API Integration',
      'Admin Panels & CMS',
      'Responsive UI / UX',
      'Performance Optimization',
    ],
    packages: [
      { name: 'Starter',      price: '₹8,000+',   desc: 'Landing page / 3-page site, contact form, mobile-ready.' },
      { name: 'Professional', price: '₹18,000+',  desc: '5–8 pages, CMS, SEO optimization, deployment.' },
      { name: 'Premium',      price: '₹35,000+',  desc: 'Full-stack app, admin panel, payment integration, API.' },
      { name: 'Custom',       price: 'Quoted',     desc: 'Enterprise / complex requirements — let us plan together.' },
    ],
    cta: 'Build My Website',
  },
  {
    id: 'content',
    emoji: '✍️',
    title: 'Content Creation',
    tagline: 'Content that communicates your idea clearly and gives your brand a consistent voice.',
    color: '#06B6D4',
    description:
      'Great content isn\'t just words — it\'s strategy. We craft copy and content that resonates with your target audience, drives engagement, and keeps your brand voice consistent across every platform.',
    features: [
      'Social Media Content',
      'Website & Landing Page Copy',
      'Marketing & Ad Copy',
      'Product Descriptions',
      'Blog & Long-form Articles',
      'Brand Storytelling',
      'Email Campaigns',
      'Content Strategy & Calendar',
    ],
    packages: [
      { name: 'Starter',      price: '₹3,500+',   desc: '5 social posts + captions, 1 week delivery.' },
      { name: 'Professional', price: '₹9,000+',   desc: 'Monthly plan: 15 posts, 2 blogs, ad copy.' },
      { name: 'Premium',      price: '₹20,000+',  desc: 'Full content strategy + creation + publishing.' },
      { name: 'Custom',       price: 'Quoted',     desc: 'Enterprise content, multi-channel campaigns.' },
    ],
    cta: 'Plan My Content',
  },
  {
    id: 'video',
    emoji: '🎬',
    title: 'Video Editing',
    tagline: 'Transform raw footage into engaging videos designed for brands and creators.',
    color: '#F97316',
    description:
      'We take your raw clips and turn them into polished videos that hold attention, communicate your message, and drive results — whether it\'s a 30-second reel or a full YouTube documentary.',
    features: [
      'Instagram Reels & YouTube Shorts',
      'YouTube Long-form Videos',
      'Promotional & Brand Videos',
      'Motion Graphics & Animations',
      'Color Correction & Grading',
      'Subtitles & Closed Captions',
      'Sound Design & Music Sync',
      'Custom Transitions & Effects',
    ],
    packages: [
      { name: 'Starter',      price: '₹2,500+',   desc: '1 reel / short (up to 60s), basic edit, music.' },
      { name: 'Professional', price: '₹6,000+',   desc: '3 reels or 1 long-form video with motion graphics.' },
      { name: 'Premium',      price: '₹15,000+',  desc: 'Full video production package, 5+ videos / month.' },
      { name: 'Custom',       price: 'Quoted',     desc: 'Brand campaigns, event coverage, series production.' },
    ],
    cta: 'Edit My Video',
  },
  {
    id: 'design',
    emoji: '🎨',
    title: 'Graphic Designing',
    tagline: 'Visual identities and digital designs that make your brand recognizable.',
    color: '#A3E635',
    description:
      'Design is the first language your brand speaks. We create visual systems that are cohesive, professional, and built to last — from a single logo to a complete brand identity kit.',
    features: [
      'Logo & Brand Identity',
      'Social Media Creatives',
      'Poster & Banner Design',
      'YouTube Thumbnails',
      'Business Cards & Stationery',
      'UI Graphics & Illustrations',
      'Packaging Design',
      'Pitch Deck & Presentation Design',
    ],
    packages: [
      { name: 'Starter',      price: '₹2,000+',   desc: 'Logo design (3 concepts, 2 revisions).' },
      { name: 'Professional', price: '₹7,500+',   desc: 'Logo + brand guidelines + social kit.' },
      { name: 'Premium',      price: '₹18,000+',  desc: 'Complete brand identity — logo, typography, colors, all assets.' },
      { name: 'Custom',       price: 'Quoted',     desc: 'Product packaging, enterprise branding, large asset sets.' },
    ],
    cta: 'Design My Brand',
  },
]

export default function Services() {
  return (
    <main className="pt-24">
      {/* Header */}
      <section className="section pb-0 relative overflow-hidden">
        <div className="orb w-96 h-96 bg-[var(--primary)] left-0 top-0 opacity-10" />
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-[var(--border)]"
              style={{ color: 'var(--primary)', background: 'rgba(124,58,237,0.1)' }}>
              All Services
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Services Built<br />
              <span className="gradient-text">for Real Results</span>
            </h1>
            <p className="text-[var(--muted)] max-w-xl mx-auto text-lg">
              Four focused services. Zero fluff. Everything you need to build, grow, and present your brand digitally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service sections */}
      {SERVICES.map((svc, idx) => (
        <section
          key={svc.id}
          id={svc.id}
          className="section border-t border-[var(--border)]"
        >
          <div className="container">
            <div className={`grid lg:grid-cols-2 gap-16 items-start ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={idx % 2 === 1 ? 'lg:col-start-2' : ''}
              >
                <div className="text-5xl mb-4">{svc.emoji}</div>
                <h2 className="font-display text-4xl font-bold mb-4" style={{ color: svc.color }}>
                  {svc.title}
                </h2>
                <p className="text-[var(--muted)] text-lg mb-6 leading-relaxed">{svc.tagline}</p>
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">{svc.description}</p>

                <ul className="grid grid-cols-2 gap-2.5 mb-8">
                  {svc.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check size={14} style={{ color: svc.color }} className="shrink-0" />
                      <span className="text-[var(--muted)]">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/project-planner">
                  <Button
                    style={{
                      background: `linear-gradient(135deg, ${svc.color}, ${svc.color}99)`,
                      boxShadow: `0 4px 20px ${svc.color}30`,
                    }}
                    className="gap-2"
                  >
                    {svc.cta} <ArrowRight size={16} />
                  </Button>
                </Link>
              </motion.div>

              {/* Packages */}
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`space-y-4 ${idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
              >
                <h3 className="font-display font-semibold text-lg mb-6">Packages</h3>
                {svc.packages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className="rounded-2xl p-5 border border-[var(--border)] hover:border-[var(--primary)]/40 transition-all flex items-start gap-4"
                    style={{ background: 'var(--card-bg)' }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-semibold text-sm">{pkg.name}</span>
                        <span className="font-bold text-sm" style={{ color: svc.color }}>{pkg.price}</span>
                      </div>
                      <p className="text-[var(--muted)] text-xs leading-relaxed">{pkg.desc}</p>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-[var(--muted)] mt-4">
                  * Prices are indicative estimates. Final pricing after project review via AI Planner.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="section">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-bold mb-4">Not sure which service you need?</h2>
            <p className="text-[var(--muted)] mb-8">Use our AI Project Planner — describe your idea and get a recommended scope in minutes.</p>
            <Link to="/project-planner">
              <Button size="xl">Launch AI Planner <ArrowRight size={18} /></Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

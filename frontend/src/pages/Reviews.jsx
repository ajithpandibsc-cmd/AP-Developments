import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import ReviewCard from '../components/ReviewCard'

const REVIEWS = [
  { name:'Rahul M.',       rating:5, comment:'AP Developments built our e-commerce platform from scratch. The booking flow was seamless and the admin panel exactly what we needed. Extremely professional.', projectType:'E-Commerce Website', verified:true },
  { name:'Priya K.',       rating:5, comment:'The AI Planner blew my mind — I got a realistic scope and budget in minutes. The brand identity delivered exceeded my expectations in every way.', projectType:'Brand Identity', verified:true },
  { name:'Arjun S.',       rating:5, comment:'Video quality and turnaround time were both exceptional. Communication throughout was top-notch and delivery was exactly on time.', projectType:'YouTube & Reels Editing', verified:false },
  { name:'Meena R.',       rating:5, comment:'My website went from 0 to live in under 2 weeks. Clean code, fast performance, and exactly the design I envisioned. Will definitely return.', projectType:'Portfolio Website', verified:true },
  { name:'Karthik N.',     rating:4, comment:'Great content strategy — our Instagram went from 500 to 3K followers in 6 weeks. Copy was sharp and on-brand throughout.', projectType:'Social Media Content', verified:false },
  { name:'Divya L.',       rating:5, comment:'The poster and banner designs for our product launch were stunning. Multiple people asked who designed them. Highly recommended.', projectType:'Graphic Design', verified:true },
]

export default function Reviews() {
  const [page, setPage] = useState(0)
  const perPage = 3
  const pages   = Math.ceil(REVIEWS.length / perPage)
  const visible = REVIEWS.slice(page * perPage, page * perPage + perPage)

  return (
    <main className="pt-24">
      {/* Header */}
      <section className="section pb-0 relative overflow-hidden">
        <div className="orb w-96 h-96 bg-[var(--accent)] left-1/2 top-0 opacity-10 -translate-x-1/2" />
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-[var(--border)]"
              style={{ color: 'var(--accent)', background: 'rgba(249,115,22,0.1)' }}>
              Client Reviews
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              What Our Clients<br />
              <span style={{ color: 'var(--accent)' }}>Are Saying</span>
            </h1>
            <p className="text-[var(--muted)] max-w-xl mx-auto">
              Honest feedback from real project collaborations.
            </p>
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-xs border border-[var(--border)]"
              style={{ background: 'rgba(249,115,22,0.08)', color: 'var(--accent)' }}>
              ⚠ Sample reviews for demonstration. Real client reviews collected after project completion.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Summary stats */}
      <section className="section pb-0">
        <div className="container">
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto text-center">
            {[
              ['5.0', 'Average Rating', '★'],
              ['50+', 'Projects Completed', '🚀'],
              ['100%', 'On-time Delivery', '⚡'],
            ].map(([n, l, e]) => (
              <div key={l} className="rounded-2xl p-6 border border-[var(--border)]" style={{ background: 'var(--card-bg)' }}>
                <div className="text-2xl mb-1">{e}</div>
                <div className="font-display font-bold text-2xl gradient-text">{n}</div>
                <div className="text-xs text-[var(--muted)] mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review cards */}
      <section className="section">
        <div className="container">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-3 gap-6 mb-10"
          >
            {visible.map((r, i) => <ReviewCard key={r.name} review={r} index={i} />)}
          </motion.div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              aria-label="Previous page"
              className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-white hover:border-[var(--primary)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === page ? 'scale-125' : 'opacity-30 hover:opacity-60'
                }`}
                style={{ background: 'var(--primary)' }}
              />
            ))}
            <button
              onClick={() => setPage(p => Math.min(pages - 1, p + 1))}
              disabled={page === pages - 1}
              aria-label="Next page"
              className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-white hover:border-[var(--primary)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Leave a review CTA */}
      <section className="section pt-0">
        <div className="container text-center">
          <div className="max-w-md mx-auto rounded-2xl p-8 border border-[var(--border)]" style={{ background: 'var(--card-bg)' }}>
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({length:5},(_,i)=><Star key={i} size={20} fill="#F97316" stroke="#F97316"/>)}
            </div>
            <h3 className="font-display font-bold text-xl mb-2">Worked with us?</h3>
            <p className="text-[var(--muted)] text-sm mb-6">Share your experience after project completion. Reviews are displayed after admin approval.</p>
            <a href="/login" className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl text-white"
              style={{ background: 'linear-gradient(135deg,var(--primary),var(--secondary))' }}>
              Submit a Review
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

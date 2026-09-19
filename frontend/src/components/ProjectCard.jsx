import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Tag } from 'lucide-react'

const CATEGORY_COLORS = {
  Web:     '#7C3AED',
  Content: '#06B6D4',
  Video:   '#F97316',
  Design:  '#A3E635',
}

export default function ProjectCard({ project, index }) {
  const { title, category, description, tech = [], result, image, link } = project
  const cardRef = useRef(null)
  const [tilt, setTilt]     = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const color = CATEGORY_COLORS[category] || '#7C3AED'

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)
    setTilt({ x: dy * -6, y: dx * 6 })
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      style={{
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s' : 'transform 0.45s cubic-bezier(0.23,1,0.32,1)',
      }}
      className="group rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--primary)]/40 transition-colors card-glow"
      style={{ background: 'var(--card-bg)' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52 bg-gradient-to-br from-[#0F0F1E] to-[#1A1A2E]">
        {image
          ? <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl font-display font-bold opacity-10">{title.charAt(0)}</div>
              <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 50%, ${color}20, transparent 70%)` }} />
            </div>
          )
        }
        {/* Category badge */}
        <span
          className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: `${color}22`, color, border: `1px solid ${color}40` }}
        >
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-4">
        <h3 className="font-display font-bold text-lg leading-snug">{title}</h3>
        <p className="text-[var(--muted)] text-sm leading-relaxed">{description}</p>

        {/* Result */}
        {result && (
          <div className="flex items-start gap-2 text-xs rounded-xl px-3 py-2.5"
            style={{ background: `${color}10`, color, border: `1px solid ${color}20` }}>
            <Tag size={13} className="mt-0.5 shrink-0" />
            <span>{result}</span>
          </div>
        )}

        {/* Tech pills */}
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tech.map(t => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-lg border border-[var(--border)] text-[var(--muted)]">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* View button */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold mt-auto transition-all group/link"
            style={{ color }}
          >
            View Project
            <ExternalLink size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        )}
      </div>
    </motion.article>
  )
}

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ServiceCard({ icon, title, description, features, cta, ctaLink, color, id }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top  + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width  / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -8, y: dx * 8 })
  }

  return (
    <motion.div
      ref={cardRef}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s' : 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
      }}
      className="relative rounded-2xl p-8 flex flex-col gap-6 overflow-hidden border border-[var(--border)] card-glow"
      style={{
        background: 'var(--card-bg)',
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* Colored top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: color }} />

      {/* BG glow */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 pointer-events-none"
        style={{ background: color, filter: 'blur(60px)', transform: 'translate(30%,-30%)' }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        {icon}
      </div>

      {/* Content */}
      <div>
        <h3 className="font-display font-bold text-xl mb-3">{title}</h3>
        <p className="text-[var(--muted)] text-sm leading-relaxed">{description}</p>
      </div>

      {/* Feature list */}
      <ul className="space-y-2 flex-1">
        {features.map(f => (
          <li key={f} className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to={ctaLink}
        className="inline-flex items-center gap-2 text-sm font-semibold transition-all group"
        style={{ color }}
      >
        {cta}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  )
}

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Code2 } from 'lucide-react'

const CATEGORY_COLORS = {
  Web:       '#FF5E00',
  Content:   '#FFB800',
  Design:    '#F43F5E',
  Video:     '#38BDF8',
  Fullstack: '#FF5E00',
  App:       '#10B981',
  AI:        '#A855F7',
}

export default function ProjectCard({ project, index = 0 }) {
  const {
    title,
    category,
    description,
    technologies = [],
    tech = [],
    image,
    link,
    github,
    result
  } = project

  const techList = technologies.length > 0 ? technologies : tech
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const color = CATEGORY_COLORS[category] || '#FF5E00'

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    setTilt({ x: dy * -4, y: dx * 4 })
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all duration-300 card-glow flex flex-col h-full w-full bg-[#121218] shadow-xl shadow-black/40 box-border"
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
        transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.3s',
      }}
    >
      {/* Visual Image Header */}
      <div className="relative overflow-hidden h-52 w-full bg-gradient-to-br from-[#161622] to-[#0d0d14] shrink-0 border-b border-white/[0.08]">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null
              e.target.style.display = 'none'
            }}
          />
        ) : null}

        {/* Fallback pattern if no image or broken */}
        <div className={`absolute inset-0 flex items-center justify-center ${image ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
          <div className="text-7xl font-display font-extrabold text-white/5 select-none">{title.charAt(0)}</div>
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(circle at 50% 50%, ${color}25, transparent 70%)` }}
          />
          <Code2 size={40} className="text-white/20" />
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121218]/90 via-transparent to-black/30 pointer-events-none" />

        {/* Crisp Category Badge */}
        <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/20 shadow-lg">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
          <span className="text-[11px] font-bold uppercase tracking-wider text-white">{category}</span>
        </div>
      </div>

      {/* Card Content with generous padding so text never touches the edge */}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-display font-bold text-lg text-white mb-2 leading-snug group-hover:text-orange-400 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* Optional highlighted outcome or result */}
        {result && (
          <div className="mb-4 text-xs font-semibold px-3 py-1.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 inline-flex items-center gap-1.5 self-start">
            <span>★</span>
            <span>{result}</span>
          </div>
        )}

        {/* Technologies Pills */}
        {techList && techList.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {techList.map((t, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.04] text-[#D4D4D8] group-hover:border-white/20 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Action Footer */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3 mt-auto">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF5E00] hover:text-[#FFB800] transition-colors group/link"
            >
              <span>VIEW PROJECT</span>
              <ExternalLink size={13} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ) : (
            <span className="text-xs text-[#71717A] italic">Featured Showcase</span>
          )}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title="GitHub Repository"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

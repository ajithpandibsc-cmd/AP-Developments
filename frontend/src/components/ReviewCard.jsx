import { Star, BadgeCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ReviewCard({ review, index }) {
  const { name, rating = 5, comment, projectType, avatar, verified } = review

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-2xl p-6 flex flex-col gap-5 border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors h-full"
      style={{ background: 'var(--card-bg)' }}
      aria-label={`Review by ${name}`}
    >
      {/* Stars */}
      <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={15}
            fill={i < rating ? '#F97316' : 'none'}
            stroke={i < rating ? '#F97316' : 'var(--border)'}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-sm leading-relaxed text-[var(--muted)] flex-1">
        &ldquo;{comment}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm shrink-0"
          style={{ background: 'linear-gradient(135deg,var(--primary),var(--secondary))', color: '#fff' }}
          aria-hidden="true"
        >
          {avatar || name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm truncate">{name}</span>
            {verified && (
              <BadgeCheck size={14} style={{ color: 'var(--secondary)' }} aria-label="Verified project" />
            )}
          </div>
          <span className="text-xs text-[var(--muted)]">{projectType}</span>
        </div>
      </div>
    </motion.div>
  )
}

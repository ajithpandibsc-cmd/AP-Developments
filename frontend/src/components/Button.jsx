import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const VARIANTS = {
  primary: {
    base: 'text-white font-semibold',
    style: {
      background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
      boxShadow: '0 4px 24px rgba(124,58,237,0.35)',
    },
  },
  secondary: {
    base: 'text-white font-semibold border border-[var(--border)] hover:border-[var(--primary)]',
    style: { background: 'rgba(255,255,255,0.05)' },
  },
  accent: {
    base: 'text-white font-semibold',
    style: {
      background: 'linear-gradient(135deg, var(--accent), #FBBF24)',
      boxShadow: '0 4px 20px rgba(249,115,22,0.3)',
    },
  },
  ghost: {
    base: 'text-[var(--muted)] hover:text-white border border-transparent hover:border-[var(--border)] font-medium',
    style: {},
  },
}

const SIZES = {
  sm:  'px-4 py-2   text-sm   rounded-lg',
  md:  'px-6 py-3   text-sm   rounded-xl',
  lg:  'px-8 py-3.5 text-base rounded-xl',
  xl:  'px-10 py-4  text-base rounded-2xl',
}

const Button = forwardRef(function Button(
  { children, variant = 'primary', size = 'md', className = '', loading = false, ...props },
  ref
) {
  const v = VARIANTS[variant] || VARIANTS.primary
  const s = SIZES[size] || SIZES.md

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${v.base} ${s} ${className}`}
      style={v.style}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </motion.button>
  )
})

export default Button

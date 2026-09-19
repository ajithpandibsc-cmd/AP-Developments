import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'
import Logo from '../components/Logo'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg)' }}>
      <div className="orb w-96 h-96 bg-[var(--primary)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10">
        <Logo size={80} className="mx-auto mb-8" />
        <h1 className="font-display text-8xl font-bold mb-4 gradient-text">404</h1>
        <h2 className="font-display text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-[var(--muted)] mb-8 max-w-xs mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg,var(--primary),var(--secondary))' }}>
          <Home size={16} /> Back to Home
        </Link>
      </motion.div>
    </div>
  )
}

import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Button from '../components/Button'

export default function Confirmation() {
  const [params] = useSearchParams()
  const bookingId = params.get('booking')

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background:'var(--bg)' }}>
      <div className="orb w-96 h-96 bg-[var(--highlight)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5" />
      <motion.div
        initial={{ opacity:0, scale:0.85 }}
        animate={{ opacity:1, scale:1 }}
        transition={{ duration:0.5 }}
        className="max-w-md w-full text-center relative z-10"
      >
        <div className="rounded-3xl p-12 border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
          <motion.div
            initial={{ scale:0 }}
            animate={{ scale:1 }}
            transition={{ delay:0.2, type:'spring', stiffness:200 }}
          >
            <CheckCircle2 size={72} className="mx-auto mb-6" style={{ color:'var(--highlight)' }}/>
          </motion.div>

          <h1 className="font-display text-3xl font-bold mb-2">Project Request Confirmed</h1>
          <p className="text-[var(--muted)] mb-8">
            Thank you for choosing AP Developments. We've received your project request and will reach out within 24 hours.
          </p>

          <div className="space-y-3 mb-8 text-sm text-left">
            {[
              ['Status','Confirmed ✓'],
              ["Next Step","We'll review your brief and contact you"],
              ['Booking ID', bookingId ? `#${bookingId.slice(-8).toUpperCase()}` : 'Submitted'],
            ].map(([l,v]) => (
              <div key={l} className="flex justify-between py-2.5 border-b border-[var(--border)] last:border-0">
                <span className="text-[var(--muted)]">{l}</span>
                <span className="font-medium" style={{ color: l==='Status' ? 'var(--highlight)' : 'var(--text)' }}>{v}</span>
              </div>
            ))}
          </div>

          <Link to="/dashboard">
            <Button size="lg" className="w-full justify-center">Go to Dashboard</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

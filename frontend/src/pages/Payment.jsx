import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import api from '../services/api'
import toast from 'react-hot-toast'

export default function Payment() {
  const [searchParams]  = useSearchParams()
  const bookingId       = searchParams.get('booking')
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying]   = useState(false)
  const { user }        = useAuth()
  const navigate        = useNavigate()

  useEffect(() => {
    if (!bookingId) { navigate('/dashboard'); return }
    api.get(`/bookings/${bookingId}`)
      .then(res => setBooking(res.data.booking))
      .catch(() => navigate('/dashboard'))
      .finally(() => setLoading(false))
  }, [bookingId])

  const handlePay = async () => {
    setPaying(true)
    try {
      // 1. Create Razorpay order on backend
      const { data } = await api.post('/payments/create-order', { bookingId })
      const { orderId, amount, currency, keyId } = data

      // 2. Open Razorpay checkout
      const options = {
        key: keyId,
        amount,
        currency,
        name: 'AP Developments',
        description: booking?.packageName || 'Project Booking',
        order_id: orderId,
        handler: async (response) => {
          // 3. Verify payment on backend
          try {
            await api.post('/payments/verify', {
              orderId:   response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              bookingId,
            })
            toast.success('Payment confirmed!')
            navigate('/confirmation?booking=' + bookingId)
          } catch {
            toast.error('Payment verification failed. Please contact support.')
          }
        },
        prefill: { name: user?.name, email: user?.email, contact: user?.phone || '' },
        theme: { color: '#7C3AED' },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (e) {
      toast.error('Could not initiate payment. Please try again.')
    } finally { setPaying(false) }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:'var(--bg)' }}>
      <div className="text-[var(--muted)]">Loading payment details...</div>
    </div>
  )

  // Demo mode if no real booking
  const demo = !booking ? { packageName: 'Professional Package', service: 'Web Development', amount: 1800000 } : booking

  return (
    <div className="min-h-screen p-6 py-12 relative overflow-hidden" style={{ background:'var(--bg)' }}>
      <div className="orb w-96 h-96 bg-[var(--primary)] left-0 top-0 opacity-10" />
      <div className="max-w-md mx-auto relative z-10">
        <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }}>
          <div className="text-center mb-8">
            <CreditCard size={48} className="mx-auto mb-4" style={{ color:'var(--primary)' }} />
            <h1 className="font-display text-3xl font-bold mb-2">Complete Payment</h1>
            <p className="text-[var(--muted)] text-sm">Secure checkout via Razorpay</p>
          </div>

          <div className="rounded-3xl p-8 border border-[var(--border)] mb-6" style={{ background:'var(--card-bg)' }}>
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {[
                ['Package',  demo.packageName],
                ['Service',  demo.service],
                ['Amount',   `₹${((demo.amount||0)/100).toLocaleString('en-IN')}`],
                ['Status',   'Pending Payment'],
              ].map(([l,v]) => (
                <div key={l} className="flex justify-between py-2 border-b border-[var(--border)] last:border-0 text-sm">
                  <span className="text-[var(--muted)]">{l}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs mb-6 px-3 py-2.5 rounded-xl"
              style={{ background:'rgba(163,230,53,0.08)', color:'var(--highlight)', border:'1px solid rgba(163,230,53,0.2)' }}>
              <Shield size={13}/> Payment secured by Razorpay. UPI, Cards, Net Banking supported.
            </div>

            <div className="flex items-start gap-2 text-xs mb-6 px-3 py-2.5 rounded-xl"
              style={{ background:'rgba(249,115,22,0.08)', color:'var(--accent)', border:'1px solid rgba(249,115,22,0.2)' }}>
              <AlertTriangle size={13} className="mt-0.5 shrink-0"/>
              Payment will only be confirmed after backend verification. Never share OTP or PIN with anyone.
            </div>

            <Button onClick={handlePay} loading={paying} size="lg" className="w-full justify-center">
              Pay Now
            </Button>
          </div>

          <p className="text-xs text-[var(--muted)] text-center">
            Sensitive payment details are handled exclusively by Razorpay. AP Developments does not store card numbers, CVVs, or UPI PINs.
          </p>
        </motion.div>
      </div>

      {/* Razorpay script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
    </div>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import Logo from '../components/Logo'
import toast from 'react-hot-toast'

const INPUT_CLS = `w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors`

const PW_RULES = [
  { label: 'At least 8 characters', test: v => v.length >= 8 },
  { label: 'One uppercase letter',   test: v => /[A-Z]/.test(v) },
  { label: 'One number',            test: v => /\d/.test(v) },
]

export default function Register() {
  const [form, setForm]       = useState({ name:'', email:'', phone:'', password:'', confirm:'' })
  const [showPw, setShowPw]   = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const { register }          = useAuth()
  const navigate              = useNavigate()

  const validate = () => {
    if (!form.name.trim())   return 'Full name is required.'
    if (!form.email.trim())  return 'Email is required.'
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Enter a valid email.'
    if (form.password.length < 8) return 'Password must be at least 8 characters.'
    if (form.password !== form.confirm) return 'Passwords do not match.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }
    setLoading(true); setError('')
    try {
      const user = await register({ name: form.name, email: form.email, phone: form.phone, password: form.password })
      toast.success(`Welcome to AP Developments, ${user.name.split(' ')[0]}!`)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden py-12"
      style={{ background: 'var(--bg)' }}>
      <div className="orb w-96 h-96 bg-[var(--primary)] -right-48 -top-48" />
      <div className="orb w-64 h-64 bg-[var(--secondary)] -left-32 -bottom-32" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 justify-center mb-6">
            <Logo size={40} />
            <span className="font-display font-bold text-lg">
              <span style={{ color: 'var(--primary)' }}>AP</span> Developments
            </span>
          </Link>
          <h1 className="font-display text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-[var(--muted)] text-sm">Start planning your project today</p>
        </div>

        <div className="rounded-3xl p-8 border border-[var(--border)]" style={{ background: 'var(--card-bg)' }}>
          {error && (
            <div className="flex items-center gap-2 text-sm px-4 py-3 rounded-xl mb-6 border"
              style={{ background: 'rgba(249,115,22,0.08)', color: 'var(--accent)', borderColor: 'rgba(249,115,22,0.25)' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="reg-name" className="block text-sm font-medium text-[var(--muted)] mb-2">Full Name <span style={{ color:'var(--accent)' }}>*</span></label>
              <input id="reg-name" type="text" placeholder="Your full name" className={INPUT_CLS}
                value={form.name} onChange={e => setForm({...form,name:e.target.value})} autoComplete="name" />
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-[var(--muted)] mb-2">Email <span style={{ color:'var(--accent)' }}>*</span></label>
              <input id="reg-email" type="email" placeholder="you@example.com" className={INPUT_CLS}
                value={form.email} onChange={e => setForm({...form,email:e.target.value})} autoComplete="email" />
            </div>

            <div>
              <label htmlFor="reg-phone" className="block text-sm font-medium text-[var(--muted)] mb-2">Phone Number</label>
              <input id="reg-phone" type="tel" placeholder="+91 00000 00000" className={INPUT_CLS}
                value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} autoComplete="tel" />
            </div>

            <div>
              <label htmlFor="reg-pw" className="block text-sm font-medium text-[var(--muted)] mb-2">Password <span style={{ color:'var(--accent)' }}>*</span></label>
              <div className="relative">
                <input id="reg-pw" type={showPw ? 'text' : 'password'} placeholder="Create a strong password" className={`${INPUT_CLS} pr-12`}
                  value={form.password} onChange={e => setForm({...form,password:e.target.value})} autoComplete="new-password" />
                <button type="button" onClick={() => setShowPw(!showPw)} aria-label="Toggle password"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-white transition-colors">
                  {showPw ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
              {/* PW strength indicators */}
              <div className="mt-2.5 flex gap-3 flex-wrap">
                {PW_RULES.map(r => (
                  <span key={r.label} className={`text-xs flex items-center gap-1 transition-colors ${r.test(form.password) ? 'text-[var(--highlight)]' : 'text-[var(--muted)]'}`}>
                    <Check size={11} /> {r.label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="reg-confirm" className="block text-sm font-medium text-[var(--muted)] mb-2">Confirm Password <span style={{ color:'var(--accent)' }}>*</span></label>
              <input id="reg-confirm" type={showPw ? 'text' : 'password'} placeholder="Repeat your password" className={INPUT_CLS}
                value={form.confirm} onChange={e => setForm({...form,confirm:e.target.value})} autoComplete="new-password" />
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full justify-center">
              Create Account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-[var(--muted)] mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--primary)] hover:underline font-medium">Sign in</Link>
        </p>
      </motion.div>
    </div>
  )
}

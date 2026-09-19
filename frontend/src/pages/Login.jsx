import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import Logo from '../components/Logo'
import toast from 'react-hot-toast'

const INPUT_CLS = `w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors`

export default function Login() {
  const [form, setForm]       = useState({ email: '', password: '' })
  const [showPw, setShowPw]   = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const { login }             = useAuth()
  const navigate              = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    setLoading(true); setError('')
    try {
      const user = await login(form.email, form.password)
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`)
      navigate(user.role === 'admin' ? '/admin' : '/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}>
      {/* BG */}
      <div className="orb w-96 h-96 bg-[var(--primary)] -left-48 -top-48" />
      <div className="orb w-64 h-64 bg-[var(--secondary)] -right-32 -bottom-32" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 justify-center mb-6">
            <Logo size={40} />
            <span className="font-display font-bold text-lg">
              <span style={{ color: 'var(--primary)' }}>AP</span> Developments
            </span>
          </Link>
          <h1 className="font-display text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-[var(--muted)] text-sm">Sign in to your dashboard</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl p-8 border border-[var(--border)]" style={{ background: 'var(--card-bg)' }}>
          {error && (
            <div className="flex items-center gap-2 text-sm px-4 py-3 rounded-xl mb-6 border"
              style={{ background: 'rgba(249,115,22,0.08)', color: 'var(--accent)', borderColor: 'rgba(249,115,22,0.25)' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-[var(--muted)] mb-2">Email</label>
              <input id="login-email" type="email" placeholder="you@example.com" className={INPUT_CLS}
                value={form.email} onChange={e => setForm({...form,email:e.target.value})} autoComplete="email" />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-[var(--muted)] mb-2">Password</label>
              <div className="relative">
                <input id="login-password" type={showPw ? 'text' : 'password'} placeholder="••••••••" className={`${INPUT_CLS} pr-12`}
                  value={form.password} onChange={e => setForm({...form,password:e.target.value})} autoComplete="current-password" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-white transition-colors"
                  aria-label={showPw ? 'Hide password' : 'Show password'}>
                  {showPw ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full justify-center">
              Sign In
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-[var(--muted)] mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-[var(--primary)] hover:underline font-medium">Create one</Link>
        </p>
      </motion.div>
    </div>
  )
}

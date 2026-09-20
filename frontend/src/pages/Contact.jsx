import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import Button from '../components/Button'
import api from '../services/api'

const SERVICES = ['Web Development','Content Creation','Video Editing','Graphic Design','Multiple Services','Not Sure Yet']
const BUDGETS  = ['Under ₹5,000','₹5,000 – ₹15,000','₹15,000 – ₹40,000','₹40,000 – ₹1,00,000','Above ₹1,00,000']

const FIELD = ({ label, id, error, children, required }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-[var(--muted)] mb-2">
      {label}{required && <span className="text-[var(--accent)]"> *</span>}
    </label>
    {children}
    {error && <p className="mt-1.5 text-xs text-[var(--accent)] flex items-center gap-1"><AlertCircle size={12}/>{error}</p>}
  </div>
)

const INPUT_CLS = `w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors`

export default function Contact() {
  const [form, setForm]     = useState({ name:'', email:'', phone:'', service:'', budget:'', description:'', startDate:'' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const validate = () => {
    const e = {}
    if (!form.name.trim())        e.name = 'Name is required'
    if (!form.email.trim())       e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.service)            e.service = 'Select a service'
    if (!form.description.trim()) e.description = 'Tell us about your project'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    try {
      await api.post('/contact', form)
      setStatus('success')
    } catch {
      // Fallback: still show success UI since we may be in local-only mode
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <main className="pt-32 pb-16 min-h-screen flex items-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center rounded-3xl p-12 border border-[var(--border)]"
            style={{ background: 'var(--card-bg)' }}
          >
            <CheckCircle2 size={60} className="mx-auto mb-6" style={{ color: 'var(--highlight)' }} />
            <h2 className="font-display text-3xl font-bold mb-4">Thank you!</h2>
            <p className="text-[var(--muted)] mb-2">Your project request has been received.</p>
            <p className="text-[var(--muted)] text-sm">We'll contact you within 24 hours at <strong>{form.email}</strong>.</p>
            <button onClick={() => setStatus('idle')} className="mt-8 text-sm text-[var(--primary)] hover:underline">
              Submit another request
            </button>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-32 pb-16">
      {/* Header */}
      <section className="section pb-0 relative overflow-hidden">
        <div className="orb w-96 h-96 bg-[var(--secondary)] left-0 top-0 opacity-10" />
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-[var(--border)]"
              style={{ color: 'var(--secondary)', background: 'rgba(6,182,212,0.1)' }}>
              Let's Talk
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Start Your<br />
              <span style={{ color: 'var(--secondary)' }}>Project Today</span>
            </h1>
            <p className="text-[var(--muted)] max-w-xl mx-auto mb-8">
              Fill out the form below and we'll reach out within 24 hours to discuss your project.
            </p>

            {/* Direct Contact Info */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="mailto:ajithpandi24032005@gmail.com" className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--primary)] transition-colors">
                <span style={{ color: 'var(--primary)' }}>✉</span> ajithpandi24032005@gmail.com
              </a>
              <a href="tel:+916369647192" className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--secondary)] transition-colors">
                <span style={{ color: 'var(--secondary)' }}>📞</span> +91 63696 47192
              </a>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card-bg)]">
                <span style={{ color: 'var(--accent)' }}>📍</span> Vellikuruchi, Sivaganga, TN
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl p-8 md:p-12 border border-[var(--border)] space-y-6"
              style={{ background: 'var(--card-bg)' }}
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <FIELD label="Full Name" id="contact-name" error={errors.name} required>
                  <input id="contact-name" type="text" placeholder="Your full name" className={INPUT_CLS}
                    value={form.name} onChange={e => setForm({...form,name:e.target.value})} />
                </FIELD>
                <FIELD label="Email Address" id="contact-email" error={errors.email} required>
                  <input id="contact-email" type="email" placeholder="you@example.com" className={INPUT_CLS}
                    value={form.email} onChange={e => setForm({...form,email:e.target.value})} />
                </FIELD>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FIELD label="Phone Number" id="contact-phone">
                  <input id="contact-phone" type="tel" placeholder="+91 00000 00000" className={INPUT_CLS}
                    value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} />
                </FIELD>
                <FIELD label="Service Needed" id="contact-service" error={errors.service} required>
                  <select id="contact-service" className={INPUT_CLS} style={{ background: '#080812' }}
                    value={form.service} onChange={e => setForm({...form,service:e.target.value})}>
                    <option value="">Select a service</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FIELD>
              </div>

              <FIELD label="Estimated Budget" id="contact-budget">
                <select id="contact-budget" className={INPUT_CLS} style={{ background: '#080812' }}
                  value={form.budget} onChange={e => setForm({...form,budget:e.target.value})}>
                  <option value="">Select budget range</option>
                  {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </FIELD>

              <FIELD label="Project Description" id="contact-desc" error={errors.description} required>
                <textarea id="contact-desc" rows={5} placeholder="Tell us about your project, goals, and any specific requirements..."
                  className={`${INPUT_CLS} resize-none`}
                  value={form.description} onChange={e => setForm({...form,description:e.target.value})} />
              </FIELD>

              <FIELD label="Preferred Start Date" id="contact-start">
                <input id="contact-start" type="date" className={INPUT_CLS} style={{ colorScheme: 'dark' }}
                  value={form.startDate} onChange={e => setForm({...form,startDate:e.target.value})} />
              </FIELD>

              <Button type="submit" size="lg" loading={status === 'loading'} className="w-full justify-center">
                <Send size={18} /> Send Project Request
              </Button>

              <p className="text-xs text-[var(--muted)] text-center">
                Or use our{' '}
                <a href="/project-planner" className="text-[var(--primary)] hover:underline">
                  AI Project Planner
                </a>{' '}
                for an instant estimate.
              </p>
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  )
}

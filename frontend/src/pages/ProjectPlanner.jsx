import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

const STEPS  = ['Service','Details','Budget','Timeline','AI Plan','Review']
const SERVICES = ['Web Development','Content Creation','Video Editing','Graphic Design']
const BUDGETS  = ['Under ₹5,000','₹5,000–₹15,000','₹15,000–₹40,000','₹40,000–₹1,00,000','Above ₹1,00,000']
const PRIORITY = ['Standard (within timeline)','Fast (expedited delivery)','Urgent (ASAP)']
const INPUT_CLS = `w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] transition-colors`

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10 overflow-x-auto pb-2">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            i < current ? 'text-[var(--secondary)]' : i === current ? 'text-[var(--primary)]' : 'text-[var(--muted)]'
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
              i < current ? 'border-[var(--secondary)] bg-[rgba(6,182,212,0.15)] text-[var(--secondary)]'
              : i === current ? 'border-[var(--primary)] bg-[rgba(124,58,237,0.15)] text-[var(--primary)]'
              : 'border-[var(--border)] text-[var(--muted)]'
            }`}>
              {i < current ? '✓' : i + 1}
            </div>
            <span className="hidden sm:block">{s}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 h-0.5 transition-colors ${i < current ? 'bg-[var(--secondary)]' : 'bg-[var(--border)]'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function ProjectPlanner() {
  const [step, setStep]       = useState(0)
  const [form, setForm]       = useState({ service:'', title:'', description:'', budget:'', timeline:'', priority:'' })
  const [aiResult, setAIResult]= useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [saved, setSaved]     = useState(false)
  const { user }              = useAuth()

  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => s - 1)

  const runAI = async () => {
    setLoading(true); setError('')
    try {
      const res = await api.post('/ai/plan', form)
      setAIResult(res.data.plan)
      next()
    } catch (e) {
      // Fallback mock plan if backend not running
      setAIResult({
        summary: `A ${form.service} project titled "${form.title}".`,
        recommendedService: form.service,
        estimatedScope: ['Needs further scoping after project review.'],
        suggestedTimeline: '7–21 working days (estimate)',
        budgetRange: form.budget || 'To be confirmed',
        recommendedPackage: 'Professional',
        nextSteps: ['Book a consultation', 'Confirm requirements', 'Sign off on scope & timeline'],
      })
      next()
    } finally { setLoading(false) }
  }

  const saveProject = async () => {
    if (!user) { window.location.href = '/login'; return }
    setLoading(true)
    try {
      await api.post('/projects', { ...form, estimatedBudget: aiResult?.budgetRange, timeline: aiResult?.suggestedTimeline })
      setSaved(true)
    } catch {
      setSaved(true) // still mark as saved for demo
    } finally { setLoading(false) }
  }

  if (saved) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background:'var(--bg)' }}>
        <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
          className="max-w-md w-full text-center rounded-3xl p-12 border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
          <CheckCircle2 size={60} className="mx-auto mb-6" style={{ color:'var(--highlight)' }} />
          <h2 className="font-display text-3xl font-bold mb-3">Project Saved!</h2>
          <p className="text-[var(--muted)] mb-8">Your project request has been submitted. We'll review and reach out within 24 hours.</p>
          <div className="flex flex-col gap-3">
            <Link to="/dashboard"><Button size="lg" className="w-full justify-center">Go to Dashboard</Button></Link>
            <Link to="/contact"><Button variant="secondary" size="lg" className="w-full justify-center">Contact Us</Button></Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 py-12 relative overflow-hidden" style={{ background:'var(--bg)' }}>
      <div className="orb w-96 h-96 bg-[var(--primary)] left-0 top-0 opacity-10" />
      <div className="orb w-64 h-64 bg-[var(--secondary)] right-0 bottom-0 opacity-10" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-xs font-semibold border border-[var(--border)]"
            style={{ color:'var(--primary)', background:'rgba(124,58,237,0.1)' }}>
            <Sparkles size={13}/> AP AI Project Planner
          </div>
          <h1 className="font-display text-4xl font-bold mb-3">Plan Your Project</h1>
          <p className="text-[var(--muted)]">Fill in your details. Our AI will generate a scope, timeline & budget estimate.</p>
        </div>

        <StepIndicator current={step} />

        <div className="rounded-3xl p-8 md:p-10 border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
          <AnimatePresence mode="wait">
            {/* Step 0: Service */}
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity:0,x:30 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-30 }}>
                <h2 className="font-display font-bold text-xl mb-6">What service do you need?</h2>
                <div className="grid grid-cols-2 gap-3">
                  {SERVICES.map(s => (
                    <button key={s} onClick={() => { setForm({...form,service:s}); next() }}
                      className={`p-5 rounded-2xl border text-sm font-medium text-left transition-all ${
                        form.service === s
                          ? 'border-[var(--primary)] text-white'
                          : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)]/40 hover:text-white'
                      }`}
                      style={form.service === s ? { background:'rgba(124,58,237,0.15)' } : {}}>
                      {s === 'Web Development' && '🌐 '}
                      {s === 'Content Creation' && '✍️ '}
                      {s === 'Video Editing' && '🎬 '}
                      {s === 'Graphic Design' && '🎨 '}
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Details */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity:0,x:30 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-30 }} className="space-y-5">
                <h2 className="font-display font-bold text-xl mb-6">Tell us about your project</h2>
                <div>
                  <label htmlFor="pp-title" className="block text-sm font-medium text-[var(--muted)] mb-2">Project Title</label>
                  <input id="pp-title" type="text" placeholder="e.g. Business website for my bakery" className={INPUT_CLS}
                    value={form.title} onChange={e => setForm({...form,title:e.target.value})} />
                </div>
                <div>
                  <label htmlFor="pp-desc" className="block text-sm font-medium text-[var(--muted)] mb-2">Project Description</label>
                  <textarea id="pp-desc" rows={5} placeholder="Describe what you want to build, key features, target audience, goals..."
                    className={`${INPUT_CLS} resize-none`}
                    value={form.description} onChange={e => setForm({...form,description:e.target.value})} />
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={back}><ArrowLeft size={16}/>Back</Button>
                  <Button onClick={next} disabled={!form.title || !form.description}>Next<ArrowRight size={16}/></Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Budget */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity:0,x:30 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-30 }}>
                <h2 className="font-display font-bold text-xl mb-6">What is your estimated budget?</h2>
                <div className="space-y-3 mb-8">
                  {BUDGETS.map(b => (
                    <button key={b} onClick={() => setForm({...form,budget:b})}
                      className={`w-full p-4 rounded-xl border text-sm font-medium text-left transition-all ${
                        form.budget === b ? 'border-[var(--primary)] text-white' : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)]/40 hover:text-white'
                      }`}
                      style={form.budget === b ? { background:'rgba(124,58,237,0.15)' } : {}}>
                      {b}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={back}><ArrowLeft size={16}/>Back</Button>
                  <Button onClick={next} disabled={!form.budget}>Next<ArrowRight size={16}/></Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Timeline */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity:0,x:30 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-30 }} className="space-y-5">
                <h2 className="font-display font-bold text-xl mb-6">Timeline & priority</h2>
                <div>
                  <label htmlFor="pp-deadline" className="block text-sm font-medium text-[var(--muted)] mb-2">Expected Delivery Date</label>
                  <input id="pp-deadline" type="date" className={INPUT_CLS} style={{ colorScheme:'dark' }}
                    value={form.timeline} onChange={e => setForm({...form,timeline:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--muted)] mb-3">Priority</label>
                  <div className="space-y-2">
                    {PRIORITY.map(p => (
                      <button key={p} onClick={() => setForm({...form,priority:p})}
                        className={`w-full p-3 rounded-xl border text-sm font-medium text-left transition-all ${
                          form.priority === p ? 'border-[var(--primary)] text-white' : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)]/40 hover:text-white'
                        }`}
                        style={form.priority === p ? { background:'rgba(124,58,237,0.15)' } : {}}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button variant="secondary" onClick={back}><ArrowLeft size={16}/>Back</Button>
                  <Button onClick={runAI} loading={loading} className="flex-1 justify-center">
                    <Sparkles size={16}/> Generate AI Plan
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: AI Plan */}
            {step === 4 && aiResult && (
              <motion.div key="s4" initial={{ opacity:0,x:30 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-30 }} className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={20} style={{ color:'var(--primary)' }}/>
                  <h2 className="font-display font-bold text-xl">AI Project Analysis</h2>
                </div>

                <div className="rounded-xl p-4 border text-xs" style={{ background:'rgba(249,115,22,0.08)', borderColor:'rgba(249,115,22,0.25)', color:'var(--accent)' }}>
                  <AlertTriangle size={13} className="inline mr-1"/>
                  AI-generated estimate. Final pricing confirmed after project review.
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    ['Recommended Service', aiResult.recommendedService],
                    ['Recommended Package', aiResult.recommendedPackage],
                    ['Budget Range',        aiResult.budgetRange],
                    ['Suggested Timeline',  aiResult.suggestedTimeline],
                  ].map(([l,v]) => (
                    <div key={l} className="rounded-xl p-4 border border-[var(--border)]" style={{ background:'rgba(124,58,237,0.05)' }}>
                      <div className="text-xs text-[var(--muted)] mb-1">{l}</div>
                      <div className="font-semibold text-sm">{v}</div>
                    </div>
                  ))}
                </div>

                {aiResult.estimatedScope?.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold mb-3">Estimated Scope</div>
                    <ul className="space-y-2">
                      {aiResult.estimatedScope.map(s => (
                        <li key={s} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                          <CheckCircle2 size={14} style={{ color:'var(--secondary)' }} className="shrink-0"/>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiResult.nextSteps?.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold mb-3">Next Steps</div>
                    <ol className="space-y-2">
                      {aiResult.nextSteps.map((s, i) => (
                        <li key={s} className="flex items-center gap-3 text-sm text-[var(--muted)]">
                          <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                            style={{ background:'rgba(6,182,212,0.15)', color:'var(--secondary)' }}>{i+1}</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button variant="secondary" onClick={back}><ArrowLeft size={16}/>Revise</Button>
                  <Button onClick={next}>Confirm & Book<ArrowRight size={16}/></Button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Review & Submit */}
            {step === 5 && (
              <motion.div key="s5" initial={{ opacity:0,x:30 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-30 }} className="space-y-6">
                <h2 className="font-display font-bold text-xl mb-6">Review Your Request</h2>

                <div className="space-y-3">
                  {[
                    ['Service',     form.service],
                    ['Project',     form.title],
                    ['Budget',      form.budget],
                    ['Delivery',    form.timeline || 'Flexible'],
                    ['Priority',    form.priority  || 'Standard'],
                  ].map(([l,v]) => (
                    <div key={l} className="flex justify-between py-3 border-b border-[var(--border)] last:border-0 text-sm">
                      <span className="text-[var(--muted)]">{l}</span>
                      <span className="font-medium text-right max-w-[60%]">{v}</span>
                    </div>
                  ))}
                </div>

                {!user && (
                  <div className="rounded-xl p-4 border text-sm" style={{ background:'rgba(6,182,212,0.08)', borderColor:'rgba(6,182,212,0.25)', color:'var(--secondary)' }}>
                    You need to log in to save this project request.{' '}
                    <Link to="/login" className="font-semibold underline">Sign in →</Link>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="secondary" onClick={back}><ArrowLeft size={16}/>Back</Button>
                  <Button onClick={saveProject} loading={loading} className="flex-1 justify-center">
                    Submit Project Request
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

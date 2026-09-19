import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, FolderOpen, Calendar, CreditCard, MessageSquare, User, LogOut, ChevronRight, Clock, CheckCircle2, AlertCircle, Play, Eye } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import api from '../services/api'
import toast from 'react-hot-toast'

const STATUS_CONFIG = {
  Requested:   { color: '#94A3B8', icon: <Clock size={14}/>      },
  Planning:    { color: '#7C3AED', icon: <Eye size={14}/>         },
  'In Progress':{ color: '#06B6D4', icon: <Play size={14}/>       },
  Review:      { color: '#F97316', icon: <AlertCircle size={14}/> },
  Completed:   { color: '#A3E635', icon: <CheckCircle2 size={14}/>},
}

const NAV = [
  { key:'overview',  icon:<LayoutDashboard size={18}/>, label:'Overview'    },
  { key:'projects',  icon:<FolderOpen size={18}/>,      label:'My Projects' },
  { key:'bookings',  icon:<Calendar size={18}/>,        label:'Bookings'    },
  { key:'payments',  icon:<CreditCard size={18}/>,      label:'Payments'    },
  { key:'messages',  icon:<MessageSquare size={18}/>,   label:'Messages'    },
  { key:'profile',   icon:<User size={18}/>,            label:'Profile'     },
]

export default function Dashboard() {
  const [tab, setTab]         = useState('overview')
  const [projects, setProjects]= useState([])
  const [bookings, setBookings]= useState([])
  const [payments, setPayments]= useState([])
  const [loading, setLoading] = useState(true)
  const { user, logout }      = useAuth()
  const navigate              = useNavigate()

  useEffect(() => {
    Promise.all([
      api.get('/projects/mine').catch(() => ({ data: { projects: [] } })),
      api.get('/bookings/mine').catch(() => ({ data: { bookings: [] } })),
      api.get('/payments/mine').catch(() => ({ data: { payments: [] } })),
    ]).then(([p, b, pay]) => {
      setProjects(p.data.projects || [])
      setBookings(b.data.bookings || [])
      setPayments(pay.data.payments || [])
    }).finally(() => setLoading(false))
  }, [])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[var(--border)] fixed left-0 top-0 bottom-0 p-6"
        style={{ background: 'rgba(8,8,18,0.9)', backdropFilter: 'blur(20px)' }}>
        <Link to="/" className="flex items-center gap-2.5 mb-10">
          <Logo size={36} />
          <span className="font-display font-bold text-base">
            <span style={{ color:'var(--primary)' }}>AP</span> Dev
          </span>
        </Link>

        <nav className="flex-1 space-y-1" aria-label="Dashboard navigation">
          {NAV.map(n => (
            <button
              key={n.key}
              onClick={() => setTab(n.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                tab === n.key
                  ? 'text-white'
                  : 'text-[var(--muted)] hover:text-white hover:bg-white/5'
              }`}
              style={tab === n.key ? { background: 'rgba(124,58,237,0.2)', color: 'var(--primary)' } : {}}
            >
              {n.icon} {n.label}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--muted)] hover:text-white hover:bg-white/5 transition-all">
          <LogOut size={18}/> Log Out
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-64 p-6 md:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display font-bold text-3xl mb-1">
              Welcome, <span style={{ color: 'var(--primary)' }}>{user?.name?.split(' ')[0]}</span>
            </h1>
            <p className="text-[var(--muted)] text-sm">Manage your projects and bookings</p>
          </div>
          <Link to="/project-planner">
            <button className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl text-white"
              style={{ background:'linear-gradient(135deg,var(--primary),var(--secondary))' }}>
              New Project <ChevronRight size={15}/>
            </button>
          </Link>
        </div>

        {/* Overview tab */}
        {tab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label:'Total Projects', value: projects.length, color:'var(--primary)'   },
                { label:'Active Bookings',value: bookings.filter(b=>b.status!=='Completed').length, color:'var(--secondary)' },
                { label:'Total Paid',     value: `₹${payments.reduce((s,p)=>s+(p.amount||0),0).toLocaleString('en-IN')}`, color:'var(--accent)' },
                { label:'Completed',      value: projects.filter(p=>p.status==='Completed').length, color:'var(--highlight)' },
              ].map(s => (
                <div key={s.label} className="rounded-2xl p-5 border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                  <div className="font-display font-bold text-2xl mb-1" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-[var(--muted)]">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent projects */}
            <div>
              <h2 className="font-display font-semibold text-lg mb-4">Recent Projects</h2>
              {loading ? (
                <div className="text-[var(--muted)] text-sm py-8 text-center">Loading projects...</div>
              ) : projects.length === 0 ? (
                <div className="rounded-2xl p-10 text-center border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                  <div className="text-4xl mb-4">📂</div>
                  <p className="text-[var(--muted)] mb-4">No projects yet.</p>
                  <Link to="/project-planner" className="text-sm text-[var(--primary)] hover:underline font-medium">
                    Start your first project →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {projects.slice(0,5).map(p => {
                    const cfg = STATUS_CONFIG[p.status] || STATUS_CONFIG.Requested
                    return (
                      <div key={p._id} className="flex items-center justify-between p-5 rounded-xl border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                        <div>
                          <h3 className="font-medium text-sm mb-1">{p.title}</h3>
                          <span className="text-xs text-[var(--muted)]">{p.service}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg" style={{ background:`${cfg.color}18`, color:cfg.color }}>
                          {cfg.icon} {p.status}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Projects tab */}
        {tab === 'projects' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display font-semibold text-xl mb-6">My Projects</h2>
            {projects.length === 0 ? (
              <div className="rounded-2xl p-16 text-center border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                <p className="text-[var(--muted)] mb-4">No projects found.</p>
                <Link to="/project-planner" className="text-sm text-[var(--primary)] hover:underline">Plan a new project</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map(p => {
                  const cfg = STATUS_CONFIG[p.status] || STATUS_CONFIG.Requested
                  return (
                    <div key={p._id} className="rounded-2xl p-6 border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold mb-1">{p.title}</h3>
                          <p className="text-xs text-[var(--muted)] mb-3">{p.description}</p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="px-2.5 py-1 rounded-lg border border-[var(--border)] text-[var(--muted)]">{p.service}</span>
                            {p.budget && <span className="px-2.5 py-1 rounded-lg border border-[var(--border)] text-[var(--muted)]">Budget: {p.budget}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg shrink-0" style={{ background:`${cfg.color}18`, color:cfg.color }}>
                          {cfg.icon} {p.status}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* Payments tab */}
        {tab === 'payments' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display font-semibold text-xl mb-6">Payment History</h2>
            {payments.length === 0 ? (
              <div className="rounded-2xl p-16 text-center border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                <p className="text-[var(--muted)]">No payments yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {payments.map(p => (
                  <div key={p._id} className="flex items-center justify-between p-5 rounded-xl border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                    <div>
                      <div className="font-medium text-sm">Payment #{p.paymentId || p._id?.slice(-8)}</div>
                      <div className="text-xs text-[var(--muted)]">{new Date(p.createdAt).toLocaleDateString('en-IN')}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold" style={{ color:'var(--highlight)' }}>₹{(p.amount/100).toLocaleString('en-IN')}</div>
                      <div className="text-xs capitalize" style={{ color: p.status==='captured'?'var(--highlight)':'var(--accent)' }}>{p.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Profile tab */}
        {tab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display font-semibold text-xl mb-6">Profile</h2>
            <div className="max-w-md rounded-2xl p-8 border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-2xl mb-6"
                style={{ background:'linear-gradient(135deg,var(--primary),var(--secondary))' }}>
                {user?.name?.charAt(0)}
              </div>
              {[['Name',user?.name],['Email',user?.email],['Phone',user?.phone||'—'],['Role',user?.role]].map(([l,v]) => (
                <div key={l} className="flex justify-between py-3 border-b border-[var(--border)] last:border-0">
                  <span className="text-sm text-[var(--muted)]">{l}</span>
                  <span className="text-sm font-medium capitalize">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Fallback tabs */}
        {['bookings','messages'].includes(tab) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display font-semibold text-xl mb-6 capitalize">{tab}</h2>
            <div className="rounded-2xl p-16 text-center border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
              <p className="text-[var(--muted)]">No {tab} found yet.</p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

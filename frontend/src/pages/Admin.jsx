import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, FolderOpen, Calendar, CreditCard, Star, MessageSquare, Settings, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import api from '../services/api'
import toast from 'react-hot-toast'

const NAV = [
  { key:'overview',  icon:<Settings size={18}/>,      label:'Overview'       },
  { key:'users',     icon:<Users size={18}/>,          label:'Users'          },
  { key:'projects',  icon:<FolderOpen size={18}/>,     label:'Projects'       },
  { key:'bookings',  icon:<Calendar size={18}/>,       label:'Bookings'       },
  { key:'payments',  icon:<CreditCard size={18}/>,     label:'Payments'       },
  { key:'reviews',   icon:<Star size={18}/>,           label:'Reviews'        },
  { key:'messages',  icon:<MessageSquare size={18}/>,  label:'Contact Msgs'   },
]

const STATUS_OPTS = ['Requested','Planning','In Progress','Review','Completed']

export default function Admin() {
  const [tab, setTab]       = useState('overview')
  const [data, setData]     = useState({ users:[], projects:[], bookings:[], payments:[], reviews:[], messages:[] })
  const [loading, setLoading]= useState(true)
  const { logout }          = useAuth()
  const navigate            = useNavigate()

  const load = async () => {
    setLoading(true)
    try {
      const [u,p,b,pay,r,m] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/projects'),
        api.get('/admin/bookings'),
        api.get('/admin/payments'),
        api.get('/admin/reviews'),
        api.get('/admin/messages'),
      ])
      setData({ users:u.data.users||[], projects:p.data.projects||[], bookings:b.data.bookings||[], payments:pay.data.payments||[], reviews:r.data.reviews||[], messages:m.data.messages||[] })
    } catch { /* still renders empty states */ }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (projectId, status) => {
    try {
      await api.put(`/admin/projects/${projectId}/status`, { status })
      toast.success('Status updated')
      load()
    } catch { toast.error('Failed to update status') }
  }

  const approveReview = async (reviewId) => {
    try {
      await api.put(`/admin/reviews/${reviewId}/approve`)
      toast.success('Review approved')
      load()
    } catch { toast.error('Failed to approve review') }
  }

  const handleLogout = () => { logout(); navigate('/') }

  const STATS = [
    { label:'Total Users',    value: data.users.length,    color:'var(--primary)'   },
    { label:'Projects',       value: data.projects.length, color:'var(--secondary)' },
    { label:'Revenue',        value: `₹${data.payments.reduce((s,p)=>s+(p.amount||0),0)/100|0}`, color:'var(--accent)' },
    { label:'Pending Reviews',value: data.reviews.filter(r=>!r.approved).length, color:'var(--highlight)' },
  ]

  return (
    <div className="min-h-screen flex" style={{ background:'var(--bg)' }}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[var(--border)] fixed left-0 top-0 bottom-0 p-6"
        style={{ background:'rgba(8,8,18,0.95)', backdropFilter:'blur(20px)' }}>
        <Link to="/" className="flex items-center gap-2.5 mb-2">
          <Logo size={36}/>
          <span className="font-display font-bold text-base"><span style={{ color:'var(--primary)' }}>AP</span> Admin</span>
        </Link>
        <div className="text-xs text-[var(--accent)] font-semibold mb-8 px-1">Admin Panel</div>

        <nav className="flex-1 space-y-1">
          {NAV.map(n => (
            <button key={n.key} onClick={() => setTab(n.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${tab===n.key?'text-[var(--primary)]':'text-[var(--muted)] hover:text-white hover:bg-white/5'}`}
              style={tab===n.key?{background:'rgba(124,58,237,0.2)'}:{}}>
              {n.icon} {n.label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[var(--muted)] hover:text-white hover:bg-white/5 transition-all">
          <LogOut size={18}/> Log Out
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-64 p-6 md:p-10">
        <div className="mb-10">
          <h1 className="font-display font-bold text-3xl mb-1">Admin Dashboard</h1>
          <p className="text-[var(--muted)] text-sm">Manage all AP Developments activity</p>
        </div>

        {/* Overview */}
        {tab==='overview' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map(s => (
                <div key={s.label} className="rounded-2xl p-5 border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                  <div className="font-display font-bold text-2xl mb-1" style={{ color:s.color }}>{s.value}</div>
                  <div className="text-xs text-[var(--muted)]">{s.label}</div>
                </div>
              ))}
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-4">Recent Projects</h2>
              {data.projects.slice(0,5).map(p => (
                <div key={p._id} className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] mb-2" style={{ background:'var(--card-bg)' }}>
                  <span className="text-sm">{p.title}</span>
                  <select value={p.status} onChange={e=>updateStatus(p._id,e.target.value)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] bg-transparent text-[var(--muted)] focus:outline-none">
                    {STATUS_OPTS.map(o=><option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Users */}
        {tab==='users' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
            <h2 className="font-semibold text-xl mb-6">All Users ({data.users.length})</h2>
            <div className="space-y-3">
              {data.users.length===0 ? <p className="text-[var(--muted)]">No users found.</p> : data.users.map(u=>(
                <div key={u._id} className="flex items-center justify-between p-5 rounded-xl border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                  <div>
                    <div className="font-medium text-sm">{u.name}</div>
                    <div className="text-xs text-[var(--muted)]">{u.email}</div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-lg capitalize ${u.role==='admin'?'text-[var(--accent)]':'text-[var(--muted)]'}`}
                    style={{ background: u.role==='admin'?'rgba(249,115,22,0.12)':'rgba(255,255,255,0.05)' }}>
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Projects */}
        {tab==='projects' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
            <h2 className="font-semibold text-xl mb-6">All Projects ({data.projects.length})</h2>
            <div className="space-y-3">
              {data.projects.length===0 ? <p className="text-[var(--muted)]">No projects yet.</p> : data.projects.map(p=>(
                <div key={p._id} className="p-5 rounded-xl border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-1">{p.title}</div>
                      <div className="text-xs text-[var(--muted)]">{p.service} • {p.budget}</div>
                    </div>
                    <select value={p.status} onChange={e=>updateStatus(p._id,e.target.value)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--primary)]"
                      style={{ background:'#0F0F1A', color:'var(--text)' }}>
                      {STATUS_OPTS.map(o=><option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reviews */}
        {tab==='reviews' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
            <h2 className="font-semibold text-xl mb-6">Reviews ({data.reviews.length})</h2>
            <div className="space-y-3">
              {data.reviews.length===0 ? <p className="text-[var(--muted)]">No reviews yet.</p> : data.reviews.map(r=>(
                <div key={r._id} className="p-5 rounded-xl border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-medium text-sm mb-1">{r.userId?.name || 'Anonymous'}</div>
                      <p className="text-xs text-[var(--muted)]">"{r.comment}"</p>
                    </div>
                    {!r.approved && (
                      <button onClick={()=>approveReview(r._id)}
                        className="text-xs px-3 py-1.5 rounded-lg font-medium shrink-0"
                        style={{ background:'rgba(163,230,53,0.15)', color:'var(--highlight)', border:'1px solid rgba(163,230,53,0.25)' }}>
                        Approve
                      </button>
                    )}
                    {r.approved && (
                      <span className="text-xs px-3 py-1.5 rounded-lg" style={{ background:'rgba(163,230,53,0.1)', color:'var(--highlight)' }}>
                        ✓ Live
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages */}
        {tab==='messages' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
            <h2 className="font-semibold text-xl mb-6">Contact Messages ({data.messages.length})</h2>
            <div className="space-y-3">
              {data.messages.length===0 ? <p className="text-[var(--muted)]">No messages yet.</p> : data.messages.map(m=>(
                <div key={m._id} className="p-5 rounded-xl border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-sm">{m.name}</span>
                    <span className="text-xs text-[var(--muted)]">{m.email}</span>
                  </div>
                  <p className="text-xs text-[var(--muted)] mb-2">{m.message}</p>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 rounded-lg border border-[var(--border)] text-[var(--muted)]">{m.service}</span>
                    <span className="px-2 py-1 rounded-lg border border-[var(--border)] text-[var(--muted)]">{m.budget}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Payments / Bookings fallback */}
        {['payments','bookings'].includes(tab) && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
            <h2 className="font-semibold text-xl mb-6 capitalize">{tab} ({data[tab]?.length||0})</h2>
            {(data[tab]||[]).length===0 ? <p className="text-[var(--muted)]">No {tab} yet.</p> :
              data[tab].map(item=>(
                <div key={item._id} className="p-5 rounded-xl border border-[var(--border)] mb-3 text-sm" style={{ background:'var(--card-bg)' }}>
                  <pre className="text-[var(--muted)] text-xs overflow-auto">{JSON.stringify(item,null,2)}</pre>
                </div>
              ))
            }
          </motion.div>
        )}
      </main>
    </div>
  )
}

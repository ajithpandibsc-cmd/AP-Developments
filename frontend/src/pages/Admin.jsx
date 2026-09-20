import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users, FolderOpen, Calendar, CreditCard, Star, MessageSquare,
  Settings, LogOut, Briefcase, Plus, Trash2, ExternalLink, Image as ImageIcon, Sparkles
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import api from '../services/api'
import toast from 'react-hot-toast'

const NAV = [
  { key:'overview',   icon:<Settings size={18}/>,      label:'Overview'           },
  { key:'portfolio',  icon:<Briefcase size={18}/>,     label:'Portfolio Showcase' },
  { key:'projects',   icon:<FolderOpen size={18}/>,    label:'Client Requests'    },
  { key:'users',      icon:<Users size={18}/>,         label:'Users'              },
  { key:'bookings',   icon:<Calendar size={18}/>,      label:'Bookings'           },
  { key:'payments',   icon:<CreditCard size={18}/>,    label:'Payments'           },
  { key:'reviews',    icon:<Star size={18}/>,          label:'Reviews'            },
  { key:'messages',   icon:<MessageSquare size={18}/>, label:'Contact Msgs'       },
]

const STATUS_OPTS = ['Requested','Planning','In Progress','Review','Completed']
const CATEGORY_OPTS = ['Web', 'Content', 'Video', 'Design', 'Fullstack', 'App', 'AI']

export default function Admin() {
  const [tab, setTab] = useState('overview')
  const [data, setData] = useState({
    users: [],
    projects: [],
    bookings: [],
    payments: [],
    reviews: [],
    messages: [],
    portfolio: []
  })
  const [loading, setLoading] = useState(true)
  const { logout } = useAuth()
  const navigate = useNavigate()

  // Portfolio Form State
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    category: 'Web',
    description: '',
    image: '',
    link: '',
    technologies: '',
    result: ''
  })
  const [submittingPortfolio, setSubmittingPortfolio] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const [u, p, b, pay, r, m, port] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/projects'),
        api.get('/admin/bookings'),
        api.get('/admin/payments'),
        api.get('/admin/reviews'),
        api.get('/admin/messages'),
        api.get('/portfolio'),
      ])
      setData({
        users: u.data.users || [],
        projects: p.data.projects || [],
        bookings: b.data.bookings || [],
        payments: pay.data.payments || [],
        reviews: r.data.reviews || [],
        messages: m.data.messages || [],
        portfolio: port.data.projects || []
      })
    } catch {
      /* fallback empty states */
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  // Update client project status
  const updateStatus = async (projectId, status) => {
    try {
      await api.put(`/admin/projects/${projectId}/status`, { status })
      toast.success('Status updated')
      load()
    } catch { toast.error('Failed to update status') }
  }

  // Approve review
  const approveReview = async (reviewId) => {
    try {
      await api.put(`/admin/reviews/${reviewId}/approve`)
      toast.success('Review approved')
      load()
    } catch { toast.error('Failed to approve review') }
  }

  // Add new portfolio project
  const handleAddPortfolio = async (e) => {
    e.preventDefault()
    if (!portfolioForm.title.trim() || !portfolioForm.category.trim() || !portfolioForm.description.trim()) {
      return toast.error('Please fill in Project Title, Category, and Description')
    }

    setSubmittingPortfolio(true)
    try {
      await api.post('/portfolio', portfolioForm)
      toast.success('Project added to showcase portfolio!')
      setPortfolioForm({
        title: '',
        category: 'Web',
        description: '',
        image: '',
        link: '',
        technologies: '',
        result: ''
      })
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add project')
    } finally {
      setSubmittingPortfolio(false)
    }
  }

  // Delete portfolio project
  const handleDeletePortfolio = async (id, title) => {
    if (!window.confirm(`Are you sure you want to remove "${title}" from the portfolio?`)) return

    try {
      await api.delete(`/portfolio/${id}`)
      toast.success('Project removed from portfolio')
      load()
    } catch (err) {
      toast.error('Failed to delete project')
    }
  }

  const handleLogout = () => { logout(); navigate('/') }

  const STATS = [
    { label:'Showcase Projects', value: data.portfolio.length, color:'var(--primary)' },
    { label:'Client Requests',   value: data.projects.length,  color:'var(--secondary)' },
    { label:'Total Users',       value: data.users.length,     color:'var(--accent)' },
    { label:'Revenue',           value: `₹${data.payments.reduce((s,p)=>s+(p.amount||0),0)/100|0}`, color:'var(--highlight)' },
  ]

  return (
    <div className="min-h-screen flex" style={{ background:'var(--bg)' }}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[var(--border)] fixed left-0 top-0 bottom-0 p-6 z-20"
        style={{ background:'rgba(8,8,18,0.95)', backdropFilter:'blur(20px)' }}>
        <Link to="/" className="flex items-center gap-2.5 mb-2">
          <Logo size={36}/>
          <span className="font-display font-bold text-base"><span style={{ color:'var(--primary)' }}>AP</span> Admin</span>
        </Link>
        <div className="text-xs text-[var(--accent)] font-semibold mb-8 px-1">Control Panel</div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
          {NAV.map(n => (
            <button key={n.key} onClick={() => setTab(n.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                tab === n.key
                  ? 'text-white border border-orange-500/40 shadow-lg shadow-orange-500/10'
                  : 'text-[var(--muted)] hover:text-white hover:bg-white/5 border border-transparent'
              }`}
              style={tab === n.key ? { background: 'linear-gradient(135deg, rgba(255,94,0,0.25), rgba(255,184,0,0.1))' } : {}}>
              {n.icon} {n.label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[var(--muted)] hover:text-white hover:bg-white/5 transition-all mt-4 border border-white/5">
          <LogOut size={18}/> Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl mb-1 text-white">Admin Dashboard</h1>
            <p className="text-[var(--muted)] text-sm">Manage showcase projects, client bookings, and system data</p>
          </div>
          <Link
            to="/projects"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
          >
            <span>Live Projects Page</span>
            <ExternalLink size={14} />
          </Link>
        </div>

        {/* OVERVIEW TAB */}
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

            {/* Quick Actions / Highlights */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[#111116]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg text-white">Portfolio Showcase ({data.portfolio.length})</h2>
                  <button onClick={() => setTab('portfolio')} className="text-xs text-orange-400 hover:underline">
                    Manage Portfolio →
                  </button>
                </div>
                <div className="space-y-3">
                  {data.portfolio.slice(0, 4).map(p => (
                    <div key={p._id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3 min-w-0">
                        {p.image ? (
                          <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold shrink-0">
                            {p.title.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-white truncate">{p.title}</div>
                          <div className="text-xs text-orange-400/80">{p.category}</div>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#A1A1AA] bg-white/5 px-2 py-0.5 rounded">
                        {p.technologies?.length || 0} techs
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[#111116]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg text-white">Recent Client Requests</h2>
                  <button onClick={() => setTab('projects')} className="text-xs text-orange-400 hover:underline">
                    View All →
                  </button>
                </div>
                <div className="space-y-3">
                  {data.projects.slice(0, 4).map(p => (
                    <div key={p._id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div>
                        <div className="text-sm font-medium text-white">{p.title}</div>
                        <div className="text-xs text-[#A1A1AA]">{p.service} • {p.budget}</div>
                      </div>
                      <select
                        value={p.status}
                        onChange={e => updateStatus(p._id, e.target.value)}
                        className="text-xs px-2.5 py-1 rounded-lg border border-[var(--border)] bg-black/40 text-orange-400 focus:outline-none"
                      >
                        {STATUS_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  {data.projects.length === 0 && (
                    <p className="text-xs text-[#71717A]">No client requests yet.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PORTFOLIO MANAGEMENT TAB */}
        {tab==='portfolio' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="space-y-10">
            {/* Header / Intro */}
            <div>
              <h2 className="font-semibold text-2xl text-white mb-2">Portfolio Project Management</h2>
              <p className="text-sm text-[#A1A1AA]">
                Add, organize, and manage portfolio projects featured on the public Projects showcase page.
              </p>
            </div>

            {/* Add Project Form Card */}
            <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-[#111116] shadow-xl relative overflow-hidden">
              <div className="orb w-48 h-48 bg-orange-500/10 right-0 top-0 pointer-events-none" />
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={18} className="text-orange-400" />
                <h3 className="font-display font-bold text-lg text-white">Add New Showcase Project</h3>
              </div>

              <form onSubmit={handleAddPortfolio} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">Project Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AI-Powered SaaS Analytics"
                      value={portfolioForm.title}
                      onChange={e => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white text-sm placeholder-[#71717A] focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">Category *</label>
                    <select
                      value={portfolioForm.category}
                      onChange={e => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#16161F] text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                    >
                      {CATEGORY_OPTS.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">Description *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Brief overview of features, impact, client goals, and deliverables..."
                    value={portfolioForm.description}
                    onChange={e => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white text-sm placeholder-[#71717A] focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Project Image */}
                  <div>
                    <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">Project Image (URL)</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/... or image link"
                      value={portfolioForm.image}
                      onChange={e => setPortfolioForm({ ...portfolioForm, image: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white text-sm placeholder-[#71717A] focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {/* Project Link */}
                  <div>
                    <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">Project Link (Live Website / Demo)</label>
                    <input
                      type="url"
                      placeholder="https://client-domain.com"
                      value={portfolioForm.link}
                      onChange={e => setPortfolioForm({ ...portfolioForm, link: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white text-sm placeholder-[#71717A] focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-xs font-semibold text-[#D4D4D8] mb-1.5">
                    Technologies Used (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="React, Node.js, MongoDB, Tailwind CSS, Stripe"
                    value={portfolioForm.technologies}
                    onChange={e => setPortfolioForm({ ...portfolioForm, technologies: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white text-sm placeholder-[#71717A] focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <p className="text-[11px] text-[#71717A] mt-1">
                    Separate tech stack items with commas (e.g. Next.js, Express, Docker).
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submittingPortfolio}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#FF5E00] to-[#FF8A00] hover:from-[#FF8A00] hover:to-[#FFB800] shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50"
                  >
                    <Plus size={16} />
                    <span>{submittingPortfolio ? 'Adding Project...' : 'Add Project'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List of Existing Portfolio Items */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-white">
                  Active Showcase Projects ({data.portfolio.length})
                </h3>
                <span className="text-xs text-[#A1A1AA]">These items are displayed publicly on /projects</span>
              </div>

              <div className="space-y-4">
                {data.portfolio.length === 0 ? (
                  <p className="text-sm text-[#71717A]">No portfolio projects yet. Use the form above to add your first project.</p>
                ) : (
                  data.portfolio.map((p) => (
                    <div
                      key={p._id}
                      className="p-5 rounded-2xl border border-white/10 bg-[#111116] flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:border-orange-500/30 transition-all"
                    >
                      {/* Left side preview */}
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-20 h-16 rounded-xl object-cover border border-white/10 shrink-0 bg-black"
                          />
                        ) : (
                          <div className="w-20 h-16 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xl shrink-0">
                            {p.title.charAt(0)}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-semibold text-base text-white truncate">{p.title}</span>
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-medium">
                              {p.category}
                            </span>
                          </div>

                          <p className="text-xs text-[#A1A1AA] line-clamp-2 mb-2 leading-relaxed">
                            {p.description}
                          </p>

                          {/* Tech Pills */}
                          {p.technologies && p.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {p.technologies.map((t, idx) => (
                                <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-[#D4D4D8]">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right side actions */}
                      <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#D4D4D8] hover:text-white transition-colors"
                            title="Open Project Link"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}

                        <button
                          onClick={() => handleDeletePortfolio(p._id, p.title)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* CLIENT REQUESTS / PROJECTS TAB */}
        {tab==='projects' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
            <h2 className="font-semibold text-xl mb-6 text-white">Client Project Requests ({data.projects.length})</h2>
            <div className="space-y-3">
              {data.projects.length===0 ? <p className="text-[var(--muted)]">No client project requests yet.</p> : data.projects.map(p=>(
                <div key={p._id} className="p-5 rounded-xl border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-1 text-white">{p.title}</div>
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

        {/* USERS TAB */}
        {tab==='users' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
            <h2 className="font-semibold text-xl mb-6 text-white">All Users ({data.users.length})</h2>
            <div className="space-y-3">
              {data.users.length===0 ? <p className="text-[var(--muted)]">No users found.</p> : data.users.map(u=>(
                <div key={u._id} className="flex items-center justify-between p-5 rounded-xl border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                  <div>
                    <div className="font-medium text-sm text-white">{u.name}</div>
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

        {/* REVIEWS TAB */}
        {tab==='reviews' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
            <h2 className="font-semibold text-xl mb-6 text-white">Reviews ({data.reviews.length})</h2>
            <div className="space-y-3">
              {data.reviews.length===0 ? <p className="text-[var(--muted)]">No reviews yet.</p> : data.reviews.map(r=>(
                <div key={r._id} className="p-5 rounded-xl border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-medium text-sm mb-1 text-white">{r.userId?.name || 'Anonymous'}</div>
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

        {/* MESSAGES TAB */}
        {tab==='messages' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
            <h2 className="font-semibold text-xl mb-6 text-white">Contact Messages ({data.messages.length})</h2>
            <div className="space-y-3">
              {data.messages.length===0 ? <p className="text-[var(--muted)]">No messages yet.</p> : data.messages.map(m=>(
                <div key={m._id} className="p-5 rounded-xl border border-[var(--border)]" style={{ background:'var(--card-bg)' }}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-sm text-white">{m.name}</span>
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

        {/* PAYMENTS / BOOKINGS FALLBACK */}
        {['payments','bookings'].includes(tab) && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
            <h2 className="font-semibold text-xl mb-6 capitalize text-white">{tab} ({data[tab]?.length||0})</h2>
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

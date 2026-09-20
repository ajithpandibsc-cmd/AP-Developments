import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FolderOpen, Calendar, CreditCard,
  MessageSquare, User, LogOut, ChevronRight, Clock,
  CheckCircle2, AlertCircle, Play, Eye, Menu, X,
  TrendingUp, Plus,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import api from '../services/api'
import toast from 'react-hot-toast'

/* ── Status badge config ─────────────────────────────────── */
const STATUS_CFG = {
  Requested:    { color: '#94A3B8', bg: 'rgba(148,163,184,0.12)', icon: <Clock size={12}/>        },
  Planning:     { color: '#A78BFA', bg: 'rgba(167,139,250,0.12)', icon: <Eye size={12}/>          },
  'In Progress':{ color: '#38BDF8', bg: 'rgba(56,189,248,0.12)',  icon: <Play size={12}/>         },
  Review:       { color: '#FB923C', bg: 'rgba(251,146,60,0.12)',  icon: <AlertCircle size={12}/>  },
  Completed:    { color: '#4ADE80', bg: 'rgba(74,222,128,0.12)',  icon: <CheckCircle2 size={12}/> },
}

/* ── Sidebar nav items ───────────────────────────────────── */
const NAV_ITEMS = [
  { key: 'overview',  icon: <LayoutDashboard size={18}/>, label: 'Overview'    },
  { key: 'projects',  icon: <FolderOpen size={18}/>,      label: 'My Projects' },
  { key: 'bookings',  icon: <Calendar size={18}/>,        label: 'Bookings'    },
  { key: 'payments',  icon: <CreditCard size={18}/>,      label: 'Payments'    },
  { key: 'messages',  icon: <MessageSquare size={18}/>,   label: 'Messages'    },
  { key: 'profile',   icon: <User size={18}/>,            label: 'Profile'     },
]

/* ── Fade-in variant ─────────────────────────────────────── */
const fadeIn = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 } }

/* ════════════════════════════════════════════════════════════
   SIDEBAR
════════════════════════════════════════════════════════════ */
function Sidebar({ tab, setTab, onLogout, mobile, onClose }) {
  return (
    <aside className={`db-sidebar${mobile ? ' db-sidebar--mobile' : ''}`}>
      {/* Logo */}
      <div className="db-sidebar__header">
        <Link to="/" className="db-sidebar__logo" onClick={mobile ? onClose : undefined}>
          <Logo size={34} />
          <span className="db-sidebar__logo-text">
            <span style={{ color: 'var(--primary)' }}>AP</span> Dev
          </span>
        </Link>
        {mobile && (
          <button className="db-sidebar__close" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="db-sidebar__nav" aria-label="Dashboard navigation">
        <p className="db-sidebar__nav-label">MAIN MENU</p>
        {NAV_ITEMS.map(n => (
          <button
            key={n.key}
            onClick={() => { setTab(n.key); if (mobile) onClose() }}
            className={`db-nav-item${tab === n.key ? ' db-nav-item--active' : ''}`}
            aria-current={tab === n.key ? 'page' : undefined}
          >
            <span className="db-nav-item__icon">{n.icon}</span>
            <span className="db-nav-item__label">{n.label}</span>
            {tab === n.key && <ChevronRight size={14} className="db-nav-item__arrow" />}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="db-sidebar__footer">
        <button onClick={onLogout} className="db-nav-item db-nav-item--logout">
          <span className="db-nav-item__icon"><LogOut size={18}/></span>
          <span className="db-nav-item__label">Log Out</span>
        </button>
      </div>
    </aside>
  )
}

/* ════════════════════════════════════════════════════════════
   STAT CARD
════════════════════════════════════════════════════════════ */
function StatCard({ label, value, color, icon, sub }) {
  return (
    <div className="db-stat-card">
      <div className="db-stat-card__top">
        <div className="db-stat-card__icon" style={{ background: `${color}18`, color }}>
          {icon}
        </div>
        <TrendingUp size={14} style={{ color: 'var(--muted)', opacity: 0.5 }} />
      </div>
      <div className="db-stat-card__value" style={{ color }}>{value}</div>
      <div className="db-stat-card__label">{label}</div>
      {sub && <div className="db-stat-card__sub">{sub}</div>}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   STATUS BADGE
════════════════════════════════════════════════════════════ */
function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || STATUS_CFG.Requested
  return (
    <span className="db-status-badge" style={{ background: cfg.bg, color: cfg.color }}>
      {cfg.icon} {status}
    </span>
  )
}

/* ════════════════════════════════════════════════════════════
   EMPTY STATE
════════════════════════════════════════════════════════════ */
function EmptyState({ emoji, message, linkTo, linkLabel }) {
  return (
    <div className="db-empty">
      <div className="db-empty__emoji">{emoji}</div>
      <p className="db-empty__msg">{message}</p>
      {linkTo && (
        <Link to={linkTo} className="db-empty__link">{linkLabel} →</Link>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   SECTION HEADER
════════════════════════════════════════════════════════════ */
function SectionHeader({ title, action }) {
  return (
    <div className="db-section-header">
      <h2 className="db-section-title">{title}</h2>
      {action}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const [tab, setTab]           = useState('overview')
  const [projects, setProjects] = useState([])
  const [bookings, setBookings] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading]   = useState(true)
  const [sideOpen, setSideOpen] = useState(false)

  const { user, logout } = useAuth()
  const navigate         = useNavigate()

  useEffect(() => {
    Promise.all([
      api.get('/projects/mine').catch(() => ({ data: { projects: [] } })),
      api.get('/bookings/mine').catch(()  => ({ data: { bookings: [] } })),
      api.get('/payments/mine').catch(()  => ({ data: { payments: [] } })),
    ]).then(([p, b, pay]) => {
      setProjects(p.data.projects   || [])
      setBookings(b.data.bookings   || [])
      setPayments(pay.data.payments || [])
    }).finally(() => setLoading(false))
  }, [])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  const totalPaid = payments.reduce((s, p) => s + (p.amount || 0), 0)

  return (
    <div className="db-root">

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {sideOpen && (
          <motion.div
            className="db-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSideOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Desktop sidebar ── */}
      <Sidebar tab={tab} setTab={setTab} onLogout={handleLogout} />

      {/* ── Mobile sidebar (drawer) ── */}
      <AnimatePresence>
        {sideOpen && (
          <motion.div
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 60 }}
          >
            <Sidebar tab={tab} setTab={setTab} onLogout={handleLogout} mobile onClose={() => setSideOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <main className="db-main">

        {/* Top bar */}
        <header className="db-topbar">
          <div className="db-topbar__left">
            <button
              className="db-topbar__hamburger"
              onClick={() => setSideOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="db-topbar__title">
                Welcome back, <span style={{ color: 'var(--primary)' }}>{user?.name?.split(' ')[0]}</span>
              </h1>
              <p className="db-topbar__sub">Manage your projects, bookings, and payments</p>
            </div>
          </div>
          <Link to="/project-planner" className="db-topbar__cta">
            <Plus size={16} /> New Project
          </Link>
        </header>

        {/* Page content */}
        <div className="db-content">
          <AnimatePresence mode="wait">

            {/* ─── OVERVIEW ─────────────────────────────────────── */}
            {tab === 'overview' && (
              <motion.div key="overview" {...fadeIn} className="db-tab">

                {/* Stats grid */}
                <div className="db-stats-grid">
                  <StatCard
                    label="Total Projects" value={projects.length}
                    color="var(--primary)"   icon={<FolderOpen size={18}/>}
                    sub={`${projects.filter(p => p.status === 'In Progress').length} active`}
                  />
                  <StatCard
                    label="Active Bookings" value={bookings.filter(b => b.status !== 'Completed').length}
                    color="var(--secondary)" icon={<Calendar size={18}/>}
                  />
                  <StatCard
                    label="Total Paid" value={`₹${(totalPaid / 100).toLocaleString('en-IN')}`}
                    color="var(--highlight)" icon={<CreditCard size={18}/>}
                    sub="Across all payments"
                  />
                  <StatCard
                    label="Completed" value={projects.filter(p => p.status === 'Completed').length}
                    color="#A78BFA"          icon={<CheckCircle2 size={18}/>}
                  />
                </div>

                {/* Recent projects */}
                <div className="db-card">
                  <SectionHeader
                    title="Recent Projects"
                    action={
                      <button onClick={() => setTab('projects')} className="db-link-btn">
                        View all <ChevronRight size={14}/>
                      </button>
                    }
                  />
                  {loading ? (
                    <div className="db-loading">Loading projects…</div>
                  ) : projects.length === 0 ? (
                    <EmptyState emoji="📂" message="No projects yet." linkTo="/project-planner" linkLabel="Start your first project" />
                  ) : (
                    <div className="db-list">
                      {projects.slice(0, 5).map(p => (
                        <div key={p._id} className="db-list-row">
                          <div className="db-list-row__info">
                            <span className="db-list-row__title">{p.title}</span>
                            <span className="db-list-row__sub">{p.service}</span>
                          </div>
                          <StatusBadge status={p.status} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent bookings */}
                <div className="db-card">
                  <SectionHeader
                    title="Recent Bookings"
                    action={
                      <button onClick={() => setTab('bookings')} className="db-link-btn">
                        View all <ChevronRight size={14}/>
                      </button>
                    }
                  />
                  {bookings.length === 0 ? (
                    <EmptyState emoji="📅" message="No bookings yet." />
                  ) : (
                    <div className="db-list">
                      {bookings.slice(0, 4).map(b => (
                        <div key={b._id} className="db-list-row">
                          <div className="db-list-row__info">
                            <span className="db-list-row__title">{b.service}</span>
                            <span className="db-list-row__sub">{b.packageName} · {new Date(b.bookingDate).toLocaleDateString('en-IN')}</span>
                          </div>
                          <StatusBadge status={b.status} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ─── PROJECTS ─────────────────────────────────────── */}
            {tab === 'projects' && (
              <motion.div key="projects" {...fadeIn} className="db-tab">
                <SectionHeader title="My Projects" />
                {loading ? (
                  <div className="db-loading">Loading projects…</div>
                ) : projects.length === 0 ? (
                  <div className="db-card">
                    <EmptyState emoji="📂" message="No projects found." linkTo="/project-planner" linkLabel="Plan a new project" />
                  </div>
                ) : (
                  <div className="db-project-grid">
                    {projects.map(p => {
                      const cfg = STATUS_CFG[p.status] || STATUS_CFG.Requested
                      return (
                        <div key={p._id} className="db-project-card">
                          <div className="db-project-card__top">
                            <div className="db-project-card__service-dot" style={{ background: cfg.color }} />
                            <span className="db-project-card__service">{p.service}</span>
                            <StatusBadge status={p.status} />
                          </div>
                          <h3 className="db-project-card__title">{p.title}</h3>
                          {p.description && (
                            <p className="db-project-card__desc">{p.description}</p>
                          )}
                          <div className="db-project-card__tags">
                            {p.budget && <span className="db-tag">Budget: {p.budget}</span>}
                            {p.timeline && <span className="db-tag">{p.timeline}</span>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* ─── BOOKINGS ─────────────────────────────────────── */}
            {tab === 'bookings' && (
              <motion.div key="bookings" {...fadeIn} className="db-tab">
                <SectionHeader title="My Bookings" />
                {bookings.length === 0 ? (
                  <div className="db-card">
                    <EmptyState emoji="📅" message="No bookings yet." linkTo="/project-planner" linkLabel="Book a service" />
                  </div>
                ) : (
                  <div className="db-card">
                    <div className="db-list">
                      {bookings.map(b => (
                        <div key={b._id} className="db-list-row db-list-row--lg">
                          <div className="db-list-row__info">
                            <span className="db-list-row__title">{b.service}</span>
                            <span className="db-list-row__sub">
                              {b.packageName} · Booked on {new Date(b.bookingDate).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                          <div className="db-list-row__right">
                            {b.amount > 0 && (
                              <span className="db-list-row__amount">₹{(b.amount / 100).toLocaleString('en-IN')}</span>
                            )}
                            <StatusBadge status={b.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ─── PAYMENTS ─────────────────────────────────────── */}
            {tab === 'payments' && (
              <motion.div key="payments" {...fadeIn} className="db-tab">
                <SectionHeader title="Payment History" />
                {payments.length === 0 ? (
                  <div className="db-card">
                    <EmptyState emoji="💳" message="No payments yet." />
                  </div>
                ) : (
                  <div className="db-card">
                    <div className="db-list">
                      {payments.map(p => (
                        <div key={p._id} className="db-list-row db-list-row--lg">
                          <div className="db-list-row__info">
                            <span className="db-list-row__title">
                              Payment #{p.paymentId ? p.paymentId.slice(-8) : p._id?.slice(-8)}
                            </span>
                            <span className="db-list-row__sub">
                              {new Date(p.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                            </span>
                          </div>
                          <div className="db-list-row__right">
                            <span className="db-list-row__amount" style={{ color: 'var(--highlight)' }}>
                              ₹{(p.amount / 100).toLocaleString('en-IN')}
                            </span>
                            <span className="db-status-badge" style={{
                              background: p.status === 'captured' ? 'rgba(74,222,128,0.12)' : 'rgba(251,146,60,0.12)',
                              color:      p.status === 'captured' ? '#4ADE80'               : '#FB923C',
                            }}>
                              {p.status === 'captured' ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                              {p.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Summary row */}
                    <div className="db-payments-total">
                      <span className="db-payments-total__label">Total Paid</span>
                      <span className="db-payments-total__value" style={{ color: 'var(--highlight)' }}>
                        ₹{(totalPaid / 100).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ─── MESSAGES ─────────────────────────────────────── */}
            {tab === 'messages' && (
              <motion.div key="messages" {...fadeIn} className="db-tab">
                <SectionHeader title="Messages" />
                <div className="db-card">
                  <EmptyState emoji="💬" message="No messages yet. We'll reach out here once your project begins." />
                </div>
              </motion.div>
            )}

            {/* ─── PROFILE ──────────────────────────────────────── */}
            {tab === 'profile' && (
              <motion.div key="profile" {...fadeIn} className="db-tab">
                <SectionHeader title="My Profile" />
                <div className="db-profile-grid">
                  {/* Avatar card */}
                  <div className="db-card db-profile-avatar-card">
                    <div className="db-avatar">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="db-profile-avatar-card__name">{user?.name}</div>
                    <div className="db-profile-avatar-card__email">{user?.email}</div>
                    <span className="db-role-badge">{user?.role}</span>
                  </div>

                  {/* Details card */}
                  <div className="db-card db-profile-details-card">
                    <h3 className="db-card-subtitle">Account Details</h3>
                    <div className="db-profile-rows">
                      {[
                        ['Full Name',     user?.name],
                        ['Email',         user?.email],
                        ['Phone',         user?.phone || '—'],
                        ['Role',          user?.role],
                        ['Member Since',  user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month:'long', year:'numeric' }) : '—'],
                      ].map(([label, value]) => (
                        <div key={label} className="db-profile-row">
                          <span className="db-profile-row__label">{label}</span>
                          <span className="db-profile-row__value">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

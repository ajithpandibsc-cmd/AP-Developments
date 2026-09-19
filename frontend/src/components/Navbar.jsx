import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'

const NAV_LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/services',  label: 'Services' },
  { to: '/projects',  label: 'Projects' },
  { to: '/reviews',   label: 'Reviews' },
  { to: '/about',     label: 'About' },
  { to: '/contact',   label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { user, logout }        = useAuth()
  const navigate                = useNavigate()
  const navRef                  = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'shadow-lg shadow-black/50 py-3 border-b border-[var(--primary)]/20' : 'bg-transparent py-5'
        }`}
        style={scrolled ? { background: 'rgba(10, 10, 12, 0.85)', backdropFilter: 'blur(16px)' } : {}}
      >
        <nav className="container flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="AP Developments Home">
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(124,58,237,0.7)]">
              <Logo size={38} />
            </div>
            <span
              className="font-display font-bold text-lg tracking-tight hidden sm:block"
              style={{ color: 'var(--text)' }}
            >
              <span style={{ color: 'var(--primary)' }}>AP</span> Developments
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-6" role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `nav-link px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'active text-white' : 'text-[var(--muted)] hover:text-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-[var(--muted)] hover:text-white transition-colors px-3 py-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-white hover:border-[var(--primary)] transition-all"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-[var(--muted)] hover:text-white transition-colors px-3 py-2"
              >
                Login
              </Link>
            )}
            <Link
              to="/project-planner"
              className="flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                boxShadow: '0 0 20px rgba(124,58,237,0.35)',
              }}
              id="nav-start-project"
            >
              Start a Project <ChevronRight size={15} />
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-white hover:border-[var(--primary)] transition-all"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="glass fixed top-[68px] left-3 right-3 z-40 rounded-2xl p-6 shadow-2xl shadow-black/50 lg:hidden"
          >
            <ul className="flex flex-col gap-2" role="list">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[var(--primary)]/20 text-white'
                          : 'text-[var(--muted)] hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 border-t border-[var(--border)] pt-5">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-center border border-[var(--border)] text-[var(--muted)] hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setOpen(false) }}
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-center border border-[var(--border)] text-[var(--muted)] hover:text-white transition-colors"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-center border border-[var(--border)] text-[var(--muted)] hover:text-white transition-colors"
                >
                  Login
                </Link>
              )}
              <Link
                to="/project-planner"
                onClick={() => setOpen(false)}
                className="block py-3.5 rounded-xl text-sm font-semibold text-center text-white"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { Link } from 'react-router-dom'
import Logo from './Logo'
import { Mail, MapPin, Phone } from 'lucide-react'

// Simple SVG social icons (lucide-react doesn't include brand icons)
const SocialIcons = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  ),
}

const SERVICES = [
  { label: 'Web Development', to: '/services#web' },
  { label: 'Content Creation', to: '/services#content' },
  { label: 'Video Editing',    to: '/services#video' },
  { label: 'Graphic Design',   to: '/services#design' },
]

const PAGES = [
  { label: 'Projects',  to: '/projects' },
  { label: 'Reviews',   to: '/reviews' },
  { label: 'About',     to: '/about' },
  { label: 'Contact',   to: '/contact' },
  { label: 'AI Planner',to: '/project-planner' },
]

const SOCIALS = [
  { icon: <SocialIcons.Instagram />, href: '#', label: 'Instagram' },
  { icon: <SocialIcons.Twitter />,   href: '#', label: 'Twitter'   },
  { icon: <SocialIcons.LinkedIn />,  href: '#', label: 'LinkedIn'  },
  { icon: <SocialIcons.GitHub />,    href: '#', label: 'GitHub'    },
]

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 overflow-hidden border-t border-[var(--border)]">
      {/* BG glow */}
      <div className="orb w-96 h-96 bg-[var(--primary)] left-0 bottom-0 opacity-10" />

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <Logo size={40} />
              <span className="font-display font-bold text-lg">
                <span style={{ color: 'var(--primary)' }}>AP</span> Developments
              </span>
            </Link>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">
              Web development, content, video editing and graphic design — brought together under one creative digital studio.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-white hover:border-[var(--primary)] transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-5" style={{ color: 'var(--primary)' }}>
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-[var(--muted)] hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-5" style={{ color: 'var(--secondary)' }}>
              Navigate
            </h4>
            <ul className="space-y-3">
              {PAGES.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-[var(--muted)] hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-5" style={{ color: 'var(--accent)' }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[var(--muted)]">
                <Mail size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--primary)' }} />
                <a href="mailto:ajithpandi24032005@gmail.com" className="hover:text-white transition-colors break-all">
                  ajithpandi24032005@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[var(--muted)]">
                <Phone size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--secondary)' }} />
                <a href="tel:+916369647192" className="hover:text-white transition-colors">
                  +91 63696 47192
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[var(--muted)]">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                <span className="leading-relaxed">Vellikuruchi, Vellikuruchi (P)<br/>Sivaganga – 630610<br/>Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border)]">
          <p className="text-[var(--muted)] text-xs">
            © {new Date().getFullYear()} AP Developments. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy','Terms of Service'].map(t => (
              <a key={t} href="#" className="text-xs text-[var(--muted)] hover:text-white transition-colors">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

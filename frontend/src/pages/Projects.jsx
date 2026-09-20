import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, PlusCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

// High quality fallback dataset
const DEFAULT_PROJECTS = [
  {
    _id: '1',
    title: 'Product Launch & Copywriting Campaign',
    category: 'Content',
    description: 'Comprehensive product launch strategy including landing page copy, social hooks, email sequences, and ad copy.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    link: 'https://example.com',
    technologies: ['Notion', 'SEO Strategy', 'Copywriting'],
    result: '₹4L revenue in first week'
  },
  {
    _id: '2',
    title: 'SaaS Analytics & Conversion Landing Page',
    category: 'Web',
    description: 'High-converting product landing page with animated metrics sections, interactive pricing, and Stripe integration.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    link: 'https://example.com',
    technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Stripe'],
    result: '18% conversion rate'
  },
  {
    _id: '3',
    title: 'E-Commerce Platform',
    category: 'Web',
    description: 'Full-stack shop with Razorpay checkout, admin panel & real-time inventory management.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80',
    link: 'https://example.com',
    technologies: ['React', 'Node.js', 'MongoDB', 'Razorpay'],
    result: '3× increase in online orders'
  },
  {
    _id: '4',
    title: 'Restaurant Website & Ordering',
    category: 'Web',
    description: 'Responsive multi-page site with online reservations, menu showcase, and Google Maps integration.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    link: 'https://example.com',
    technologies: ['React', 'Tailwind', 'Node.js'],
    result: '40% increase in walk-ins'
  },
  {
    _id: '5',
    title: 'Brand Identity & Visual System',
    category: 'Design',
    description: 'Complete visual identity for a wellness startup — logo marks, typography, and marketing design systems.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    link: 'https://example.com',
    technologies: ['Illustrator', 'Figma', 'Photoshop'],
    result: 'Unified cross-platform identity'
  },
  {
    _id: '6',
    title: 'YouTube Channel Cinematic Reels',
    category: 'Video',
    description: 'Short-form reel series with custom motion graphics, sound design, and professional color grading.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
    link: 'https://example.com',
    technologies: ['Premiere Pro', 'After Effects'],
    result: '2M+ total audience views'
  },
]

const DESIRED_ORDER = ['All', 'Content', 'Web', 'Design', 'Video']

export default function Projects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS)
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const { user } = useAuth()

  // Always reset scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  // Fetch projects from backend API
  useEffect(() => {
    let isMounted = true
    const fetchPortfolio = async () => {
      try {
        const res = await api.get('/portfolio')
        if (res.data?.projects && res.data.projects.length > 0 && isMounted) {
          setProjects(res.data.projects)
        }
      } catch (err) {
        console.warn('Using default showcase portfolio:', err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchPortfolio()
    return () => { isMounted = false }
  }, [])

  // Derive categories in exact requested order: All, Content, Web, Design, Video (+ any others)
  const presentCategories = [...new Set(projects.map(p => p.category).filter(Boolean))]
  const uniqueCategories = [
    'All',
    ...DESIRED_ORDER.filter(c => c !== 'All' && presentCategories.includes(c)),
    ...presentCategories.filter(c => !DESIRED_ORDER.includes(c))
  ]

  // Filter projects by active category tab
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase())

  return (
    <main className="projects-page">
      {/* Background Ambient Glows */}
      <div className="orb w-[500px] h-[500px] bg-[#FF5E00] right-[-100px] top-[10%] opacity-[0.08] pointer-events-none" />
      <div className="orb w-[450px] h-[450px] bg-[#FFB800] left-[-100px] top-[40%] opacity-[0.06] pointer-events-none" />
      <div className="orb w-[600px] h-[600px] bg-[#FF5E00] right-[20%] bottom-[-100px] opacity-[0.05] pointer-events-none" />

      {/* Main Centered Container */}
      <div className="projects-container">
        {/* Header Hero Section */}
        <section className="projects-hero">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center w-full"
          >
            {/* Badge */}
            <div className="projects-hero-badge">
              <Sparkles size={14} className="text-orange-400" />
              <span>Curated Portfolio</span>
            </div>

            {/* Heading */}
            <h1 className="projects-hero-title">
              Projects That <br />
              <span className="gradient-text">Deliver Real Results</span>
            </h1>

            {/* Subtitle */}
            <p className="projects-hero-desc">
              Explore our featured client websites, web applications, brand identities, and high-impact digital solutions built for growth.
            </p>

            {/* Admin shortcut if logged in as admin */}
            {user?.role === 'admin' && (
              <div className="mt-5">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/30 hover:bg-orange-500/30 transition-colors"
                >
                  <PlusCircle size={15} />
                  <span>Admin: Manage / Add Projects</span>
                </Link>
              </div>
            )}
          </motion.div>
        </section>

        {/* Category Filter Navigation Bar */}
        <section className="projects-filter-wrapper">
          <div
            className="projects-filter-bar"
            role="tablist"
            aria-label="Filter portfolio projects by category"
          >
            {uniqueCategories.map((cat) => {
              const isActive = activeCategory === cat
              const count = cat === 'All'
                ? projects.length
                : projects.filter(p => p.category?.toLowerCase() === cat.toLowerCase()).length

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  role="tab"
                  aria-selected={isActive}
                  className={`projects-filter-btn ${isActive ? 'active' : ''}`}
                >
                  {/* Active 3D glowing pill indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="category-active-indicator"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Button label */}
                  <span className="relative z-10">{cat}</span>

                  {/* Count badge */}
                  <span className="projects-filter-count">
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Projects Grid with Equal Spacing & Centered 3-Column Layout */}
        <section className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="projects-grid"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <div key={project._id || project.id || index} className="w-full h-full flex flex-col">
                    <ProjectCard project={project} index={index} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 px-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col items-center">
                  <p className="text-[#A1A1AA] text-base mb-4 text-center">
                    No projects found in this category.
                  </p>
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
                  >
                    View All Projects
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Bottom Call to Action Section */}
        <section className="max-w-4xl mx-auto mt-24 text-center">
          <div className="p-10 sm:p-14 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl relative overflow-hidden shadow-2xl flex flex-col items-center text-center">
            <div className="orb w-64 h-64 bg-orange-500/20 left-1/2 -top-20 -translate-x-1/2 pointer-events-none" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
              Have an Idea in Mind? Let's Build It.
            </h2>
            <p className="text-[#A1A1AA] text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed text-center">
              From concept to production, we deliver high-performance web applications and design that scale your business.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#FF5E00] to-[#FF8A00] hover:from-[#FF8A00] hover:to-[#FFB800] shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02]"
              >
                <span>Start Your Project</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-[#D4D4D8] border border-white/10 hover:border-white/20 hover:text-white bg-white/5 transition-all"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

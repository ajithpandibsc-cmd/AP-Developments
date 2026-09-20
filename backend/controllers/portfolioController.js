const Portfolio = require('../models/Portfolio')

// Initial seed projects to ensure portfolio is immediately rich if DB is empty
const SEED_PORTFOLIO = [
  {
    title: 'E-Commerce Platform',
    category: 'Web',
    description: 'Full-stack shop with Razorpay checkout, admin panel & real-time inventory management.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80',
    link: 'https://example.com',
    technologies: ['React', 'Node.js', 'MongoDB', 'Razorpay'],
    featured: true
  },
  {
    title: 'Restaurant Website & Ordering',
    category: 'Web',
    description: 'Responsive multi-page site with online table reservations, interactive menu, and Google Maps integration.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    link: 'https://example.com',
    technologies: ['React', 'Tailwind', 'Node.js', 'Express'],
    featured: true
  },
  {
    title: 'Brand Identity & Visual System',
    category: 'Design',
    description: 'Complete visual identity for a wellness startup — logo marks, dark/light palettes, typography, and social templates.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    link: 'https://example.com',
    technologies: ['Illustrator', 'Figma', 'Photoshop'],
    featured: false
  },
  {
    title: 'YouTube Channel Cinematic Reels',
    category: 'Video',
    description: 'Short-form reel series with custom motion graphics, sound design, and professional color grading.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
    link: 'https://example.com',
    technologies: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    featured: false
  },
  {
    title: 'Product Launch & Copywriting Campaign',
    category: 'Content',
    description: 'Comprehensive product launch strategy including landing page copy, social hooks, email sequences, and ad copy.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    link: 'https://example.com',
    technologies: ['Notion', 'SEO Strategy', 'Copywriting'],
    featured: false
  },
  {
    title: 'SaaS Analytics & Conversion Landing Page',
    category: 'Web',
    description: 'High-converting product landing page with animated metrics sections, interactive pricing, and Stripe integration.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    link: 'https://example.com',
    technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Stripe'],
    featured: true
  }
]

// @desc    Get all portfolio projects (Public)
// @route   GET /api/portfolio
exports.getPortfolios = async (req, res, next) => {
  try {
    let items = await Portfolio.find().sort({ createdAt: -1 })
    
    // Auto-seed if database collection is empty
    if (items.length === 0) {
      await Portfolio.insertMany(SEED_PORTFOLIO)
      items = await Portfolio.find().sort({ createdAt: -1 })
    }

    res.json({ success: true, count: items.length, projects: items })
  } catch (error) {
    next(error)
  }
}

// @desc    Create new portfolio project (Admin only)
// @route   POST /api/portfolio
exports.createPortfolio = async (req, res, next) => {
  try {
    const { title, category, description, image, link, github, technologies, featured } = req.body

    if (!title || !category || !description) {
      return res.status(400).json({ success: false, message: 'Title, category, and description are required' })
    }

    // Process technologies if sent as comma-separated string or array
    let techArray = []
    if (Array.isArray(technologies)) {
      techArray = technologies.map(t => String(t).trim()).filter(Boolean)
    } else if (typeof technologies === 'string') {
      techArray = technologies.split(',').map(t => t.trim()).filter(Boolean)
    }

    const portfolio = await Portfolio.create({
      title,
      category,
      description,
      image: image || '',
      link: link || '',
      github: github || '',
      technologies: techArray,
      featured: Boolean(featured)
    })

    res.status(201).json({ success: true, project: portfolio })
  } catch (error) {
    next(error)
  }
}

// @desc    Update portfolio project (Admin only)
// @route   PUT /api/portfolio/:id
exports.updatePortfolio = async (req, res, next) => {
  try {
    const { title, category, description, image, link, github, technologies, featured } = req.body

    let techArray = undefined
    if (Array.isArray(technologies)) {
      techArray = technologies.map(t => String(t).trim()).filter(Boolean)
    } else if (typeof technologies === 'string') {
      techArray = technologies.split(',').map(t => t.trim()).filter(Boolean)
    }

    const updateData = {
      ...(title && { title }),
      ...(category && { category }),
      ...(description && { description }),
      ...(image !== undefined && { image }),
      ...(link !== undefined && { link }),
      ...(github !== undefined && { github }),
      ...(techArray !== undefined && { technologies: techArray }),
      ...(featured !== undefined && { featured: Boolean(featured) })
    }

    const updated = await Portfolio.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true })
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }

    res.json({ success: true, project: updated })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete portfolio project (Admin only)
// @route   DELETE /api/portfolio/:id
exports.deletePortfolio = async (req, res, next) => {
  try {
    const project = await Portfolio.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }
    res.json({ success: true, message: 'Portfolio project removed' })
  } catch (error) {
    next(error)
  }
}

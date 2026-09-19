require('dotenv').config()
const express    = require('express')
const helmet     = require('helmet')
const cors       = require('cors')
const mongoose   = require('mongoose')
const connectDB  = require('./config/db')
const { generalLimiter } = require('./middleware/rateLimit')
const errorMiddleware = require('./middleware/errorMiddleware')

// Routes
const authRoutes    = require('./routes/authRoutes')
const projectRoutes = require('./routes/projectRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const reviewRoutes  = require('./routes/reviewRoutes')
const aiRoutes      = require('./routes/aiRoutes')
const contactRoutes = require('./routes/contactRoutes')
const adminRoutes   = require('./routes/adminRoutes')

const app  = express()
const PORT = process.env.PORT || 5000

// ── Connect DB ──────────────────────────────────────────
connectDB()

// ── Middleware ──────────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(generalLimiter)

// ── Routes ──────────────────────────────────────────────
app.use('/api/auth',     authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/reviews',  reviewRoutes)
app.use('/api/ai',       aiRoutes)
app.use('/api/contact',  contactRoutes)
app.use('/api/admin',    adminRoutes)

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date() }))

// ── Error handler ────────────────────────────────────────
app.use(errorMiddleware)

// ── Start server (Local only) ────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`🚀 AP Developments API running on port ${PORT}`))
}

module.exports = app;

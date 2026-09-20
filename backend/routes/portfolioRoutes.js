const router = require('express').Router()
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware')
const {
  getPortfolios,
  createPortfolio,
  updatePortfolio,
  deletePortfolio
} = require('../controllers/portfolioController')

// Public routes
router.get('/', getPortfolios)

// Admin-only management routes
router.post('/', authMiddleware, adminMiddleware, createPortfolio)
router.put('/:id', authMiddleware, adminMiddleware, updatePortfolio)
router.delete('/:id', authMiddleware, adminMiddleware, deletePortfolio)

module.exports = router

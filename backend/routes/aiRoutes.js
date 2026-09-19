const router = require('express').Router()
const { generatePlan } = require('../controllers/aiController')
const { authMiddleware } = require('../middleware/authMiddleware')
const { aiLimiter }     = require('../middleware/rateLimit')

// Allow unauthenticated AI planning (so visitors can try it), but rate-limit aggressively
router.post('/plan', aiLimiter, generatePlan)

module.exports = router

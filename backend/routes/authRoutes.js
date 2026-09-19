const router = require('express').Router()
const { register, login, me, logout } = require('../controllers/authController')
const { authMiddleware } = require('../middleware/authMiddleware')
const { authLimiter }   = require('../middleware/rateLimit')

router.post('/register', authLimiter, register)
router.post('/login',    authLimiter, login)
router.get('/me',        authMiddleware, me)
router.post('/logout',   authMiddleware, logout)

module.exports = router

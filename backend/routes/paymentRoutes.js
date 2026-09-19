const router = require('express').Router()
const { createOrder, verifyPayment, getMyPayments } = require('../controllers/paymentController')
const { authMiddleware } = require('../middleware/authMiddleware')

router.use(authMiddleware)
router.post('/create-order', createOrder)
router.post('/verify',       verifyPayment)
router.get('/mine',          getMyPayments)

module.exports = router

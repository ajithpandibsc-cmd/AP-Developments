const router = require('express').Router()
const { createBooking, getMyBookings, getBooking } = require('../controllers/bookingController')
const { authMiddleware } = require('../middleware/authMiddleware')

router.use(authMiddleware)
router.post('/',     createBooking)
router.get('/mine',  getMyBookings)
router.get('/:id',   getBooking)

module.exports = router

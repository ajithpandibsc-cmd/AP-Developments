const router = require('express').Router()
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware')
const {
  getUsers, getProjects, getBookings, getPayments,
  getReviews, getMessages, updateProjectStatus, approveReview,
} = require('../controllers/adminController')

router.use(authMiddleware, adminMiddleware)

router.get('/users',                       getUsers)
router.get('/projects',                    getProjects)
router.get('/bookings',                    getBookings)
router.get('/payments',                    getPayments)
router.get('/reviews',                     getReviews)
router.get('/messages',                    getMessages)
router.put('/projects/:id/status',         updateProjectStatus)
router.put('/reviews/:id/approve',         approveReview)

module.exports = router

const router = require('express').Router()
const { createReview, getApprovedReviews } = require('../controllers/reviewController')
const { authMiddleware } = require('../middleware/authMiddleware')

router.get('/', getApprovedReviews)
router.post('/', authMiddleware, createReview)

module.exports = router

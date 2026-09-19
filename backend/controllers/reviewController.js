const Review = require('../models/Review')

const createReview = async (req, res, next) => {
  try {
    const { projectId, rating, comment, projectType } = req.body
    if (!rating || !comment) return res.status(400).json({ message: 'Rating and comment required.' })
    const review = await Review.create({
      userId: req.user._id, projectId, rating, comment, projectType, approved: false,
    })
    res.status(201).json({ review, message: 'Review submitted. Pending admin approval.' })
  } catch (e) { next(e) }
}

const getApprovedReviews = async (_req, res, next) => {
  try {
    const reviews = await Review.find({ approved: true }).populate('userId','name').sort({ createdAt: -1 })
    res.json({ reviews })
  } catch (e) { next(e) }
}

module.exports = { createReview, getApprovedReviews }

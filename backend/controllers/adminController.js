const User           = require('../models/User')
const Project        = require('../models/Project')
const Booking        = require('../models/Booking')
const Payment        = require('../models/Payment')
const Review         = require('../models/Review')
const ContactMessage = require('../models/ContactMessage')

const getUsers    = async (_req, res, next) => { try { res.json({ users:    await User.find().select('-passwordHash') })             } catch(e){next(e)} }
const getProjects = async (_req, res, next) => { try { res.json({ projects: await Project.find().populate('userId','name email') }) } catch(e){next(e)} }
const getBookings = async (_req, res, next) => { try { res.json({ bookings: await Booking.find().populate('userId','name email') }) } catch(e){next(e)} }
const getPayments = async (_req, res, next) => { try { res.json({ payments: await Payment.find().populate('userId','name email') }) } catch(e){next(e)} }
const getReviews  = async (_req, res, next) => { try { res.json({ reviews:  await Review.find().populate('userId','name') })        } catch(e){next(e)} }
const getMessages = async (_req, res, next) => { try { res.json({ messages: await ContactMessage.find().sort({ createdAt:-1 }) })   } catch(e){next(e)} }

const updateProjectStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const project = await Project.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!project) return res.status(404).json({ message: 'Project not found' })
    res.json({ project })
  } catch(e) { next(e) }
}

const approveReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { approved: true }, { new: true })
    if (!review) return res.status(404).json({ message: 'Review not found' })
    res.json({ review })
  } catch(e) { next(e) }
}

module.exports = { getUsers, getProjects, getBookings, getPayments, getReviews, getMessages, updateProjectStatus, approveReview }

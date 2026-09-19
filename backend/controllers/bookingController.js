const Booking = require('../models/Booking')

const createBooking = async (req, res, next) => {
  try {
    const { projectId, service, packageName, amount } = req.body
    const booking = await Booking.create({
      userId: req.user._id, projectId, service, packageName, amount: amount || 0,
    })
    res.status(201).json({ booking })
  } catch (e) { next(e) }
}

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 }).populate('projectId','title service')
    res.json({ bookings })
  } catch (e) { next(e) }
}

const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user._id })
    if (!booking) return res.status(404).json({ message: 'Booking not found.' })
    res.json({ booking })
  } catch (e) { next(e) }
}

module.exports = { createBooking, getMyBookings, getBooking }

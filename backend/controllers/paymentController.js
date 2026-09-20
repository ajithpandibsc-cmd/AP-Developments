const Razorpay = require('razorpay')
const crypto   = require('crypto')
const Payment  = require('../models/Payment')
const Booking  = require('../models/Booking')

// Lazy-initialize Razorpay only when keys are present
// (prevents crash on startup when keys are not yet configured)
const getRazorpay = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return null
  }
  return new Razorpay({
    key_id:     process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
}


// POST /api/payments/create-order
const createOrder = async (req, res, next) => {
  try {
    const razorpay = getRazorpay()
    if (!razorpay) {
      return res.status(503).json({ message: 'Payment service not configured. Please contact support.' })
    }

    const { bookingId } = req.body
    const booking = await Booking.findOne({ _id: bookingId, userId: req.user._id })
    if (!booking) return res.status(404).json({ message: 'Booking not found.' })

    const amount   = booking.amount || 50000 // fallback ₹500 in paise
    const currency = 'INR'

    const order = await razorpay.orders.create({ amount, currency, receipt: `ap_${bookingId}` })

    // Save initial payment record
    await Payment.create({
      userId: req.user._id,
      bookingId,
      orderId: order.id,
      amount,
      currency,
      status: 'created',
    })

    res.json({
      orderId:  order.id,
      amount:   order.amount,
      currency: order.currency,
      keyId:    process.env.RAZORPAY_KEY_ID,
    })
  } catch (e) { next(e) }
}

// POST /api/payments/verify
const verifyPayment = async (req, res, next) => {
  try {
    const { orderId, paymentId, signature, bookingId } = req.body

    // Verify Razorpay signature
    const body      = `${orderId}|${paymentId}`
    const expected  = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                            .update(body).digest('hex')

    if (expected !== signature) {
      return res.status(400).json({ message: 'Payment verification failed. Invalid signature.' })
    }

    // Update payment record
    await Payment.findOneAndUpdate(
      { orderId },
      { paymentId, signature, status: 'captured' },
      { new: true }
    )

    // Update booking status
    await Booking.findByIdAndUpdate(bookingId, { status: 'Confirmed' })

    // TODO: Send WhatsApp & email confirmation (requires configured keys)

    res.json({ message: 'Payment verified and booking confirmed.' })
  } catch (e) { next(e) }
}

// GET /api/payments/mine
const getMyPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.json({ payments })
  } catch (e) { next(e) }
}

module.exports = { createOrder, verifyPayment, getMyPayments }

const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  gateway:   { type: String, default: 'razorpay' },
  orderId:   { type: String, required: true },
  paymentId: { type: String, default: '' },
  signature: { type: String, default: '' },
  amount:    { type: Number, required: true }, // in paise
  currency:  { type: String, default: 'INR' },
  status:    { type: String, enum: ['created','attempted','captured','failed'], default: 'created' },
}, { timestamps: true })

paymentSchema.index({ userId: 1 })
paymentSchema.index({ orderId: 1 })

module.exports = mongoose.model('Payment', paymentSchema)

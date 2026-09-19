const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  service:     { type: String, required: true },
  packageName: { type: String, default: 'Custom' },
  amount:      { type: Number, default: 0 }, // in paise
  bookingDate: { type: Date, default: Date.now },
  status:      { type: String, enum: ['Pending','Confirmed','Cancelled','Completed'], default: 'Pending' },
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)

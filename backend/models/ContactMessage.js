const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  email:       { type: String, required: true },
  phone:       { type: String, default: '' },
  service:     { type: String, default: '' },
  budget:      { type: String, default: '' },
  description: { type: String, required: true },
  startDate:   { type: String, default: '' },
  message:     { type: String, default: '' },
  status:      { type: String, enum: ['new','read','replied'], default: 'new' },
}, { timestamps: true })

module.exports = mongoose.model('ContactMessage', contactSchema)

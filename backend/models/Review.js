const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  rating:      { type: Number, min: 1, max: 5, required: true },
  comment:     { type: String, required: true, maxlength: 1000 },
  projectType: { type: String, default: '' },
  approved:    { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Review', reviewSchema)

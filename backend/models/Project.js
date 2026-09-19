const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  userId:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:           { type: String, required: true },
  service:         { type: String, required: true, enum: ['Web Development','Content Creation','Video Editing','Graphic Design','Multiple Services','Not Sure Yet'] },
  description:     { type: String, default: '' },
  budget:          { type: String, default: '' },
  estimatedBudget: { type: String, default: '' },
  timeline:        { type: String, default: '' },
  priority:        { type: String, default: 'Standard' },
  status:          { type: String, enum: ['Requested','Planning','In Progress','Review','Completed'], default: 'Requested' },
  aiPlan:          { type: mongoose.Schema.Types.Mixed, default: null },
}, { timestamps: true })

projectSchema.index({ userId: 1, status: 1 })

module.exports = mongoose.model('Project', projectSchema)

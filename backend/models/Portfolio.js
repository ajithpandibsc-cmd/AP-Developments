const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema({
  title:        { type: String, required: [true, 'Project title is required'], trim: true },
  category:     { type: String, required: [true, 'Category is required'], trim: true },
  description:  { type: String, required: [true, 'Description is required'] },
  image:        { type: String, default: '' },
  link:         { type: String, default: '' },
  github:       { type: String, default: '' },
  technologies: [{ type: String, trim: true }],
  featured:     { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Portfolio', portfolioSchema)

const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone:        { type: String, default: '' },
  passwordHash: { type: String, required: true },
  role:         { type: String, enum: ['user','admin'], default: 'user' },
}, { timestamps: true })

userSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next()
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12)
  next()
})

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash)
}

userSchema.methods.toJSON = function() {
  const obj = this.toObject()
  delete obj.passwordHash
  return obj
}

module.exports = mongoose.model('User', userSchema)

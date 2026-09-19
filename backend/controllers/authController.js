const jwt  = require('jsonwebtoken')
const User = require('../models/User')

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required.' })
    if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters.' })

    const exists = await User.findOne({ email: email.toLowerCase() })
    if (exists) return res.status(409).json({ message: 'Email already registered.' })

    const user = new User({ name, email, phone: phone || '', passwordHash: password, role: 'user' })
    await user.save()
    const token = generateToken(user._id)
    res.status(201).json({ token, user })
  } catch (e) { next(e) }
}

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password required.' })

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) return res.status(401).json({ message: 'Invalid email or password.' })

    const match = await user.comparePassword(password)
    if (!match) return res.status(401).json({ message: 'Invalid email or password.' })

    const token = generateToken(user._id)
    res.json({ token, user })
  } catch (e) { next(e) }
}

// GET /api/auth/me
const me = (req, res) => res.json({ user: req.user })

// POST /api/auth/logout
const logout = (_req, res) => res.json({ message: 'Logged out' })

module.exports = { register, login, me, logout }

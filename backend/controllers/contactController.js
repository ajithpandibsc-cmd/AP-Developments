const ContactMessage = require('../models/ContactMessage')

const submit = async (req, res, next) => {
  try {
    const { name, email, phone, service, budget, description, startDate } = req.body
    if (!name || !email || !description) return res.status(400).json({ message: 'Name, email, and description are required.' })
    const msg = await ContactMessage.create({ name, email, phone, service, budget, description, startDate })
    res.status(201).json({ message: 'Request received. We\'ll be in touch soon!', id: msg._id })
  } catch (e) { next(e) }
}

module.exports = { submit }

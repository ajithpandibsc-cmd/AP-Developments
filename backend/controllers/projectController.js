const Project = require('../models/Project')

// POST /api/projects — create
const createProject = async (req, res, next) => {
  try {
    const { title, service, description, budget, estimatedBudget, timeline, priority, aiPlan } = req.body
    if (!title || !service) return res.status(400).json({ message: 'Title and service are required.' })
    const project = await Project.create({
      userId: req.user._id, title, service, description, budget, estimatedBudget, timeline, priority, aiPlan,
    })
    res.status(201).json({ project })
  } catch (e) { next(e) }
}

// GET /api/projects/mine — user's own projects
const getMyProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.json({ projects })
  } catch (e) { next(e) }
}

// GET /api/projects/:id
const getProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user._id })
    if (!project) return res.status(404).json({ message: 'Project not found.' })
    res.json({ project })
  } catch (e) { next(e) }
}

module.exports = { createProject, getMyProjects, getProject }

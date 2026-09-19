const router = require('express').Router()
const { createProject, getMyProjects, getProject } = require('../controllers/projectController')
const { authMiddleware } = require('../middleware/authMiddleware')

router.use(authMiddleware)
router.post('/',       createProject)
router.get('/mine',    getMyProjects)
router.get('/:id',     getProject)

module.exports = router

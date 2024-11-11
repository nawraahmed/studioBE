const express = require('express')
const router = express.Router()
const projectController = require('../controllers/ProjectController')

router.post('/project', upload.array('files'), projectController.createProject)

router.get('/project', projectController.getProjects)
router.get('/project/:id', projectController.getProjectById)
router.put(
  '/project/:id',
  upload.array('files'),
  projectController.updateProject
)
router.delete('/project/:id', projectController.deleteProject)

module.exports = router

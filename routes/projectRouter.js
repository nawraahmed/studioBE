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
<<<<<<< HEAD
router.delete('/project/:id', projectController.deleteProject)
=======
router.post("/project/:id/delete-file", projectController.deleteFile)
router.delete("/project/:id", projectController.deleteProject)
>>>>>>> 73f10990c4c152069374ac345ac5e1b7f38864d3

module.exports = router

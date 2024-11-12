const express = require("express")
const router = express.Router()
const projectController = require("../controllers/ProjectController")
const middleware = require("../middlewares/index")

router.post(
  "/project",
  middleware.stripToken,
  middleware.verifyToken,
  upload.array("files"),
  projectController.createProject
)

router.get("/project", projectController.getProjects)
router.get("/project/:id", projectController.getProjectById)
router.put(
  "/project/:id",
  upload.array("files"),
  projectController.updateProject
)
router.post("/project/:id/delete-file", projectController.deleteFile)
router.delete("/project/:id", projectController.deleteProject)

module.exports = router

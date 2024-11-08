const express = require("express")
const router = express.Router()
const projectController = require("../controllers/projectController")

router.post("/project", upload.array("files"), projectController.createProject)

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

const express = require("express")
const router = express.Router()
const projectController = require("../controllers/projectController")

// Create a new project
router.post("/project", upload.array("files"), projectController.createProject) // use `array` to handle multiple files

// Get all projects
router.get("/project", projectController.getProjects)

// Get a project by ID
router.get("/project/:id", projectController.getProjectById)

// Update a project by ID
router.put(
  "/project/:id",
  upload.array("files"),
  projectController.updateProject
)

// Delete a project by ID
router.delete("/project/:id", projectController.deleteProject)

module.exports = router

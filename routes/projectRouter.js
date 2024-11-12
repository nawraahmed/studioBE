const express = require("express")
const router = express.Router()
const projectController = require("../controllers/ProjectController")
const middleware = require("../middlewares/index")

router.post(
  "/project",
  middleware.stripToken,
  middleware.verifyToken,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "files", maxCount: 20 },
  ]),
  projectController.createProject
)

router.get("/project", projectController.getProjects)
router.get("/project/:id", projectController.getProjectById)
router.put(
  "/project/:id",
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "files", maxCount: 20 },
  ]),
  projectController.updateProject
)
router.delete("/project/:id/delete-file", projectController.deleteFile)
router.delete("/project/:id", projectController.deleteProject)

module.exports = router

const Project = require("../models/Project")
const User = require("../models/User")
const Service = require("../models/Service")
const multer = require("multer")

// Set up multer for file upload handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/projects/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname)
  },
})

upload = multer({ storage: storage })

// Controller for Project operations
const projectController = {
  // Create a new Project
  createProject: async (req, res) => {
    try {
      const { title, description, service, userId } = req.body
      const files = req.files

      if (!title || !description || !service || !userId) {
        return res.status(400).json({
          message: "Title, description, service, and userId are required.",
        })
      }

      const serviceObj = await Service.findById(service)
      const userObj = await User.findById(userId)
      if (!serviceObj || !userObj) {
        return res.status(404).json({ message: "Service or User not found" })
      }

      const filePaths = files ? files.map((file) => file.path) : []

      // Create a new project instance
      const newProject = new Project({
        title,
        description,
        service,
        user: userId,
        files: filePaths,
      })

      await newProject.save()

      return res.status(201).json({
        message: "Project created successfully",
        project: newProject,
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  // Get all Projects
  getProjects: async (req, res) => {
    try {
      const projects = await Project.find().populate("service user")
      if (projects.length === 0) {
        return res.status(404).json({ message: "No projects found" })
      }
      return res.status(200).json(projects)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  // Get a Project by ID
  getProjectById: async (req, res) => {
    const projectId = req.params.id
    try {
      const project = await Project.findById(projectId).populate("service user")
      if (!project) {
        return res.status(404).json({ message: "Project not found" })
      }
      return res.status(200).json(project)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  updateProject: async (req, res) => {
    const projectId = req.params.id
    const { title, description, service, userId } = req.body
    const files = req.files

    try {
      // Fetch the existing project to retain current files if no new files are provided
      const existingProject = await Project.findById(projectId)

      if (!existingProject) {
        return res.status(404).json({ message: "Project not found" })
      }

      const filePaths =
        files && files.length > 0
          ? [...existingProject.files, ...files.map((file) => file.path)]
          : existingProject.files

      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        {
          title: title || existingProject.title,
          description: description || existingProject.description,
          service: service || existingProject.service,
          user: userId || existingProject.user,
          files: filePaths,
          updatedAt: new Date(),
        },
        { new: true, runValidators: true }
      )

      return res.status(200).json({
        message: "Project updated successfully",
        project: updatedProject,
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  // Delete a file from project
  deleteFile: async (req, res) => {
    const projectId = req.params.id
    const filePath = req.body.filePath

    try {
      const project = await Project.findById(projectId)
      if (!project) {
        return res.status(404).json({ message: "Project not found" })
      }

      const normalizedFilePath = filePath.replace(/\\/g, "/")

      project.files = project.files.filter(
        (file) => file.replace(/\\/g, "/") !== normalizedFilePath
      )
      await project.save()

      return res
        .status(200)
        .json({ message: "File path removed from project successfully" })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  // Delete a Project
  deleteProject: async (req, res) => {
    const projectId = req.params.id
    try {
      const deletedProject = await Project.findByIdAndDelete(projectId)
      if (!deletedProject) {
        return res.status(404).json({ message: "Project not found" })
      }
      return res.status(200).json({
        message: `Project "${deletedProject.title}" deleted successfully`,
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Server error" })
    }
  },
}

module.exports = projectController

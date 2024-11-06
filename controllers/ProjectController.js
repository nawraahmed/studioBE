const Project = require("../models/Project")
const User = require("../models/User")
const Service = require("../models/Service") // assuming Service model exists
const multer = require("multer")

// Set up multer for file upload handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/projects/") // Store files in the "uploads/projects/" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname) // Append timestamp to file name to avoid conflicts
  },
})

upload = multer({ storage: storage })

// Controller for Project operations
const projectController = {
  // Create a new Project
  createProject: async (req, res) => {
    try {
      const { title, description, service, userId } = req.body
      const files = req.files // Access uploaded files from req.files

      // Check if required fields are provided
      if (!title || !description) {
        return res.status(400).json({
          message: "Title, description, service, and userId are required.",
        })
      }

      // Validate service and user
      const serviceObj = await Service.findById(service)
      const userObj = await User.findById(userId)
      if (!serviceObj || !userObj) {
        return res.status(404).json({ message: "Service or User not found" })
      }

      // Process files: If files are uploaded, extract their paths
      const filePaths = files ? files.map((file) => file.path) : []

      // Create a new project instance
      const newProject = new Project({
        title,
        description,
        service,
        user: userId,
        files: filePaths, // Store file paths
      })

      // Save the project
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
      const projects = await Project.find().populate("service user") // Populate service and user for better response
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

  // Update a Project
  updateProject: async (req, res) => {
    const projectId = req.params.id
    const { title, description, service, userId } = req.body
    const files = req.files // Access uploaded files from req.files

    try {
      // Process files: If files are uploaded, extract their paths
      const filePaths = files ? files.map((file) => file.path) : undefined

      // Update project
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        {
          title,
          description,
          service,
          user: userId,
          files: filePaths, // Update file paths if files are uploaded
          updatedAt: new Date(),
        },
        { new: true, runValidators: true }
      )

      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" })
      }

      return res.status(200).json({
        message: "Project updated successfully",
        project: updatedProject,
      })
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

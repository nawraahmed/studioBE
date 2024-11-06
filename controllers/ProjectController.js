const Project = require("../models/Project")
const multer = require("multer")
const User = require("../models/User")

const GetProject = async (req, res) => {
  try {
    const project = await Project.find({}).populate("User")
    res.send(project)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetProject,
}

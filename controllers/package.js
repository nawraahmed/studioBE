const PackageSchema = require("../models/PackageSchema")
const Service = require("../models/Service")

const packageController = {
  createPackage: async (req, res) => {
    try {
      const { name, description, discount, servicesIncluded } = req.body
      const newPackage = new PackageSchema({
        name,
        description,
        discount,
        servicesIncluded,
      })
      console.log(req.body)
      await newPackage.save()
      return res
        .status(201)
        .json({ message: "Package created successfully", package: newPackage })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  getPackages: async (req, res) => {
    try {
      const packages = await PackageSchema.find()
      if (packages.length === 0) {
        return res.status(404).json({ message: "No packages found" })
      }
      return res.status(200).json(packages)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  getPackageById: async (req, res) => {
    const id = req.params.id
    try {
      const package = await PackageSchema.findById(id)
      if (!package) {
        return res.status(404).json({ message: "Package not found" })
      }
      return res.status(200).json(package)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  updatePackage: async (req, res) => {
    const id = req.params.id
    const { name, description, discount, servicesIncluded } = req.body
    try {
      const package = await PackageSchema.findByIdAndUpdate(
        id,
        {
          name,
          description,
          discount,
          servicesIncluded,
        },
        { new: true, runValidators: true }
      )
      if (!package) {
        return res.status(404).json({ message: "Package not found" })
      }
      res.send({ message: "Package updated successfully", package })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  deletePackage: async (req, res) => {
    const id = req.params.id
    try {
      const package = await PackageSchema.findByIdAndDelete(id)
      if (!package) {
        return res.status(404).json({ message: "Package not found" })
      }
      return res.status(200).json({
        message: `package ${package.name} deleted sucessfully`,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },
}
module.exports = packageController

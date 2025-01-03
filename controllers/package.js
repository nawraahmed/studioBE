const Package = require("../models/Package")
const Service = require("../models/Service")

const packageController = {
  createPackage: async (req, res) => {
    try {
      const { name, description, price, servicesIncluded } = req.body
      const newPackage = new Package({
        name,
        description,
        price,
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
      const packages = await Package.find().populate("servicesIncluded") // populate servicesIncluded field
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
      const package = await Package.findById(id).populate("servicesIncluded") // populate servicesIncluded field
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
    const { name, description, price, servicesIncluded } = req.body
    try {
      const package = await Package.findByIdAndUpdate(
        id,
        {
          name,
          description,
          price,
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
      const package = await Package.findByIdAndDelete(id)
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
  togglePackageActivation: async (req, res) => {
    const { id } = req.params
    try {
      const package = await Package.findById(id)
      package.isActive = !package.isActive
      await package.save()

      return res.status(200).json({
        message: `Package ${
          package.isActive ? "activated" : "deactivated"
        } successfully`,
        package,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },
}
module.exports = packageController

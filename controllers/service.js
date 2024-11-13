const Service = require("../models/Service")

const serviceController = {
  // Create a new service
  createService: async (req, res) => {
    try {
      const { name, description, startingPrice } = req.body

      // Ensure name and description fields contain both 'en' and 'ar' fields
      if (!name?.en || !name?.ar || !description?.en || !description?.ar) {
        return res.status(400).json({
          message:
            "Both English and Arabic translations are required for name and description",
        })
      }

      const newService = new Service({
        name, // { en: 'English Name', ar: 'Arabic Name' }
        description, // { en: 'English Description', ar: 'Arabic Description' }
        startingPrice,
      })

      console.log(req.body)
      await newService.save()

      return res
        .status(201)
        .json({ message: "Service created successfully", service: newService })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  // Get all services
  getServices: async (req, res) => {
    try {
      const services = await Service.find()
      if (services.length === 0) {
        return res.status(404).json({ message: "No services found" })
      }
      return res.status(200).json(services)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  // Get a single service by its ID
  getServiceById: async (req, res) => {
    const id = req.params.id
    try {
      const service = await Service.findById(id)
      if (!service) {
        return res.status(404).json({ message: "Service not found" })
      }
      return res.status(200).json(service)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  // Update an existing service
  updateService: async (req, res) => {
    const id = req.params.id
    const { name, description, startingPrice } = req.body

    try {
      // Ensure both 'en' and 'ar' are provided for name and description
      if (!name?.en || !name?.ar || !description?.en || !description?.ar) {
        return res.status(400).json({
          message:
            "Both English and Arabic translations are required for name and description",
        })
      }

      const updatedService = await Service.findByIdAndUpdate(
        id,
        { name, description, startingPrice },
        { new: true, runValidators: true }
      )

      if (!updatedService) {
        return res.status(404).json({ message: "Service not found" })
      }

      res.status(200).json({
        message: "Service updated successfully",
        service: updatedService,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  // Delete a service
  deleteService: async (req, res) => {
    const id = req.params.id
    try {
      const service = await Service.findByIdAndDelete(id)
      if (!service) {
        return res.status(404).json({ message: "Service not found" })
      }
      return res.status(200).json({
        message: `Service ${service.name.en} deleted successfully`,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },
}

module.exports = serviceController

const Service = require("../models/Service")

const serviceController = {
  createService: async (req, res) => {
    try {
      const {
        name_en,
        name_ar,
        description_en,
        description_ar,
        startingPrice,
      } = req.body

      // Create a new service with both language fields
      const newService = new Service({
        name_en,
        name_ar,
        description_en,
        description_ar,
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

  updateService: async (req, res) => {
    const id = req.params.id
    const { name_en, name_ar, description_en, description_ar, startingPrice } =
      req.body

    try {
      const updatedService = await Service.findByIdAndUpdate(
        id,
        {
          name_en,
          name_ar,
          description_en,
          description_ar,
          startingPrice,
        },
        { new: true, runValidators: true }
      )

      if (!updatedService) {
        return res.status(404).json({ message: "Service not found" })
      }

      res.send({
        message: "Service updated successfully",
        package: updatedService,
      })
    } catch (err) {
      console.log("Error updating service:", err)
      return res.status(500).json({ message: "Server error" })
    }
  },
  deleteService: async (req, res) => {
    const id = req.params.id
    try {
      const service = await Service.findByIdAndDelete(id)
      if (!service) {
        return res.status(404).json({ message: "Service not found" })
      }
      return res.status(200).json({
        message: `service ${service.name} deleted sucessfully`,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },
}
module.exports = serviceController

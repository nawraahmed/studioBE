const AdminSettings = require("../models/AdminSettings")

const AdminSettingsController = {
  // Create a new available date with slots
  createAvailableDate: async (req, res) => {
    try {
      const { date, slots } = req.body // `slots` is an array of objects with `start`, `end`, `title`, and `color`
      const formattedSlots = slots.map((slot) => ({
        title: slot.title || "Available Slot",
        start: new Date(slot.start),
        end: new Date(slot.end),
        color: slot.color || "#85C1E9",
      }))

      const newAvailableDate = { date, slots: formattedSlots }

      // Find existing AdminSettings document
      const adminSettings = await AdminSettings.findOne()
      if (!adminSettings) {
        // Create a new AdminSettings document if it doesn't exist
        const newAdminSettings = new AdminSettings({
          availableDates: [newAvailableDate],
        })
        await newAdminSettings.save()
        return res.status(201).json({
          message: "Available date created successfully",
          adminSettings: newAdminSettings,
        })
      } else {
        // Check if the date already exists
        const existingDate = adminSettings.availableDates.find(
          (d) =>
            d.date.toISOString().split("T")[0] ===
            new Date(date).toISOString().split("T")[0]
        )

        if (existingDate) {
          return res.status(400).json({ message: "Date already exists" })
        }

        // Add new date with slots
        adminSettings.availableDates.push(newAvailableDate)
        await adminSettings.save()
        return res.status(201).json({
          message: "Available date added successfully",
          adminSettings,
        })
      }
    } catch (err) {
      console.error(err)
      return res
        .status(500)
        .json({ message: "Server error", error: err.message })
    }
  },

  // Get all available dates
  getAllAvailableDates: async (req, res) => {
    try {
      const adminSettings = await AdminSettings.findOne()
      if (!adminSettings || adminSettings.availableDates.length === 0) {
        return res.status(404).json({ message: "No available dates found" })
      }
      return res.status(200).json(adminSettings.availableDates)
    } catch (err) {
      console.error(err)
      return res
        .status(500)
        .json({ message: "Server error", error: err.message })
    }
  },

  // Get available date by ID
  getAvailableDateById: async (req, res) => {
    const id = req.params.id
    try {
      const adminSettings = await AdminSettings.findOne()
      if (!adminSettings) {
        return res.status(404).json({ message: "No available dates found" })
      }

      const availableDate = adminSettings.availableDates.id(id)
      if (!availableDate) {
        return res.status(404).json({ message: "Available date not found" })
      }

      return res.status(200).json(availableDate)
    } catch (err) {
      console.error(err)
      return res
        .status(500)
        .json({ message: "Server error", error: err.message })
    }
  },

  // Update slots for a specific available date
  updateAvailableDate: async (req, res) => {
    const id = req.params.id
    const { slots } = req.body // `slots` is an array of objects with `start`, `end`, `title`, and `color`
    try {
      const adminSettings = await AdminSettings.findOne()
      if (!adminSettings) {
        return res.status(404).json({ message: "No available dates found" })
      }

      const availableDate = adminSettings.availableDates.id(id)
      if (!availableDate) {
        return res.status(404).json({ message: "Available date not found" })
      }

      // Update the slots with the new array of slot objects
      availableDate.slots = slots.map((slot) => ({
        title: slot.title || "Available Slot",
        start: new Date(slot.start),
        end: new Date(slot.end),
        color: slot.color || "#85C1E9",
      }))
      await adminSettings.save()

      return res.status(200).json({
        message: "Available date updated successfully",
        availableDate,
      })
    } catch (err) {
      console.error(err)
      return res
        .status(500)
        .json({ message: "Server error", error: err.message })
    }
  },

  // Delete an available date
  deleteAvailableDate: async (req, res) => {
    const id = req.params.id
    try {
      const adminSettings = await AdminSettings.findOne()
      if (!adminSettings) {
        return res.status(404).json({ message: "No available dates found" })
      }

      const availableDate = adminSettings.availableDates.id(id)
      if (!availableDate) {
        return res.status(404).json({ message: "Available date not found" })
      }

      availableDate.remove() // Remove the subdocument
      await adminSettings.save()

      return res.status(200).json({
        message: "Available date deleted successfully",
      })
    } catch (err) {
      console.error(err)
      return res
        .status(500)
        .json({ message: "Server error", error: err.message })
    }
  },
}

module.exports = AdminSettingsController

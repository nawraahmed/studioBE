const Slot = require("../models/Slot")

const SlotController = {
  // Create a new slot
  createSlot: async (req, res) => {
    try {
      const { title, start, end, color } = req.body
      const newSlot = new Slot({
        title,
        start: new Date(start),
        end: new Date(end),
        color: color || "#85C1E9",
      })

      await newSlot.save()
      return res.status(201).json({
        message: "Slot created successfully",
        slot: newSlot,
      })
    } catch (err) {
      console.error(err)
      return res
        .status(500)
        .json({ message: "Server error", error: err.message })
    }
  },

  // Get all slots
  getAllSlots: async (req, res) => {
    try {
      const slots = await Slot.find()
      if (slots.length === 0) {
        return res.status(404).json({ message: "No slots found" })
      }
      return res.status(200).json(slots)
    } catch (err) {
      console.error(err)
      return res
        .status(500)
        .json({ message: "Server error", error: err.message })
    }
  },

  // Get a specific slot by ID
  getSlotById: async (req, res) => {
    const id = req.params.id
    try {
      const slot = await Slot.findById(id)
      if (!slot) {
        return res.status(404).json({ message: "Slot not found" })
      }
      return res.status(200).json(slot)
    } catch (err) {
      console.error(err)
      return res
        .status(500)
        .json({ message: "Server error", error: err.message })
    }
  },

  // Update a specific slot by ID
  updateSlot: async (req, res) => {
    const id = req.params.id
    const { title, start, end, color } = req.body
    try {
      const slot = await Slot.findById(id)
      if (!slot) {
        return res.status(404).json({ message: "Slot not found" })
      }

      slot.title = title || slot.title
      slot.start = new Date(start) || slot.start
      slot.end = new Date(end) || slot.end
      slot.color = color || slot.color

      await slot.save()
      return res.status(200).json({
        message: "Slot updated successfully",
        slot,
      })
    } catch (err) {
      console.error(err)
      return res
        .status(500)
        .json({ message: "Server error", error: err.message })
    }
  },

  // Delete a specific slot by ID
  deleteSlot: async (req, res) => {
    const id = req.params.id
    try {
      const slot = await Slot.findByIdAndDelete(id)
      if (!slot) {
        return res.status(404).json({ message: "Slot not found" })
      }
      return res.status(200).json({ message: "Slot deleted successfully" })
    } catch (err) {
      console.error(err)
      return res
        .status(500)
        .json({ message: "Server error", error: err.message })
    }
  },
}

module.exports = SlotController

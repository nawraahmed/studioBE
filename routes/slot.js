const express = require("express")
const router = express.Router()
const SlotController = require("../controllers/slot")

// Route to create a new slot
router.post("/createSlot", SlotController.createSlot)

// Route to get all slots
router.get("/slots", SlotController.getAllSlots)

// Route to get a specific slot by ID
router.get("/slots/:id", SlotController.getSlotById)

// Route to update a specific slot by ID
router.put("/slots/:id", SlotController.updateSlot)

// Route to delete a specific slot by ID
router.delete("/slots/:id", SlotController.deleteSlot)

module.exports = router

const express = require("express")
const router = express.Router()
const AdminSettingsController = require("../controllers/adminSettings")

// Route to create a new available date with slots
router.post("/availableDates", AdminSettingsController.createAvailableDate)

// Route to get all available dates
router.get("/availableDates", AdminSettingsController.getAllAvailableDates)

// Route to get a specific available date by ID
router.get("/availableDates/:id", AdminSettingsController.getAvailableDateById)

// Route to update slots for a specific available date
router.put("/availableDates/:id", AdminSettingsController.updateAvailableDate)

// Route to delete a specific available date
router.delete(
  "/availableDates/:id",
  AdminSettingsController.deleteAvailableDate
)

module.exports = router

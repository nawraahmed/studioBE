const express = require("express")
const router = express.Router()
const serviceController = require("../controllers/service")

router.post("/createService", serviceController.createService)
router.get("/services", serviceController.getServices)
router.get("/services/:id", serviceController.getServiceById)
router.put("/services/:id", serviceController.updateService)
router.delete("/services/:id", serviceController.deleteService)

module.exports = router

const express = require("express")
const router = express.Router()
const packageController = require("../controllers/package")

router.post("/createPackage", packageController.createPackage)
router.get("/packages", packageController.getPackages)
router.get("/packages/:id", packageController.getPackageById)
router.put("/packages/:id", packageController.updatePackage)
router.delete("/packages/:id", packageController.deletePackage)
router.put("/packages/:id/toggle", packageController.togglePackageActivation)

module.exports = router

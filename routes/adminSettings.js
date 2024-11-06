const express = require('express')
const router = express.Router()
const AdminSettingsController = require('../controllers/adminSettings')

router.post('/createAdminSettings', AdminSettingsController.createAdminSettings)
router.get('/adminSettings', AdminSettingsController.getAdminSettings)
router.get('/adminSettings/:id', AdminSettingsController.getAdminSettingsById)
router.put('/adminSettings/:id', AdminSettingsController.updateAdminSettings)
router.delete('/adminSettings/:id', AdminSettingsController.deleteAdminSettings)

module.exports = router

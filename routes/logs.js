const express = require('express')
const router = express.Router()
const LogsController = require('../controllers/logs')

router.post('/createLogs', LogsController.createLogs)
router.get('/logs', LogsController.getLogs)
router.delete('/logs/:id', LogsController.deleteLogs)

module.exports = router

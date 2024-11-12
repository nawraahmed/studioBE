// backend/routes/currencyRoutes.js
const express = require('express')
const { convertCurrency } = require('../controllers/currency')
const router = express.Router()

router.get('/convert', convertCurrency)

module.exports = router

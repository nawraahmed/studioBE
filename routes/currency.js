// routes/currencyRoutes.js

const express = require('express')
const { getExchangeRates } = require('../controllers/currency')

const router = express.Router()

// Route to get exchange rates
router.get('/rates', getExchangeRates)

module.exports = router

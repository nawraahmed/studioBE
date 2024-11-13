// controllers/currencyController.js

const fetch = require('node-fetch')

// Cache object to store exchange rates
let cachedRates = {}
const CACHE_DURATION = 3600000 // 1 hour in milliseconds

// Function to fetch exchange rates from API with BHD as the base
const fetchExchangeRates = async () => {
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/BHD')
  const data = await response.json()
  cachedRates = { rates: data.rates, timestamp: Date.now() }
}

// Controller function to get exchange rates, with caching logic
const getExchangeRates = async (req, res) => {
  // Check if rates are cached and still valid
  if (
    !cachedRates.rates ||
    Date.now() - cachedRates.timestamp > CACHE_DURATION
  ) {
    await fetchExchangeRates()
  }
  res.json(cachedRates.rates)
}

module.exports = { getExchangeRates }

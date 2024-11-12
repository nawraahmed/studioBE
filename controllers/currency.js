const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const API_KEY = process.env.API_KEY
const BASE_URL = process.env.BASE_URL

const convertCurrency = async (req, res) => {
  const { from, to, amount } = req.query

  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/${from}`)
    const rate = response.data.conversion_rates[to]

    if (rate) {
      const convertedAmount = (amount * rate).toFixed(2)
      res.json({ convertedAmount })
    } else {
      res.status(400).json({ error: 'Currency not supported' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversion rate' })
  }
}

module.exports = { convertCurrency }

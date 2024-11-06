//Load Dep
const express = require('express')

//require and initalize dotenv
require('dotenv').config()

//PORT conf
const PORT = process.env.PORT

//Initalize express
const app = express()
app.use(express.json())

//Database Configuration
const db = require('./config/db')

// routes
const packageRoute = require('./routes/package')
const bookingRouter = require('./routes/booking')

// Mount routes
app.use('/package', packageRoute)
app.use('/', bookingRouter)

//listen on port
app.listen(PORT, () => console.log(`running on port: ${PORT}`))

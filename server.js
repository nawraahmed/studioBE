//Load Dep
const express = require('express')
const mongoose = require('mongoose')

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

const packageRoute = require("./routes/package")
const reviewRoute = require("./routes/review")
const serviceRoute = require("./routes/service")
const adminSettingsRoute = require('./routes/adminSettings')
// Mount routes
app.use("/package", packageRoute)
app.use("/review", reviewRoute)
app.use("/service", serviceRoute)
app.use('/adminSettings', adminSettingsRoute)



//listen on port
app.listen(PORT, () => console.log(`running on port: ${PORT}`))

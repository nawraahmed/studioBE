const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

require('dotenv').config()
require('./config/passport')

//Initalize express
const app = express()
app.use(express.json())
app.use(passport.initialize())

//Database Configuration
const db = require('./config/db')

// routes
const authRoutes = require('./routes/auth')
const packageRoute = require('./routes/package')

app.use('/api', authRoutes)
app.use('/package', packageRoute)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`running on port: ${PORT}`))

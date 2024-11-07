//Load Dep
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
const path = require('path')

require('dotenv').config()
require('./config/passport')

//Initalize express
const app = express()
app.use(express.json())
app.use(passport.initialize())

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

//Database Configuration
const db = require('./config/db')

// routes
const PORT = process.env.PORT
const packageRoute = require('./routes/package')
const projectRoute = require('./routes/projectRouter')
const reviewRoute = require('./routes/review')
const serviceRoute = require('./routes/service')
const adminSettingsRoute = require('./routes/adminSettings')
const authRoutes = require('./routes/auth')

// Mount routes
app.use('/package', packageRoute)
app.use('/projects', projectRoute)

app.use('/review', reviewRoute)
app.use('/service', serviceRoute)
app.use('/adminSettings', adminSettingsRoute)

app.use('/api', authRoutes)

//listen on port
app.listen(PORT, () => console.log(`running on port: ${PORT}`))

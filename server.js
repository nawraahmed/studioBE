//Load Dep
const express = require('express')
const passport = require('passport')
const cors = require('cors')
const path = require('path')

require('./config/passport')

//require and initalize dotenv
require('dotenv').config()

//PORT conf
const PORT = process.env.PORT

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

// Mount routes
const packageRoute = require('./routes/package')
const projectRoute = require('./routes/projectRouter')
const reviewRoute = require('./routes/review')
const serviceRoute = require('./routes/service')
const adminSettingsRoute = require('./routes/adminSettings')
const authRoutes = require('./routes/auth')
const logsRoute = require('./routes/logs')
const bookingRouter = require('./routes/booking')

// Mount routes
app.use('/package', packageRoute)
app.use('/projects', projectRoute)
app.use('/review', reviewRoute)
app.use('/service', serviceRoute)
app.use('/adminSettings', adminSettingsRoute)
app.use('/logs', logsRoute)
app.use('/', bookingRouter)

app.use('/api', authRoutes)

//listen on port
app.listen(PORT, () => console.log(`running on port: ${PORT}`))

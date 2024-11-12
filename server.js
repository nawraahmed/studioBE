// Load Dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const passport = require('passport')
const session = require('express-session')

require('./config/passport')

// Port Configuration
const PORT = process.env.PORT || 4000

// Initialize Express
const app = express()

// Session Configuration
app.use(
  session({
    secret: process.env.SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: true
  })
)

// Middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')))

// Database Configuration
const db = require('./config/db')

// Routes
const packageRoute = require('./routes/package')
const projectRoute = require('./routes/projectRouter')
const reviewRoute = require('./routes/review')
const serviceRoute = require('./routes/service')
const adminSettingsRoute = require('./routes/adminSettings')
const authRoutes = require('./routes/auth')
const googleAuthRoutes = require('./routes/googleAuth')
const bookingRouter = require('./routes/booking')
const logsRoute = require('./routes/logs')

// Mount Routes
app.use('/package', packageRoute)
app.use('/projects', projectRoute)
app.use('/review', reviewRoute)
app.use('/service', serviceRoute)
app.use('/adminSettings', adminSettingsRoute)
app.use('/', bookingRouter)
app.use('/auth', authRoutes)
app.use(googleAuthRoutes)
app.use('/logs', logsRoute)

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

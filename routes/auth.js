// routes/auth.js
const express = require('express')
const passport = require('passport')
const authController = require('../controllers/authController')
const middleware = require('../middlewares')
const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)

router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  authController.CheckSession
)

// Route for changing password
router.post(
  '/change-password',
  middleware.stripToken, // Extracts the token from the request
  middleware.verifyToken, // Verifies the token
  authController.changePassword // Calls the changePassword function
)

module.exports = router

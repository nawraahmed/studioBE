const express = require('express')
const passport = require('passport')
const authController = require('../controllers/authController')

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  authController.googleAuth
)

module.exports = router

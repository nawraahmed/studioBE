// routes/googleAuth.js
const express = require("express")
const passport = require("passport")
const authController = require("../controllers/authController")

const router = express.Router()

// Google OAuth initiation route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  authController.googleAuth
)

router.post("/auth/google/token", authController.verifyGoogleToken)

module.exports = router

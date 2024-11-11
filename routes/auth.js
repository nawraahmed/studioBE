// routes/auth.js
const express = require("express")
const passport = require("passport")
const authController = require("../controllers/authController")
const middleware = require("../middlewares")
const router = express.Router()

router.post("/register", authController.register)
router.post("/login", authController.login)

router.get(
  "/session",
  middleware.stripToken,
  middleware.verifyToken,
  authController.CheckSession
)

module.exports = router

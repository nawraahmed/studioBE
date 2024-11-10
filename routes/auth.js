// routes/auth.js
const express = require("express")
const passport = require("passport")
const authController = require("../controllers/authController")

const router = express.Router()

router.post("/register", authController.register)
router.post("/login", authController.login)

module.exports = router

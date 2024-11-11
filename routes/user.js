// routes/userRouter.js
const express = require('express')
const router = express.Router()
const userController = require('../controllers/user') // Adjust based on your folder structure

// Get all users
router.get('/users', userController.getAllUsers)

// Delete a user
router.delete('/users/:id', userController.deleteUser)

module.exports = router

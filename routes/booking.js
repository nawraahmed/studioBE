const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/booking')

// Create a new booking
router.post('/createBooking', bookingController.createBooking)

// Get all bookings
router.get('/bookings', bookingController.getBookings)

// Get a specific booking by ID
router.get('/bookings/:id', bookingController.getBookingById)

// Update a booking by ID
router.put('/bookings/:id', bookingController.updateBooking)

// Delete a booking by ID
router.delete('/bookings/:id', bookingController.deleteBooking)

// Get all bookings for a specific user
router.get('/userBookings/:userId', bookingController.getUserBookings)

router.get('/total-bookings', bookingController.getTotalBookings)

module.exports = router

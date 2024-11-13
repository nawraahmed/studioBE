const Booking = require('../models/Booking')
const User = require('../models/User')
const Service = require('../models/Service')
const sendEmail = require('../utils/sendEmail')

const bookingController = {
  createBooking: async (req, res) => {
    try {
      const { user, service, bookingDate, status, files } = req.body

      console.log('this is user obj:')
      console.log(user)

      // Check if the user and service exist
      const userExists = await User.findById(user)
      const serviceExists = await Service.findById(service)

      // if (!userExists) {
      //   console.log('the issue is here!')
      //   return res.status(405).json({ message: 'User not found' })
      // }

      if (!serviceExists) {
        return res.status(405).json({ message: 'Service not found' })
      }

      // Create new booking
      const newBooking = new Booking({
        user: user,
        service,
        bookingDate,
        status,
        files
      })

      await newBooking.save()

      // Fetch user details to send email
      const userDetails = await User.findById(user) // Assuming user object contains email

      console.log(userDetails)

      // Send confirmation email to the user
      const subject = 'Booking Confirmation'
      const text = `Hello ${
        userDetails.name
      },\n\nYour booking for the service "${
        serviceExists.name
      }" has been successfully created.\n\nBooking Date: ${new Date(
        bookingDate
      ).toLocaleString()}\nStatus: ${status}\n\nThank you for choosing us!`
      const html = `
        <h1>Booking Confirmation</h1>
        <p>Hello ${userDetails.name},</p>
        <p>Your booking for the service <strong>"${
          serviceExists.name
        }"</strong> has been successfully created.</p>
        <p><strong>Booking Date:</strong> ${new Date(
          bookingDate
        ).toLocaleString()}</p>
        <p><strong>Status:</strong> ${status}</p>
        <p>Thank you for choosing us!</p>
      `

      // Send the email
      await sendEmail(userDetails.email, subject, text, html)

      // Send confirmation email to the admin
      const adminEmail = 'fatema.jadeed266@gmail.com'
      const adminSubject = `New Booking Alert: ${userDetails.name}`
      const adminText = `Admin Notification:\n\nA new booking has been created by ${
        userDetails.name
      }.\n\nService: "${serviceExists.name}"\nBooking Date: ${new Date(
        bookingDate
      ).toLocaleString()}\nStatus: ${status}\n\nPlease check the system for more details.`
      const adminHtml = `
      <h1>New Booking Alert</h1>
      <p>Admin Notification:</p>
      <p>A new booking has been created by <strong>${
        userDetails.name
      }</strong>.</p>
      <p><strong>Service:</strong> "${serviceExists.name}"</p>
      <p><strong>Booking Date:</strong> ${new Date(
        bookingDate
      ).toLocaleString()}</p>
      <p><strong>Status:</strong> ${status}</p>
      <p>Please check the system for more details.</p>
    `

      // Send the email to the admin
      await sendEmail(adminEmail, adminSubject, adminText, adminHtml)

      return res
        .status(201)
        .json({ message: 'Booking created successfully', booking: newBooking })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  getBookings: async (req, res) => {
    try {
      const bookings = await Booking.find().populate('user service')
      if (bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found' })
      }
      return res.status(200).json(bookings)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  getBookingById: async (req, res) => {
    const id = req.params.id
    try {
      const booking = await Booking.findById(id).populate('user service')
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' })
      }
      return res.status(200).json(booking)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  updateBooking: async (req, res) => {
    const id = req.params.id
    const { bookingDate, status, reminderSent, files } = req.body

    try {
      const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        {
          bookingDate,
          status,
          reminderSent,
          files
        },
        { new: true, runValidators: true }
      )

      if (!updatedBooking) {
        return res.status(404).json({ message: 'Booking not found' })
      }

      return res.status(200).json({
        message: 'Booking updated successfully',
        booking: updatedBooking
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  deleteBooking: async (req, res) => {
    const id = req.params.id

    try {
      const deletedBooking = await Booking.findByIdAndDelete(id)
      if (!deletedBooking) {
        return res.status(404).json({ message: 'Booking not found' })
      }
      return res.status(200).json({ message: 'Booking deleted successfully' })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  getUserBookings: async (req, res) => {
    try {
      const userId = req.params.userId
      console.log('Received userId:', userId)
      console.log('Fetching bookings for userId:', userId)
      //console.log('Fetching bookings for userId:', userId) // Log before querying the database

      const bookings = await Booking.find({ user: userId }).populate('service')

      if (bookings.length === 0) {
        console.log('No bookings found for userId:', userId) // Log when no bookings are found
        return res
          .status(200)
          .json({ message: 'No bookings found for this user.' })
      }

      //console.log('Returning bookings:', bookings) // Log the bookings being returned
      return res.status(200).json(bookings)
    } catch (err) {
      console.log('Error occurred:', err) // Log the error if something goes wrong
      return res.status(500).json({ message: 'Server error' })
    }
  },

  getTotalBookings: async (req, res) => {
    try {
      // Get the current date
      const currentDate = new Date()

      // Define the start of the current month
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      )

      // Define the end of the current month (last day of the month)
      const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      )

      // Get total bookings (all-time)
      const totalBookings = await Booking.countDocuments()

      // Get monthly bookings (from start of the current month to the last day)
      const monthlyBookings = await Booking.countDocuments({
        createdAt: { $gte: startOfMonth, $lt: endOfMonth }
      })

      // Send the response
      res.json({
        totalBookings,
        monthlyBookings
      })
    } catch (error) {
      console.error('Error getting total bookings:', error)
      res.status(500).send('Server Error')
    }
  }
}

module.exports = bookingController

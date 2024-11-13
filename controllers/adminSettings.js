const AdminSettings = require('../models/AdminSettings')

const AdminSettingsController = {
  createAdminSettings: async (req, res) => {
    try {
      const { businessHours, holidays, unavailableDays } = req.body
      const userId = req.userId || req.body.user_id // Make sure `userId` is extracted from authenticated user or request body

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' })
      }

      const newAdminSettings = new AdminSettings({
        userId: userId, // Add user ID here
        businessHours,
        holidays,
        unavailableDays
      })
      console.log(req.body)

      await newAdminSettings.save()
      return res.status(201).json({
        message: 'Admin Settings created successfully',
        adminSettings: newAdminSettings
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  getAdminSettings: async (req, res) => {
    try {
      const userId = req.userId || req.query.userId // Optional: filter by user ID if needed
      const query = userId ? { userId: userId } : {}

      const adminSettings = await AdminSettings.find(query)
      if (adminSettings.length === 0) {
        return res.status(404).json({ message: 'No Admin Settings found' })
      }
      return res.status(200).json(adminSettings)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  getAdminSettingsById: async (req, res) => {
    const id = req.params.id
    try {
      const adminSettings = await AdminSettings.findById(id)
      if (!adminSettings) {
        return res.status(404).json({ message: 'Admin Settings not found' })
      }
      return res.status(200).json(adminSettings)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  updateAdminSettings: async (req, res) => {
    const id = req.params.id
    const { businessHours, holidays, unavailableDays } = req.body
    try {
      const adminSettings = await AdminSettings.findByIdAndUpdate(
        id,
        {
          businessHours,
          holidays,
          unavailableDays
        },
        { new: true, runValidators: true }
      )
      if (!adminSettings) {
        return res.status(404).json({ message: 'Admin Settings not found' })
      }
      res.send({
        message: 'Admin Settings updated successfully',
        adminSettings
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  deleteAdminSettings: async (req, res) => {
    const id = req.params.id
    try {
      const adminSettings = await AdminSettings.findByIdAndDelete(id)
      if (!adminSettings) {
        return res.status(404).json({ message: 'Admin Settings not found' })
      }
      return res.status(200).json({
        message: `Admin settings deleted successfully`
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = AdminSettingsController

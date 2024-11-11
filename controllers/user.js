const User = require('../models/User') // Adjust the path based on your folder structure

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find() // Get all users
      if (!users) {
        return res.status(404).json({ message: 'No users found' })
      }
      return res.status(200).json(users)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  // Delete a user
  deleteUser: async (req, res) => {
    const userId = req.params.id

    try {
      const deletedUser = await User.findByIdAndDelete(userId)
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' })
      }
      return res.status(200).json({ message: 'User deleted successfully' })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = userController

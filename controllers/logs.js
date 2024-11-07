const Logs = require('../models/Logs')

const LogsController = {
  createLogs: async (req, res) => {
    try {
      const { user, exception, type } = req.body
      const newLogs = new Logs({
        user,
        exception,
        type
      })
      console.log(req.body)
      await newLogs.save()
      return res.status(201).json({
        message: 'Logs created successfully',
        logs: newLogs
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  getLogs: async (req, res) => {
    try {
      const logs = await Logs.find()
      if (logs.length === 0) {
        return res.status(404).json({ message: 'No Logs found' })
      }
      return res.status(200).json(logs)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  deleteLogs: async (req, res) => {
    const id = req.params.id
    try {
      const logs = await Logs.findByIdAndDelete(id)
      if (!logs) {
        return res.status(404).json({ message: 'Logs not found' })
      }
      return res.status(200).json({
        message: `logs deleted sucessfully`
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server error' })
    }
  }
}
module.exports = LogsController

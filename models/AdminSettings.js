const mongoose = require("mongoose")

const AdminSettingsSchema = new mongoose.Schema(
  {
    businessHours: { type: String, required: true },
    holidays: { type: [String], required: true },
    unavailableDays: { type: [String], required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("AdminSettings", AdminSettingsSchema)

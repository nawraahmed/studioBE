const mongoose = require("mongoose")

const AdminSettingsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    start: { type: Date, required: true }, // Start date and time
    end: { type: Date, required: true }, // End date and time
    color: { type: String, default: "#85C1E9" }, // Optional color field
  },
  { timestamps: true }
)

module.exports = mongoose.model("AdminSettings", AdminSettingsSchema)

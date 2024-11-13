const mongoose = require("mongoose")

const slotSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  color: { type: String, default: "#85C1E9" },
})

module.exports = mongoose.model("Slot", slotSchema)

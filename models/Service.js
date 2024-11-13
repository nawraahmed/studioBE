const mongoose = require("mongoose")

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    startingPrice: { type: Number, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Service", ServiceSchema)

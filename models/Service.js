const mongoose = require("mongoose")

const ServiceSchema = new mongoose.Schema(
  {
    name_en: { type: String, required: true },
    name_ar: { type: String, required: true },
    description_en: { type: String, required: true },
    description_ar: { type: String, required: true },
    startingPrice: { type: Number, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Service", ServiceSchema)

const mongoose = require("mongoose")

const PackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    discount: { type: Number, required: true },
    servicesIncluded: [{ type: mongoose.Types.ObjectId, ref: "Service" }],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Package", PackageSchema)

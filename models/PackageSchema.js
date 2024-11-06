const mongoose = require("mongoose")

const PackageSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    discount: { type: Number, required: true },
    servicesIncluded: [{ type: Schema.Types.ObjectId, ref: "Service" }],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Package", PackageSchema)

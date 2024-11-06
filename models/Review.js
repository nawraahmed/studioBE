const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Types.ObjectId, ref: "Project", required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Review", ReviewSchema)

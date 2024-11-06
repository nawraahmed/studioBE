const mongoose = require("mongoose")

const LogsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    exception: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Logs", LogsSchema)

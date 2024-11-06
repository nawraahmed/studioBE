const mongoose = require("mongoose")

const LogsSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    exception: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Logs", LogsSchema)

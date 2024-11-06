const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    files: [{ type: String }],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Project", ProjectSchema)

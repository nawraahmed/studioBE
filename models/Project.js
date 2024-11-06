const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    service: { type: mongoose.Types.ObjectId, ref: "Service", required: true },
    files: [{ type: String }],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Project", ProjectSchema)

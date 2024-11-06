const mongoose = require("mongoose")

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    files: [{ type: String }],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Project", ProjectSchema)

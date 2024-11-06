const mongoose = require("mongoose")

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], required: true },
    phoneNumber: { type: String },
    socialMediaLinks: { type: Map, of: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)

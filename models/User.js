const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId
      },
    },

    googleId: { type: String },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    phoneNumber: { type: String },
    socialMediaLinks: { type: Map, of: String },
  },
  { timestamps: true }
)

module.exports = mongoose.models.User || mongoose.model("User", UserSchema)

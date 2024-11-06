const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    service: { type: mongoose.Types.ObjectId, ref: "Service", required: true },
    bookingDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      required: true,
    },
    reminderSent: { type: Boolean, default: false },
    files: [{ type: String }],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Booking", BookingSchema)

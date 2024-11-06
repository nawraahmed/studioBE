const mongoose = require("mongoose")

const BookingHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  },
  { timestamps: true }
)

module.exports = mongoose.model("BookingHistory", BookingHistorySchema)

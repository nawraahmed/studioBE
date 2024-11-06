const mongoose = require("mongoose")

const BookingHistorySchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  },
  { timestamps: true }
)

module.exports = mongoose.model("BookingHistory", BookingHistorySchema)

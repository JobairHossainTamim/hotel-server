const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    room: { type: String, required: true },
    roomId: { type: String, required: true },
    userId: { type: String, required: true },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    totalDays: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, required: true, default: "booked" },
}, { timestamps: true });


const bookingModel = mongoose.model('booking', bookingSchema)
module.exports = bookingModel;

const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');
const moment = require('moment');
const stripe = require('stripe')('sk_test_51Jw1j8CSilcYhWQ0UYSsyI4drDH2EViZjDN1Hnf1P0NY98Dg7dbwovYSN6KJfWFvldjVqfNvwYktKUNtctDUCYeH00Bmk57jYC');
const { v4: uuidv4 } = require('uuid');

router.post("/bookRoom", async (req, res) => {
    const {
        room,
        userId,
        fromDate,
        toDate,
        totalAmount,
        totalDays,
        token
    } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create({
            amount: totalAmount * 100,
            customer: customer.id,
            currency: "bdt",
            receipt_email: token.email,

        }, { idempotencyKey: uuidv4() })

        if (payment) {


            const newBooking = new Booking({
                room: room.name,
                roomId: room._id,
                userId,
                fromDate,
                toDate,
                totalAmount,
                totalDays,
                transactionId: "test123"
            });

            const booking = await newBooking.save();

            const roomTemp = await Room.findOne({ _id: room._id });

            roomTemp.currentBookings.push({
                bookingId: booking._id,
                fromDate: fromDate,
                toDate: toDate,
                userId: userId,
                status: booking.status,
            });

            await roomTemp.save();




        }
        res.send("Payment Successful , Your Room is booked");


    } catch (error) {

        return res.status(400).json({ message: error });

    }
});


router.post('/getBookingByUserId', async (req, res) => {

    try {
        const userId = req.body.userId;
        const bookings = await Booking.find({ userId: userId }).sort({ _id: -1 });
        res.send(bookings);


    } catch (error) {
        return res.status(400).json({ message: error });

    }
});


router.post('/cancelBooking', async (req, res) => {
    const { bookingId, roomId } = req.body;
    try {
        const booking = await Booking.findOne({ _id: bookingId });
        booking.status = "cancelled";
        await booking.save();
        const room = await Room.findOne({ _id: roomId });
        const booked = room.currentBookings;
        const temp = booked.filter(booking => booking.bookingId.toString() !== bookingId);
        room.currentBookings = temp;
        await room.save();
        res.send("Your Room Cancelled  Successfully");


    } catch (error) {
        return res.status(400).json({ message: error });

    }

});


router.get("/getAllBooking", async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;
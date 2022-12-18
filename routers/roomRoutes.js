const express = require('express');
const router = express.Router();
const Room = require('../models/room');


router.get("/getAllRooms", async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/getRoomById", async (req, res) => {

    try {
        const room = await Room.findOne({ _id: req.body.roomId })
        res.send(room)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



router.post("/addRoom", async (req, res) => {
    const { room,
        rentPerDay, maxCount, description, phoneNumber, type, image1, image2, image3 } = req.body

    const newRoom = new Room({
        name: room,
        rentPerDay,
        maxCount, description, phoneNumber,
        type, imageUrls: [image1, image2, image3], currentBookings: []
    })
    try {
        await newRoom.save()
        res.send('New Room Added Successfully')
    } catch (error) {
        return res.status(400).json({ error });
    }
});


module.exports = router;
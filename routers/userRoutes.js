const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post("/register", async (req, res) => {
    try {

        const userExists = await User.findOne(({ email: req.body.email }));
        if (userExists) {
            return res.status(200).send({ message: "This User Already Exist ", success: false });
        }
        else {
            const newUser = new User(req.body);
            const user = await newUser.save();
            res.send("User created successfully")
        }
    } catch (error) {
        return res.status(400).json({ error })
    }


})


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email: email, password: password });
        if (user) {
            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id,
            }

            res.send(temp);
        }
        else {
            return res.status(400).json({ message: "Login Failed" })
        }

    } catch (error) {
        return res.status(400).json({ error })
    }
})


router.get("/getAllUser", async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/deleteUser", async(req, res) => {
  
    const userId = req.body.id

    try {
        await User.findOneAndDelete({_id : userId})
        res.send('User Deleted Successfully');

    } catch (error) {
        return res.status(400).json({ message: error });
    }

});


module.exports = router;
const express = require("express");
require('dotenv').config()
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/DbConfig');
// All routes
const roomRoutes = require("./routers/roomRoutes");
const userRoutes = require("./routers/userRoutes");
const bookingRoutes = require("./routers/bookingsRouter");
// App Required 
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw({ inflate: true, limit: '100kb', type: 'text/xml' }));
app.use(bodyParser.raw({ type: 'application/json' }));

// append
app.use('/api/rooms', roomRoutes)
app.use('/api/user', userRoutes);
app.use('/api/booking', bookingRoutes);







const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () => console.log("Server running on port " + PORT));


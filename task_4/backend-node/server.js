const Booking = require("./booking");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://admin:Amu123@ac-tyonya2-shard-00-00.ouoccvh.mongodb.net:27017,ac-tyonya2-shard-00-01.ouoccvh.mongodb.net:27017,ac-tyonya2-shard-00-02.ouoccvh.mongodb.net:27017/?ssl=true&replicaSet=atlas-dg5vf1-shard-0&authSource=admin&appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Server Running");
});

app.post("/book-seat", async (req, res) => {

    try {

        const booking = new Booking(req.body);

        await booking.save();

        res.status(201).json({
            message: "Booking Saved Successfully",
            booking
        });

    }

    catch(err) {

        res.status(500).json({
            error: err.message
        });

    }

});

app.listen(3000, () => {
    console.log("Server started on port 3000");
    
});
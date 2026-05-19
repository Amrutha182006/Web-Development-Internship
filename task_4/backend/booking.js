const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    timeSlot: {
        type: String,
        required: true
    },

    seatingType: {
        type: String,
        required: true
    },

    contactNumber: {
        type: String,
        required: true
    },

    email: {
        type: String
    }

});

module.exports = mongoose.model("Booking", bookingSchema);
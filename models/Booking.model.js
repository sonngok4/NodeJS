// models/booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Rejected', 'Cancelled'],
        default: 'Pending'
    },
    notes: {
        type: String
    },
    agencyNotes: {
        type: String
    },
    confirmedAt: {
        type: Date
    },
    rejectedAt: {
        type: Date
    },
    cancelledAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
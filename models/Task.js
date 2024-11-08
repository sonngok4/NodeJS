const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['New', 'Pending', 'Done'],
        default: 'New'
    },
    dueDate: {
        type: Date,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);
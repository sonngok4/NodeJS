const mongoose = require('mongoose');

const CaretakerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    hireDate: Date,
    animals: [{
        animal: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' },
        startDate: Date,
        endDate: Date
    }]
});

module.exports = mongoose.model('Caretaker', CaretakerSchema);
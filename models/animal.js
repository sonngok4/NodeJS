const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    name: String,
    species: String,
    weight: Number,
    foodType: String,
    arrivalDate: Date,
    count: Number,
    dailyFoodAmount: Number,
    birthDate: Date,
    caretakers: [{
        caretaker: { type: mongoose.Schema.Types.ObjectId, ref: 'Caretaker' },
        startDate: Date,
        endDate: Date
    }]
});

module.exports = mongoose.model('Animal', AnimalSchema);

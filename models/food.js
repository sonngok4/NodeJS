const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    quantity: Number
});

module.exports = mongoose.model('Food', FoodSchema);
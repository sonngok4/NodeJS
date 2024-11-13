const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    gender: String
});

module.exports = mongoose.model('Buyer', buyerSchema);

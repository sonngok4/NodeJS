// models/User.model.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'], // Define allowed roles
        default: 'user', // Default role
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
const  mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        minLength: 6,
    },
    workExperience: {
        type: Array(Object),
    },
    age: { type: Number },
    role: {
        type: String,
        default: "User",
        enum: ["Admin", "User"],
    },
});

module.exports = mongoose.model("user", userScheme); //==> users



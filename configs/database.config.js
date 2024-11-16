const { default: mongoose } = require("mongoose")


const connectDB = async () => {
    try {
        const conn = mongoose.connect('mongodb://localhost/booking_system');
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.log('MongoDB connection error:', err)
    }
}

module.exports = connectDB;
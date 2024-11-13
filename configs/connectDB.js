const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
// MONGO_URI = mongodb://localhost:27017/tasks-management

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected on ${conn.connection.host}`);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
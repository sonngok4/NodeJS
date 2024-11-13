const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const ConnectToMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);

    } catch (error) {
        console.log("Error to connect to MongoDB", error.message);
        process.exit(1);
    }
}

module.exports = ConnectToMongoDB;

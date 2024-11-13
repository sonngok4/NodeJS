var mongoose = require('mongoose');

const ConnectToMongoDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/NodeJSTutorialDB');
        console.log(`MongoDB connected: ${conn.connection.host}`);

    } catch (error) {
        console.log("Error to connect to MongoDB", error.message);
        process.exit(1);
    }
}

module.exports = ConnectToMongoDB;
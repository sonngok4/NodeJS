// controllers/serviceController.js
const Service = require('../models/Service.model');

const serviceController = {
    // Lấy danh sách dịch vụ
    getAllServices: async (req, res) => {
        try {
            const services = await Service.find({}).select('name description');
            res.json(services);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi lấy danh sách dịch vụ', error: error.message });
        }
    }
};

module.exports = serviceController;
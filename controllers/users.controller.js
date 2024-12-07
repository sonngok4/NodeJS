const User = require('../models/user.model');

class UserController {
    static async getAll(req, res, next) {
        try {
            // Chờ đợi truy vấn find xong, sau đó trả về dữ liệu
            const users = await User.find({});

            // Gửi dữ liệu dưới dạng JSON nếu tìm thấy
            res.json(users);
        } catch (error) {
            // Xử lý lỗi nếu có
            res.status(500).json({ message: "User not found", error: error.message });
        }
    }
}

module.exports = UserController;

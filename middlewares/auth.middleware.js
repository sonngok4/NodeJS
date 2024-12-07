// middleware/auth.js
const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const authMiddleware = (req, res, next) => {
    // Lấy token từ header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Kiểm tra token
    if (!token) {
        return res.status(401).json({ message: 'Không có token, từ chối truy cập' });
    }

    try {
        // Xác minh token
        const decoded = jwt.verify(token, config.JWT_SECRET);

        // Gán thông tin người dùng vào request
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

module.exports = authMiddleware;


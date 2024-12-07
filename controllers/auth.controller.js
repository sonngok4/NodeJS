// controllers/authController.js
const User = require('../models/user.model'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const { registerValidation } = require('../utils/validation.utils');

const authController = {
    // Đăng ký tài khoản
    register: async (req, res) => {
        try {
            // Validate dữ liệu
            const { error } = registerValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const { username, password } = req.body;

            // Kiểm tra username đã tồn tại
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'Tên người dùng đã tồn tại' });
            }

            // Mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Tạo người dùng mới
            const newUser = new User({
                username,
                password: hashedPassword
            });

            await newUser.save();

            res.status(201).json({
                message: 'Đăng ký thành công',
                user: {
                    id: newUser._id,
                    username: newUser.username
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi đăng ký', error: error.message });
        }
    },

    // Đăng nhập
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Tìm người dùng
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
            }

            // Kiểm tra mật khẩu
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
            }

            // Tạo token
            const token = jwt.sign(
                { id: user._id, username: user.username },
                config.JWT_SECRET,
                { expiresIn: config.JWT_EXPIRATION }
            );

            res.json({
                message: 'Đăng nhập thành công',
                token
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi đăng nhập', error: error.message });
        }
    }
};

module.exports = authController;
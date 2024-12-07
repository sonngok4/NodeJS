// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * @route POST /auth/register
 * @desc Đăng ký tài khoản mới
 * @access Public
 */
router.post('/register', authController.register);

/**
 * @route POST /auth/login
 * @desc Đăng nhập và nhận JWT token
 * @access Public
 */
router.post('/login', authController.login);

module.exports = router;


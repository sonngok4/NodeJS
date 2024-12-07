// routes/services.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/services.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @route GET /services
 * @desc Lấy danh sách các dịch vụ
 * @access Private (yêu cầu đăng nhập)
 */
router.get('/', authMiddleware, serviceController.getAllServices);

module.exports = router;
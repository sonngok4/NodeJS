// routes/reservations.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservations.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @route POST /reservations
 * @desc Tạo đặt chỗ mới
 * @access Private
 */
router.post('/', authMiddleware, reservationController.createReservation);

/**
 * @route GET /reservations
 * @desc Lấy danh sách đặt chỗ của người dùng
 * @access Private
 */
router.get('/', authMiddleware, reservationController.getUserReservations);

/**
 * @route DELETE /reservations/:id
 * @desc Xóa một đặt chỗ cụ thể
 * @access Private
 */
router.delete('/:id', authMiddleware, reservationController.deleteReservation);

module.exports = router;
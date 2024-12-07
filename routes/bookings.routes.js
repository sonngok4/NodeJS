// routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking.model');
const moment = require('moment');
const bookingController = require('../controllers/bookings.controller');

// Hiển thị trang chủ với danh sách đặt chỗ
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.render('index', {
            bookings,
            moment,
            message: req.query.message,
            messageType: req.query.type
        });
    } catch (error) {
        res.status(500).render('error', { error });
    }
});

// Form tạo đặt chỗ mới
router.get('/create', (req, res) => {
    res.render('create');
});

// Xử lý tạo đặt chỗ mới
router.post('/create', bookingController.create);

// Form chỉnh sửa đặt chỗ
router.get('/edit/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.redirect('/?message=Không tìm thấy đặt chỗ&type=error');
        }
        res.render('edit', { booking, moment });
    } catch (error) {
        res.status(500).render('error', { error });
    }
});

// Hiển thị trang agency với danh sách đặt chỗ cần xử lý
router.get('/agency', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .sort({ createdAt: -1 })
            .select('customerName phoneNumber bookingDate status createdAt notes');

        res.render('agency', {
            bookings,
            moment,
            message: req.query.message,
            messageType: req.query.type
        });
    } catch (error) {
        res.status(500).render('error', { error });
    }
});

// Xác nhận booking
router.post('/agency/confirm/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.redirect('/agency?message=Không tìm thấy đặt chỗ&type=error');
        }

        booking.status = 'Confirmed';
        booking.confirmedAt = new Date();
        booking.agencyNotes = req.body.agencyNotes;

        await booking.save();

        res.redirect('/agency?message=Đã xác nhận đặt chỗ thành công&type=success');
    } catch (error) {
        res.status(500).render('error', { error });
    }
});

// Từ chối booking
router.post('/agency/reject/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.redirect('/agency?message=Không tìm thấy đặt chỗ&type=error');
        }

        booking.status = 'Rejected';
        booking.rejectedAt = new Date();
        booking.agencyNotes = req.body.agencyNotes;

        await booking.save();

        res.redirect('/agency?message=Đã từ chối đặt chỗ&type=success');
    } catch (error) {
        res.status(500).render('error', { error });
    }
});

// Xử lý cập nhật đặt chỗ
router.post('/edit/:id', bookingController.edit);

// Hủy đặt chỗ
router.post('/cancel/:id', bookingController.cancel);

module.exports = router;

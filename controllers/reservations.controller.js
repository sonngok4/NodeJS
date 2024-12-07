// controllers/reservationController.js
const { decode } = require('jsonwebtoken');
const Reservation = require('../models/Reservation.model');
const { reservationValidation } = require('../utils/validation.utils');
const User = require('../models/user.model');

const reservationController = {
    // Tạo đặt chỗ mới
    createReservation: async (req, res) => {
        try {
            // Validate dữ liệu
            const { error } = reservationValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const { service_id, date, time, number_of_people } = req.body;

            // Tạo đặt chỗ mới
            const newReservation = new Reservation({
                user_id: req.user.id,
                service_id,
                date,
                time,
                number_of_people
            });

            await newReservation.save();

            res.status(201).json({
                message: 'Đặt chỗ thành công',
                reservation: newReservation
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi tạo đặt chỗ', error: error.message });
        }
    },

    // Lấy danh sách đặt chỗ của người dùng
    getUserReservations: async (req, res) => {
        try {
            console.log(req.user.id);
            const reservations = await Reservation.find({ user_id: req.user.id })
                .populate('service_id', 'name description');
            res.json(reservations);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi lấy danh sách đặt chỗ', error: error.message });
        }
    },

    // Xóa đặt chỗ
    deleteReservation: async (req, res) => {
        try {
            const reservation = await Reservation.findOneAndDelete({
                _id: req.params.id,
                user_id: req.user.id
            });

            if (!reservation) {
                return res.status(404).json({ message: 'Không tìm thấy đặt chỗ' });
            }

            res.json({ message: 'Xóa đặt chỗ thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi xóa đặt chỗ', error: error.message });
        }
    }
};

module.exports = reservationController;
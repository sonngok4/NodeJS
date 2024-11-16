
const Booking = require('../models/Booking');
class bookingController {
    static async index(req, res) {
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
    }


    static async create(req, res) {
        try {
            const { customerName, date, time } = req.body;

            // Kiểm tra trùng lịch
            const existingBooking = await Booking.findOne({
                date: new Date(date),
                time: time,
                status: { $ne: 'Cancelled' }
            });

            if (existingBooking) {
                return res.redirect('/?message=Thời gian này đã có người đặt&type=error');
            }

            const booking = new Booking({
                customerName,
                date,
                time,
                status: 'Pending'
            });

            await booking.save();
            res.redirect('/?message=Đặt chỗ thành công&type=success');
        } catch (error) {
            res.status(500).render('error', { error });
        }
    }

    static async edit(req, res) {
        try {
            const { customerName, date, time } = req.body;

            // Kiểm tra trùng lịch
            const existingBooking = await Booking.findOne({
                _id: { $ne: req.params.id },
                date: new Date(date),
                time: time,
                status: { $ne: 'Cancelled' }
            });

            if (existingBooking) {
                return res.redirect(`/edit/${req.params.id}?message=Thời gian này đã có người đặt&type=error`);
            }

            await Booking.findByIdAndUpdate(req.params.id, {
                customerName,
                date,
                time
            });

            res.redirect('/?message=Cập nhật thành công&type=success');
        } catch (error) {
            res.status(500).render('error', { error });
        }
    }

    static async cancel(req, res) {
        try {
            await Booking.findByIdAndUpdate(req.params.id, {
                status: 'Cancelled'
            });
            res.redirect('/?message=Đã hủy đặt chỗ&type=success');
        } catch (error) {
            res.status(500).render('error', { error });
        }
    }
}

module.exports = bookingController;
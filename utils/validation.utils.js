// utils/validation.js
const Joi = require('joi');

const validations = {
    // Validation cho đăng ký người dùng
    registerValidation: (data) => {
        const schema = Joi.object({
            username: Joi.string()
                .min(3)
                .max(50)
                .required()
                .trim(),
            password: Joi.string()
                .min(6)
                .required()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        });

        return schema.validate(data);
    },

    // Validation cho đặt chỗ
    reservationValidation: (data) => {
        const schema = Joi.object({
            service_id: Joi.string()
                .required(),
            date: Joi.date()
                .min('now')
                .required(),
            time: Joi.string()
                .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
                .required(),
            number_of_people: Joi.number()
                .min(1)
                .max(20)
                .required()
        });

        return schema.validate(data);
    }
};

module.exports = validations;
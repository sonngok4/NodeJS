const express = require('express');
const router = express.Router();
const Buyer = require('../models/buyer');

router.get('/', async (req, res) => {
    try {
        const buyers = await Buyer.find({}); // Lấy tất cả buyers khi trang mới load
        res.render('buyers', { buyers, searchResults: null, title: 'Buyers Management', error: null });
    } catch (error) {
        res.render('buyers', {
            buyers: [],
            searchResults: null,
            error: 'Lỗi khi tải dữ liệu'
        });
    }
});

router.post('/search', async (req, res) => {
    const { searchType, ageValue, emailDomain, gender, name } = req.body;
    let query = {};

    try {
        const allBuyers = await Buyer.find({}); // Dữ liệu gốc để hiển thị khi reset

        switch (searchType) {
            case 'above20':
                query = { age: { $gt: 20 } };
                break;
            case 'above23':
                query = { age: { $gte: 23 } };
                break;
            case 'below20':
                query = { age: { $lte: 20 } };
                break;
            case 'age20or30':
                query = { age: { $in: [20, 30] } };
                break;
            case 'dongaemail':
                query = { email: /donga\.edu\.vn$/ };
                break;
            case 'male':
                query = { gender: 'nam' };
                break;
            case 'vanorvan':
                query = { name: { $regex: /(Văn|Vân)/, $options: 'i' } };
                break;
            case 'ngocmale':
                query = {
                    name: { $regex: /Ngọc/, $options: 'i' },
                    gender: 'nam'
                };
                break;
            case 'custom':
                if (ageValue) {
                    const [operator, value] = ageValue.split(' ');
                    switch (operator) {
                        case '>':
                            query.age = { $gt: parseInt(value) };
                            break;
                        case '>=':
                            query.age = { $gte: parseInt(value) };
                            break;
                        case '<':
                            query.age = { $lt: parseInt(value) };
                            break;
                        case '<=':
                            query.age = { $lte: parseInt(value) };
                            break;
                        case '=':
                            query.age = parseInt(value);
                            break;
                    }
                }
                if (emailDomain) {
                    query.email = new RegExp(emailDomain + '$');
                }
                if (gender) {
                    query.gender = gender;
                }
                if (name) {
                    query.name = { $regex: name, $options: 'i' };
                }
                break;
        }

        const searchResults = await Buyer.find(query);
        res.render('buyers', {
            buyers: allBuyers,
            title: 'Buyers Management',
            error: null,
            searchResults
        });
    } catch (error) {
        res.render('buyers', {
            buyers: [],
            searchResults: null,
            error: 'Lỗi khi tìm kiếm'
        });
    }
});

module.exports = router;
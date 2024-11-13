var express = require('express');
var router = express.Router();

const HomeController = require('../controllers/home_controller.js');

/* GET home page. */
router.get('/', HomeController.index);

router.get('/about', HomeController.about);

module.exports = router;

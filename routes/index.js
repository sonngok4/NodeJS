var express = require('express');
const HomeController = require('../controllers/home_controller');
var router = express.Router();

/* GET home page. */
router.get('/', HomeController.index);

router.get('/about', HomeController.about);

module.exports = router;

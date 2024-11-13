var express = require('express');
var router = express.Router();
const vehiclePlates = require('../vietnameseVehiclePlates.json');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/api/plates', (req, res) => {
  const provinces = [...new Set(vehiclePlates.map(plate => plate.province))];
  res.json(provinces);
});

router.get('/api/plates/:province', (req, res) => {
  const province = req.params.province;
  const plateNumber = vehiclePlates.find(plate => plate.province === province)?.plateNumber || '';
  res.json({ plateNumber });
  console.log(plateNumber);
});

module.exports = router;
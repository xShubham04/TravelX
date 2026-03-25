const express = require('express');
const router = express.Router();
const { searchHotels, getHotel } = require('../controllers/hotel');

router.get('/', searchHotels);
router.get('/:id', getHotel);

module.exports = router;

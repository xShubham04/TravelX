const express = require('express');
const router = express.Router();
const { searchHotels, getHotel, getSimilarHotels } = require('../controllers/hotel');

router.get('/', searchHotels);
router.get('/:id', getHotel);
router.get('/:id/similar', getSimilarHotels);

module.exports = router;

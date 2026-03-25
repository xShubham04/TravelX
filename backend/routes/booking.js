const express = require('express');
const router = express.Router();
const { bookHotel, getUserBookings, cancelBooking } = require('../controllers/booking');
const protectRoute = require('../middleware/auth');

router.post('/', protectRoute, bookHotel);
router.get('/', protectRoute, getUserBookings);
router.delete('/:id', protectRoute, cancelBooking);

module.exports = router;

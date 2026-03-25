const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  guestName: { type: String, required: true },
  checkInDate: { type: String, required: true },
  checkOutDate: { type: String, required: true },
  status: { type: String, default: 'confirmed' }
});

module.exports = mongoose.model('Booking', bookingSchema);

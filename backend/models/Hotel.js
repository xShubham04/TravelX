const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  availableDates: [{ type: String }], // format: YYYY-MM-DD
  isBooked: { type: Boolean, default: false }
});

module.exports = mongoose.model('Hotel', hotelSchema);

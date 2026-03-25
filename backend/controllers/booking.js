const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');

exports.bookHotel = async (req, res) => {
  try {
    const { hotelId, guestName, checkInDate, checkOutDate } = req.body;
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    if (hotel.isBooked) return res.status(400).json({ message: "Hotel unavailable" });

    // Assuming booking for a day marks it completely booked for simplicity
    hotel.isBooked = true;
    await hotel.save();

    const booking = new Booking({
      user: req.user.id,
      hotel: hotelId,
      guestName,
      checkInDate,
      checkOutDate
    });
    await booking.save();

    res.json({ message: "Hotel booked successfully", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('hotel', 'name location price');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    // Find the booking to make sure it belongs to the logged in user
    const booking = await Booking.findOne({ _id: bookingId, user: req.user.id });
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found or not authorized" });
    }

    // Make the hotel available again
    const hotel = await Hotel.findById(booking.hotel);
    if (hotel) {
      hotel.isBooked = false;
      await hotel.save();
    }

    // Delete the booking record
    await Booking.findByIdAndDelete(bookingId);

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

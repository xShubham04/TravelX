const Hotel = require('../models/Hotel');

exports.searchHotels = async (req, res) => {
  try {
    const { location } = req.query;
    let query = { isBooked: false }; // Only show available hotels on the front page
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    const hotels = await Hotel.find(query);
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSimilarHotels = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Find similar hotels based on Location OR Price range (within $3000), excluding the current one
    const similarHotels = await Hotel.find({
      _id: { $ne: hotel._id },
      isBooked: false,
      $or: [
        { location: hotel.location },
        { price: { $gte: hotel.price - 3000, $lte: hotel.price + 3000 } }
      ]
    }).limit(3);

    res.json(similarHotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

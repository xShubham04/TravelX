const Hotel = require('../models/Hotel');

exports.searchHotels = async (req, res) => {
  try {
    const { location } = req.query;
    let query = {};
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

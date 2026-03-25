const mongoose = require('mongoose');
require('dotenv').config();
const Hotel = require('./models/Hotel');

const hotelsData = [
  { name: 'Ocean View Resort', location: 'Goa', price: 5000, availableDates: ['2026-04-10', '2026-04-15'], isBooked: false },
  { name: 'Mountain Retreat', location: 'Manali', price: 3000, availableDates: ['2026-05-01', '2026-05-10'], isBooked: false },
  { name: 'City Central Hotel', location: 'Mumbai', price: 7000, availableDates: ['2026-06-12', '2026-06-13'], isBooked: false },
  { name: 'Desert Safari Camp', location: 'Jaisalmer', price: 4000, availableDates: ['2026-03-30', '2026-04-05'], isBooked: false },
  { name: 'Taj Mahal Palace', location: 'Mumbai', price: 15000, availableDates: ['2026-04-01', '2026-04-30'], isBooked: false },
  { name: 'Royal Oasis Residency', location: 'Jaipur', price: 6000, availableDates: ['2026-05-15', '2026-05-20'], isBooked: false },
  { name: 'Tea Garden Inn', location: 'Darjeeling', price: 3500, availableDates: ['2026-06-01', '2026-06-15'], isBooked: false },
  { name: 'Backwaters Paradise', location: 'Kerala', price: 8000, availableDates: ['2026-04-20', '2026-04-25'], isBooked: false },
  { name: 'Himalayan Heights', location: 'Shimla', price: 4500, availableDates: ['2026-05-05', '2026-05-12'], isBooked: false },
  { name: 'Sunset Beach House', location: 'Andaman', price: 9000, availableDates: ['2026-03-25', '2026-04-02'], isBooked: false },
  { name: 'Cultural Boutique Hotel', location: 'Varanasi', price: 2500, availableDates: ['2026-06-05', '2026-06-10'], isBooked: false },
  { name: 'Silicon Valley Suites', location: 'Bangalore', price: 5500, availableDates: ['2026-04-05', '2026-04-10'], isBooked: false },
  { name: 'Lake Pichola Palace', location: 'Udaipur', price: 12000, availableDates: ['2026-05-20', '2026-05-25'], isBooked: false },
  { name: 'Trekker\'s Base Camp', location: 'Rishikesh', price: 2000, availableDates: ['2026-04-10', '2026-04-20'], isBooked: false },
  { name: 'Pearl City Hotel', location: 'Hyderabad', price: 4800, availableDates: ['2026-06-15', '2026-06-20'], isBooked: false },
  { name: 'French Quarter Inn', location: 'Pondicherry', price: 5200, availableDates: ['2026-03-28', '2026-04-04'], isBooked: false },
  { name: 'Forest Eco Lodge', location: 'Coorg', price: 4200, availableDates: ['2026-05-10', '2026-05-15'], isBooked: false },
  { name: 'Capital Executive Stay', location: 'New Delhi', price: 6500, availableDates: ['2026-04-12', '2026-04-18'], isBooked: false },
  { name: 'Golden Temple Guest House', location: 'Amritsar', price: 1800, availableDates: ['2026-06-01', '2026-06-05'], isBooked: false },
  { name: 'Corbett Wildlife Lodge', location: 'Jim Corbett', price: 7500, availableDates: ['2026-04-22', '2026-04-28'], isBooked: false },
  { name: 'The Leela Palace', location: 'Chennai', price: 14000, availableDates: ['2026-04-10', '2026-04-15'], isBooked: false },
  { name: 'ITC Grand Chola', location: 'Chennai', price: 16000, availableDates: ['2026-05-01', '2026-05-05'], isBooked: false },
  { name: 'Oberoi Amarvilas', location: 'Agra', price: 20000, availableDates: ['2026-03-28', '2026-04-02'], isBooked: false },
  { name: 'Umaid Bhawan Palace', location: 'Jodhpur', price: 25000, availableDates: ['2026-05-15', '2026-05-20'], isBooked: false },
  { name: 'Rambagh Palace', location: 'Jaipur', price: 22000, availableDates: ['2026-04-20', '2026-04-25'], isBooked: false },
  { name: 'Taj Falaknuma Palace', location: 'Hyderabad', price: 18000, availableDates: ['2026-06-10', '2026-06-15'], isBooked: false },
  { name: 'Wildflower Hall', location: 'Shimla', price: 15500, availableDates: ['2026-04-05', '2026-04-10'], isBooked: false },
  { name: 'JW Marriott', location: 'Pune', price: 9000, availableDates: ['2026-05-20', '2026-05-25'], isBooked: false },
  { name: 'Conrad', location: 'Pune', price: 8500, availableDates: ['2026-04-12', '2026-04-18'], isBooked: false },
  { name: 'The Zuri White Sands', location: 'Goa', price: 11000, availableDates: ['2026-04-01', '2026-04-07'], isBooked: false },
  { name: 'Kumarakom Lake Resort', location: 'Kerala', price: 13000, availableDates: ['2026-05-05', '2026-05-10'], isBooked: false },
  { name: 'Evolve Back', location: 'Hampi', price: 17000, availableDates: ['2026-06-01', '2026-06-06'], isBooked: false },
  { name: 'The Serai', location: 'Bandipur', price: 12500, availableDates: ['2026-04-15', '2026-04-20'], isBooked: false },
  { name: 'Vythiri Resort', location: 'Kumarakom', price: 10500, availableDates: ['2026-05-10', '2026-05-15'], isBooked: false },
  { name: 'Taj Madikeri Resort', location: 'Coorg', price: 14500, availableDates: ['2026-04-08', '2026-04-13'], isBooked: false },
  { name: 'Orange County', location: 'Kabini', price: 16500, availableDates: ['2026-05-22', '2026-05-27'], isBooked: false },
  { name: 'Dune Elephant Village', location: 'Pondicherry', price: 6500, availableDates: ['2026-04-25', '2026-04-30'], isBooked: false },
  { name: 'Radisson Blu', location: 'Mysore', price: 8000, availableDates: ['2026-06-05', '2026-06-10'], isBooked: false },
  { name: 'Grand Hyatt', location: 'Kochi', price: 10000, availableDates: ['2026-04-02', '2026-04-08'], isBooked: false },
  { name: 'Novotel', location: 'Visakhapatnam', price: 5500, availableDates: ['2026-05-18', '2026-05-23'], isBooked: false },
  { name: 'ITC Windsor', location: 'Bengaluru', price: 11500, availableDates: ['2026-04-18', '2026-04-24'], isBooked: false },
  { name: 'Taj West End', location: 'Bengaluru', price: 12000, availableDates: ['2026-06-12', '2026-06-16'], isBooked: false },
  { name: 'The Paul', location: 'Bengaluru', price: 7000, availableDates: ['2026-05-02', '2026-05-07'], isBooked: false },
  { name: 'Windflower Resort', location: 'Wayanad', price: 9500, availableDates: ['2026-04-28', '2026-05-03'], isBooked: false },
  { name: 'Banasura Hill Resort', location: 'Wayanad', price: 8500, availableDates: ['2026-05-14', '2026-05-19'], isBooked: false },
  { name: 'Spice Tree', location: 'Munnar', price: 10500, availableDates: ['2026-04-05', '2026-04-10'], isBooked: false },
  { name: 'Blanket Hotel', location: 'Munnar', price: 11000, availableDates: ['2026-06-20', '2026-06-25'], isBooked: false },
  { name: 'Chandy\'s Windy Woods', location: 'Munnar', price: 9000, availableDates: ['2026-05-25', '2026-05-30'], isBooked: false },
  { name: 'Niraamaya Retreats', location: 'Kovalam', price: 15000, availableDates: ['2026-04-12', '2026-04-17'], isBooked: false },
  { name: 'Taj Green Cove', location: 'Kovalam', price: 13500, availableDates: ['2026-05-08', '2026-05-13'], isBooked: false }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travelx')
  .then(async () => {
    console.log('MongoDB connected');
    await Hotel.deleteMany({});
    await Hotel.insertMany(hotelsData);
    console.log('Hotels seeded successfully');
    process.exit();
  })
  .catch(err => console.log(err));

const fs = require('fs');
const moreHotels = [
  { name: 'The Lalit', location: 'New Delhi', price: 10000, availableDates: ['2026-04-10', '2026-04-15'], isBooked: false },
  { name: 'Trident', location: 'Nariman Point, Mumbai', price: 11500, availableDates: ['2026-05-01', '2026-05-05'], isBooked: false },
  { name: 'Taj Lands End', location: 'Mumbai', price: 13000, availableDates: ['2026-04-01', '2026-04-06'], isBooked: false },
  { name: 'Munjoh Ocean Resort', location: 'Andaman', price: 8500, availableDates: ['2026-06-12', '2026-06-16'], isBooked: false },
  { name: 'Symphony Samudra', location: 'Andaman', price: 9500, availableDates: ['2026-04-20', '2026-04-25'], isBooked: false },
  { name: 'Barefoot at Havelock', location: 'Andaman', price: 12500, availableDates: ['2026-05-10', '2026-05-15'], isBooked: false },
  { name: 'Sea Shell Resort', location: 'Andaman', price: 7500, availableDates: ['2026-04-12', '2026-04-18'], isBooked: false },
  { name: 'Taj Exotica', location: 'Goa', price: 16000, availableDates: ['2026-04-10', '2026-04-15'], isBooked: false },
  { name: 'Alila Diwa', location: 'Goa', price: 14500, availableDates: ['2026-05-05', '2026-05-10'], isBooked: false },
  { name: 'W Goa', location: 'Goa', price: 18000, availableDates: ['2026-06-01', '2026-06-06'], isBooked: false },
  { name: 'Caravela Beach Resort', location: 'Goa', price: 10500, availableDates: ['2026-04-15', '2026-04-20'], isBooked: false },
  { name: 'Novotel Goa Resort', location: 'Goa', price: 9500, availableDates: ['2026-05-20', '2026-05-25'], isBooked: false },
  { name: 'Radisson Blu Resort', location: 'Goa', price: 8500, availableDates: ['2026-04-05', '2026-04-10'], isBooked: false },
  { name: 'Taj Holiday Village', location: 'Goa', price: 13500, availableDates: ['2026-06-10', '2026-06-15'], isBooked: false },
  { name: 'The Leela', location: 'Goa', price: 19000, availableDates: ['2026-04-10', '2026-04-15'], isBooked: false },
  { name: 'Kenilworth Resort', location: 'Goa', price: 8000, availableDates: ['2026-05-01', '2026-05-05'], isBooked: false },
  { name: 'Grand Hyatt', location: 'Goa', price: 15500, availableDates: ['2026-04-01', '2026-04-06'], isBooked: false },
  { name: 'ITC Grand Goa', location: 'Goa', price: 14000, availableDates: ['2026-05-15', '2026-05-20'], isBooked: false },
  { name: 'Marriott Resort & Spa', location: 'Goa', price: 12500, availableDates: ['2026-04-20', '2026-04-25'], isBooked: false },
  { name: 'Le Meridien', location: 'Goa', price: 11500, availableDates: ['2026-06-05', '2026-06-10'], isBooked: false },
  { name: 'Taj Mahal Tower', location: 'Mumbai', price: 12000, availableDates: ['2026-04-12', '2026-04-18'], isBooked: false },
  { name: 'The St. Regis', location: 'Mumbai', price: 15000, availableDates: ['2026-05-10', '2026-05-15'], isBooked: false },
  { name: 'ITC Maratha', location: 'Mumbai', price: 11000, availableDates: ['2026-04-05', '2026-04-10'], isBooked: false },
  { name: 'Sahara Star', location: 'Mumbai', price: 10500, availableDates: ['2026-06-12', '2026-06-16'], isBooked: false },
  { name: 'Grand Hyatt Mumbai', location: 'Mumbai', price: 13500, availableDates: ['2026-04-25', '2026-04-30'], isBooked: false },
  { name: 'JW Marriott Juhu', location: 'Mumbai', price: 14500, availableDates: ['2026-05-20', '2026-05-25'], isBooked: false },
  { name: 'Novotel Juhu', location: 'Mumbai', price: 9500, availableDates: ['2026-04-10', '2026-04-15'], isBooked: false },
  { name: 'Sofitel', location: 'Mumbai', price: 12500, availableDates: ['2026-06-01', '2026-06-05'], isBooked: false },
  { name: 'Trident Bandra Kurla', location: 'Mumbai', price: 11500, availableDates: ['2026-05-10', '2026-05-15'], isBooked: false },
  { name: 'Leela Ambience', location: 'Gurugram', price: 9000, availableDates: ['2026-04-12', '2026-04-18'], isBooked: false },
  { name: 'Taj Palace', location: 'New Delhi', price: 12000, availableDates: ['2026-05-01', '2026-05-05'], isBooked: false },
  { name: 'ITC Maurya', location: 'New Delhi', price: 13000, availableDates: ['2026-04-20', '2026-04-25'], isBooked: false },
  { name: 'The Oberoi', location: 'New Delhi', price: 16000, availableDates: ['2026-06-10', '2026-06-15'], isBooked: false },
  { name: 'Le Meridien', location: 'New Delhi', price: 10500, availableDates: ['2026-04-05', '2026-04-10'], isBooked: false },
  { name: 'Andaz', location: 'New Delhi', price: 11500, availableDates: ['2026-05-15', '2026-05-20'], isBooked: false },
  { name: 'Pullman', location: 'New Delhi', price: 9500, availableDates: ['2026-04-10', '2026-04-15'], isBooked: false },
  { name: 'Radisson Blu Plaza', location: 'New Delhi', price: 8000, availableDates: ['2026-06-05', '2026-06-10'], isBooked: false },
  { name: 'Roseate House', location: 'New Delhi', price: 11000, availableDates: ['2026-04-12', '2026-04-18'], isBooked: false },
  { name: 'Shangri-La Eros', location: 'New Delhi', price: 14000, availableDates: ['2026-05-20', '2026-05-25'], isBooked: false },
  { name: 'Taj City Centre', location: 'Gurugram', price: 10000, availableDates: ['2026-04-01', '2026-04-06'], isBooked: false },
  { name: 'The Westin', location: 'Gurugram', price: 10500, availableDates: ['2026-06-12', '2026-06-16'], isBooked: false },
  { name: 'Crowne Plaza', location: 'Gurugram', price: 8500, availableDates: ['2026-04-25', '2026-04-30'], isBooked: false },
  { name: 'Hyatt Regency', location: 'New Delhi', price: 9500, availableDates: ['2026-05-10', '2026-05-15'], isBooked: false },
  { name: 'ITC Rajputana', location: 'Jaipur', price: 10000, availableDates: ['2026-04-10', '2026-04-15'], isBooked: false },
  { name: 'Fairmont', location: 'Jaipur', price: 14000, availableDates: ['2026-06-01', '2026-06-05'], isBooked: false },
  { name: 'The Oberoi Rajvilas', location: 'Jaipur', price: 21000, availableDates: ['2026-04-12', '2026-04-18'], isBooked: false },
  { name: 'Trident', location: 'Jaipur', price: 8500, availableDates: ['2026-05-15', '2026-05-20'], isBooked: false },
  { name: 'Le Meridien', location: 'Jaipur', price: 7500, availableDates: ['2026-04-20', '2026-04-25'], isBooked: false },
  { name: 'Hilton', location: 'Jaipur', price: 8000, availableDates: ['2026-06-10', '2026-06-15'], isBooked: false },
  { name: 'Radisson Blu', location: 'Jaipur', price: 6500, availableDates: ['2026-05-01', '2026-05-05'], isBooked: false }
];

let content = fs.readFileSync('c:/TravelX/backend/seed.js', 'utf8');

// We can inject right before the `];`
let splitContent = content.split('];');
let beforeArr = splitContent[0];
let afterArr = splitContent.slice(1).join('];');

let newStr = ',\\n';
moreHotels.forEach((hotel, idx) => {
  newStr += "  " + JSON.stringify(hotel);
  if (idx < moreHotels.length - 1) {
    newStr += ",\\n";
  } else {
    newStr += "\\n";
  }
});

let finalContent = beforeArr + newStr + "];" + afterArr;
fs.writeFileSync('c:/TravelX/backend/seed.js', finalContent);
console.log('Successfully updated seed.js with 50 more hotels.');

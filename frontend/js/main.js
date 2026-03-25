document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    searchHotels(); // Load all initially
});

async function checkAuthStatus() {
    try {
        const res = await fetch('/api/auth/check');
        const data = await res.json();
        const authLink = document.getElementById('auth-link');
        
        // If not authenticated and we are on home.html, redirect back to index.html (auth page)
        if(!data.authenticated && window.location.pathname.includes('home.html')) {
            window.location.href = '/';
            return;
        }

        if(data.authenticated && authLink) {
            authLink.innerHTML = '<a href="#" onclick="logout()">Logout</a>';
        } else if (authLink) {
            authLink.innerHTML = '<a href="/">Login/Signup</a>';
        }
    } catch(err) {
        console.error(err);
    }
}

async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
}

async function searchHotels() {
    const locInput = document.getElementById('location-input');
    const location = locInput ? locInput.value : '';
    const res = await fetch('/api/hotels?location=' + location);
    const hotels = await res.json();
    
    const container = document.getElementById('hotel-list');
    if(!container) return;
    container.innerHTML = '';
    
    hotels.forEach((hotel, index) => {
        const card = document.createElement('div');
        card.className = 'hotel-card';
        
        const bookedAttr = hotel.isBooked ? 'disabled' : '';
        const btnText = hotel.isBooked ? 'Unavailable' : 'Book Now';
        const dateArg = hotel.availableDates && hotel.availableDates[0] ? hotel.availableDates[0] : '2026-05-01';
        
        // Use a set of rotating placeholder images for better UI
        const dummyImages = [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80'
        ];
        const imgSrc = dummyImages[index % dummyImages.length];
        
        const availableDatesStr = hotel.availableDates && hotel.availableDates.length > 0 
                                  ? hotel.availableDates.join(', ') 
                                  : 'Select later';

        card.innerHTML = 
            "<img src='" + imgSrc + "' class='hotel-img' alt='" + (hotel.name || 'Hotel') + "'>" +
            "<div class='hotel-content'>" +
                "<h3>" + hotel.name + "</h3>" +
                "<div class='hotel-location'>📍 " + hotel.location + "</div>" +
                "<p class='price-tag'>₹" + hotel.price + " / night</p>" +
                "<p><strong>Dates:</strong> " + availableDatesStr + "</p>" +
                "<button class='btn-book' " + bookedAttr + " onclick=\"goToBooking('" + hotel._id + "')\">" +
                    btnText +
                "</button>" +
            "</div>";
        container.appendChild(card);
    });
}

function goToBooking(hotelId) {
    fetch('/api/auth/check')
        .then(res => res.json())
        .then(data => {
            if (!data.authenticated) {
                alert('Please login to book a hotel!');
                window.location.href = '/';
            } else {
                window.location.href = '/book.html?id=' + hotelId;
            }
        })
        .catch(err => {
            console.error(err);
            alert('Something went wrong. Please try again.');
        });
}

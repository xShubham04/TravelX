document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is authenticated
    const authRes = await fetch('/api/auth/check');
    const authData = await authRes.json();
    if (!authData.authenticated) {
        window.location.href = '/';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('id');

    if (!hotelId) {
        window.location.href = '/home.html';
        return;
    }

    let currentHotelPrice = 0;

    // Fetch hotel details to display
    try {
        const res = await fetch(`/api/hotels/${hotelId}`);
        if (res.ok) {
            const hotel = await res.json();
            currentHotelPrice = hotel.price || 0;
            document.getElementById('hotel-name-display').innerText = `Booking: ${hotel.name} (${hotel.location})`;
            
            // Show the price per night below the title if the element exists
            const priceDisplay = document.getElementById('hotel-price-display');
            if(priceDisplay) {
                priceDisplay.innerText = `₹${currentHotelPrice} per night`;
            }

            // Helpful default selection
            if (hotel.availableDates && hotel.availableDates.length > 0) {
                document.getElementById('check-in').value = hotel.availableDates[0];
            }
        } else {
            document.getElementById('hotel-name-display').innerText = `Hotel Not Found`;
        }
    } catch(e) {
        console.error(e);
    }

    // Function to calculate total price dynamically
    function calculateTotal() {
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;
        const totalDisplay = document.getElementById('total-price-display');
        
        if (checkIn && checkOut && currentHotelPrice > 0 && totalDisplay) {
            const startDate = new Date(checkIn);
            const endDate = new Date(checkOut);
            const diffTime = endDate - startDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            if (diffDays > 0) {
                const total = diffDays * currentHotelPrice;
                totalDisplay.innerText = `Total: ₹${total} (${diffDays} night${diffDays > 1 ? 's' : ''})`;
            } else {
                totalDisplay.innerText = 'Total: ₹0 (Invalid dates)';
            }
        }
    }

    // Add event listeners to inputs to update total price
    document.getElementById('check-in').addEventListener('change', calculateTotal);
    document.getElementById('check-out').addEventListener('change', calculateTotal);

    document.getElementById('booking-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const guestName = document.getElementById('guest-name').value;
        const checkInDate = document.getElementById('check-in').value;
        const checkOutDate = document.getElementById('check-out').value;
        
        // Basic valuation
        if (new Date(checkOutDate) <= new Date(checkInDate)) {
            const msgEl = document.getElementById('booking-msg');
            msgEl.innerText = "Check-out date must be after check-in date";
            msgEl.style.color = '#dc3545';
            return;
        }

        const msgEl = document.getElementById('booking-msg');
        msgEl.innerText = "Processing Your Booking...";
        msgEl.style.color = "#007bff";

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hotelId, guestName, checkInDate, checkOutDate })
            });

            if (res.status === 401) {
                alert('Session expired. Please login again.');
                window.location.href = '/';
                return;
            }

            const data = await res.json();

            if (res.ok) {
                msgEl.innerText = 'Booking confirmed! Redirecting... \u2705';
                msgEl.style.color = '#28a745';
                setTimeout(() => { window.location.href = '/home.html'; }, 2000);
            } else {
                msgEl.innerText = data.message || 'Error occurred';
                msgEl.style.color = '#dc3545';
            }
        } catch (err) {
            msgEl.innerText = 'An error occurred while booking';
            msgEl.style.color = '#dc3545';
        }
    });
});

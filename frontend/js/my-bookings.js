document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is authenticated
    try {
        const authRes = await fetch('/api/auth/check');
        const authData = await authRes.json();
        if (!authData.authenticated) {
            window.location.href = '/';
            return;
        }
    } catch(err) {
        console.error('Auth Check Error:', err);
    }

    // Fetch user Bookings
    const bookingsList = document.getElementById('bookings-list');
    
    try {
        const res = await fetch('/api/bookings');
        if (res.status === 401) {
            window.location.href = '/';
            return;
        }

        const bookings = await res.json();
        
        if (bookings.length === 0) {
            bookingsList.innerHTML = `
                <div class="no-bookings">
                    <p>You haven't made any bookings yet! 🗺️</p>
                    <a href="/home.html" style="color: #007bff; text-decoration: none; font-weight: bold;">Explore Hotels</a>
                </div>
            `;
            return;
        }

        bookingsList.innerHTML = ''; // clear loading state

        bookings.forEach(booking => {
            const hotelName = booking.hotel ? booking.hotel.name : 'Unknown Hotel';
            const hotelLocation = booking.hotel ? booking.hotel.location : 'Unknown Location';
            
            const card = document.createElement('div');
            card.className = 'booking-card';
            
            // Calculate total price if possible
            let priceText = '';
            if (booking.hotel && booking.hotel.price && booking.checkInDate && booking.checkOutDate) {
                const startDate = new Date(booking.checkInDate);
                const endDate = new Date(booking.checkOutDate);
                const diffTime = endDate - startDate;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                if (diffDays > 0) {
                    const total = diffDays * booking.hotel.price;
                    priceText = `<div style="margin-top: 10px; font-weight: bold; font-size: 1.1rem; color: #333;">Total Price: ₹${total}</div>`;
                }
            }

            // format dates nicely
            const formatString = (dateStr) => {
                const opts = { year: 'numeric', month: 'short', day: 'numeric' };
                return new Date(dateStr).toLocaleDateString(undefined, opts);
            }

            card.innerHTML = `
                <h3>${hotelName} <span style="font-size:0.9rem; color:#888; font-weight:normal;">(${hotelLocation})</span></h3>
                <div class="booking-details">
                    <div>
                        <strong>Guest:</strong> ${booking.guestName}<br>
                        <strong>Check-in:</strong> ${formatString(booking.checkInDate)}<br>
                        <strong>Check-out:</strong> ${formatString(booking.checkOutDate)}
                    </div>
                    <div style="text-align: right;">
                        <span class="booking-status">${booking.status.toUpperCase()}</span>
                        ${priceText}
                        <button onclick="cancelBooking('${booking._id}')" style="display:block; margin-top:10px; margin-left:auto; background:#dc3545; color:white; border:none; padding:0.5rem 1rem; border-radius:4px; font-weight:bold; cursor:pointer;">Cancel Booking</button>
                    </div>
                </div>
            `;
            bookingsList.appendChild(card);
        });

    } catch(err) {
        console.error(err);
        bookingsList.innerHTML = '<p style="color:red;">Error loading bookings. Please refresh.</p>';
    }
});

// Global cancel booking function
window.cancelBooking = async (bookingId) => {
    if(!confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
        const res = await fetch(`/api/bookings/${bookingId}`, {
            method: 'DELETE'
        });
        
        if (res.ok) {
            alert('Booking cancelled successfully!');
            window.location.reload();
        } else {
            const data = await res.json();
            alert(data.message || 'Failed to cancel booking. Please try again.');
        }
    } catch(err) {
        console.error(err);
        alert('An error occurred while communicating with the server.');
    }
};
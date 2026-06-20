window.addEventListener("DOMContentLoaded", loadBookings);

async function loadBookings() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(
            "http://localhost:8080/my-bookings",

            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "login.html";
            return;
        }

        console.log(response.status);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const bookings = await response.json();

        console.log(bookings);

        const today = new Date().toISOString().split("T")[0];

        const upcoming = bookings.filter(
            (booking) => booking.date >= today && booking.status === "CONFIRMED",
        );

        const history = bookings.filter(
            (booking) => booking.date < today || booking.status === "CANCELLED",
        );

        const upcomingContainer = document.getElementById("upcomingBookings");

        const historyContainer = document.getElementById("bookingHistory");

        upcomingContainer.innerHTML = "";

        historyContainer.innerHTML = "";

        upcoming.forEach((booking) => {
            if (upcoming.length === 0) {
                upcomingContainer.innerHTML = `
    
            <div class="empty-state">
    
                <h3>No Upcoming Reservations</h3>
    
                <p>
                    Book your next dining experience.
                </p>
    
            </div>
        `;
            }
            else {

                upcomingContainer.innerHTML += `

            <div class="booking-card">

            <p>
                Date:
                ${booking.date}
            </p>

            <p>
                Time:
                ${booking.timeSlot}
            </p>

            <p>
                Seating:
                ${booking.seatingType}
            </p>

            <p>
                Status:
                ${booking.status}
            </p>
            
            <p>
                Payment:
                ${booking.paymentStatus}
            </p>
            
            <p>
                Payment ID:
                ${booking.paymentId}
            </p>

            <button
                onclick="cancelBooking(${booking.id})">

                Cancel Booking

            </button>

        </div> `;
            }
        });

        history.forEach((booking) => {
            historyContainer.innerHTML += `

        <div class="booking-card">

            <p>
                Date:
                ${booking.date}
            </p>

            <p>
                Time:
                ${booking.timeSlot}
            </p>

            <p>
                Seating:
                ${booking.seatingType}
            </p>

            <p>
                Status:
                <span class="status-badge ${booking.status.toLowerCase() || "unknown"}">
                    ${booking.status || "N/A"}
                </span>
            </p>
            
            <p>
                Payment:
                <span class="payment-badge ${booking.paymentStatus.toLowerCase() || "unknown"}">
                    ${booking.paymentStatus || "N/A"}
                </span>
            </p>
            
            <p>
                Payment ID:
                ${booking.paymentId?.substring(4)}
            </p>
            <hr>

        </div> `;
        });
    } catch (error) {
        console.log(error);
        alert("Failed to load bookings");
    }
}

async function cancelBooking(id) {
    const token = localStorage.getItem("token");

    try {
        await fetch(
            `http://localhost:8080/cancel/${id}`,

            {
                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        alert("Booking cancelled");

        loadBookings();
    } catch (error) {
        console.log(error);

        alert("Failed to cancel booking");
    }
}

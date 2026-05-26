window.addEventListener(
    "DOMContentLoaded",
    loadBookings
);

async function loadBookings() {

    const token =
        localStorage.getItem("token");

    try {

        const response = await fetch(
            "http://localhost:8080/my-bookings",

            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );

        const bookings =
            await response.json();

        const container =
            document.getElementById(
                "bookingContainer"
            );

        container.innerHTML = "";

        bookings.forEach(booking => {

            container.innerHTML += `

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

                    <button
                        onclick="cancelBooking(${booking.id})">
                        Cancel Booking
                    </button>

                    <hr>

                </div>
            `;
        });

    }

    catch (error) {

        console.log(error);

        alert(
            "Failed to load bookings"
        );
    }
}

async function cancelBooking(id) {

    const token =
        localStorage.getItem("token");

    try {

        await fetch(

            `http://localhost:8080/cancel/${id}`,

            {
                method: "DELETE",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        alert(
            "Booking cancelled"
        );

        loadBookings();

    }

    catch(error) {

        console.log(error);

        alert(
            "Failed to cancel booking"
        );
    }
}
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

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        const upcoming =
            bookings.filter(
                booking =>
                    booking.date >= today &&
                    booking.status === "CONFIRMED"
            );

        const history =
            bookings.filter(
                booking =>
                    booking.date < today ||
                    booking.status === "CANCELLED"
            );


        const upcomingContainer =
            document.getElementById(
                "upcomingBookings"
            );

        const historyContainer =
            document.getElementById(
                "bookingHistory"
            );

        upcomingContainer.innerHTML = "";

        historyContainer.innerHTML = "";

        upcoming.forEach(booking => {

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

            <button
                onclick="cancelBooking(${booking.id})">

                Cancel Booking

            </button>

        </div> `;
        });

        history.forEach(booking => {

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
                ${booking.status}
            </p>

            <hr>

        </div> `;
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

    catch (error) {

        console.log(error);

        alert(
            "Failed to cancel booking"
        );
    }
}
async function loadAllBookings() {

    const response =
        await fetch(
            "http://localhost:8080/admin/bookings"
        );

    const bookings =
        await response.json();

    let revenue = 0;

    bookings.forEach(booking => {

        if (booking.paymentStatus === "PAID") {

            if (booking.seatingType === "indoor")
                revenue += booking.guests * 300;

            else if (booking.seatingType === "outdoor")
                revenue += booking.guests * 450;

            else if (booking.seatingType === "vip")
                revenue += booking.guests * 800;

            else if (booking.seatingType === "vipOutdoor")
                revenue += booking.guests * 1200;
        }
    });

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

    const completed =
        bookings.filter(
            booking =>
                booking.status === "COMPLETED"
        );

    document.getElementById(
        "totalBookings"
    ).innerText =
        bookings.length;

    document.getElementById(
        "upcomingBookings"
    ).innerText =
        upcoming.length;

    document.getElementById(
        "completedBookings"
    ).innerText =
        completed.length;

    document.getElementById(
        "totalRevenue"
    ).innerText =
        `₹${revenue}`;

    const container =
        document.getElementById(
            "allBookings"
        );
    container.innerHTML = "";

    bookings.forEach(booking => {

        container.innerHTML += `

        <div class="booking-card">

            <h3>
                ${booking.name}
            </h3>

            <p>
                ${booking.date}
            </p>

            <p>
                ${booking.timeSlot}
            </p>

            <p>
                ${booking.status}
            </p>

            ${booking.status === "CONFIRMED"
                ? `<button onclick="completeBooking(${booking.id})">
           Complete
       </button>`
                : ""}

        </div>
        `;
    });
}

async function completeBooking(id) {

    await fetch(

        `http://localhost:8080/admin/complete/${id}`,

        {
            method: "PUT"
        }
    );

    loadAllBookings();
}

loadAllBookings();
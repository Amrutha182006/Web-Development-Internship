
const availabilityBtn =
    document.getElementById(
        "checkAvailabilityBtn"
    );

const detailsSection =
    document.getElementById(
        "detailsSection"
    );

const today =
    new Date()
        .toISOString()
        .split("T")[0];

document.getElementById(
    "date"
).min = today;

if (!token) {

    alert(
        "Please login to book you table ! "
    );

    window.location.href =
        "login.html";
}

const form = document.querySelector(".booking-form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const bookingData =
    {

        name: document.getElementById("name").value,

        date: document.getElementById("date").value,

        timeSlot: document.getElementById("time").value,

        seatingType: document.querySelector('input[name="sitting"]:checked').value,

        guests: document.getElementById("guests").value,

        contactNumber: document.getElementById("phone").value

    };


    try {

        const token =
            localStorage.getItem("token");

        console.log(
            localStorage.getItem("token")
        );

        const response = await fetch("http://localhost:8080/book-seat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(bookingData)

        });

        if (!response.ok) {

            throw new Error(
                "Booking failed"
            );
        }
        const data = await response.json();

        console.log("BOOKING SUCCESS");

        document.querySelector(
            ".booking-form"
        ).style.display = "none";

        document.getElementById(
            "successSection"
        ).style.display = "block";

        window.scrollTo({

            top:
                document.querySelector(
                    ".contact-section"
                ).offsetTop,

            behavior: "smooth"
        });

        // form.reset();

    }

    catch (err) {

        console.log(err);

        alert("Something went wrong");

    }

});

availabilityBtn.addEventListener("click", async () => {

    const date =
        document.getElementById(
            "date"
        ).value;

    const time =
        document.getElementById(
            "time"
        ).value;

    const guests =
        document.getElementById(
            "guests"
        ).value;

    const sitting =
        document.querySelector(
            'input[name="sitting"]:checked'
        );

    const availabilityData = {

        date: date,

        timeSlot: time,

        seatingType: sitting.value,

        guests: guests
    };

    try {

        availabilityBtn.disabled = true;

        availabilityBtn.innerText =
            "CHECKING...";

        const response =
            await fetch(

                "http://localhost:8080/check-availability",

                {
                    method: "POST",

                    headers: { "Content-Type": "application/json" },

                    body: JSON.stringify(
                        availabilityData
                    )
                }
            );

        const available = await response.json();

        if (available) {

            detailsSection.style.display =
                "block";

            detailsSection.scrollIntoView({

                behavior: "smooth"
            });

            window.scrollTo({

                top:
                    document.querySelector(
                        ".contact-section"
                    ).offsetTop,

                behavior: "smooth"
            });

        } else {

            alert(
                "Selected slot is unavailable"
            );
        }

    } catch (err) {

        console.log(err);

        alert(
            "Error checking availability"
        );
    }

    availabilityBtn.disabled = false;

    availabilityBtn.innerText = "CHECK AVAILABILITY";
}
);

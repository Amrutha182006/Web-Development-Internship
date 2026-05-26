const form = document.querySelector(".booking-form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const bookingData = {

        name: document.getElementById("name").value,

        date: document.getElementById("date").value,

        timeSlot: document.getElementById("time").value,

        seatingType: document.querySelector('input[name="sitting"]:checked').value,

        contactNumber: document.getElementById("phone").value,

        email: document.getElementById("email").value

    };


    try {

        const token =
            localStorage.getItem("token");

        const response = await fetch("http://localhost:8080/book-seat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(bookingData)

        });

        const data = await response.json();

        console.log(data);

        alert("Table Reserved Successfully!");

        form.reset();

    }

    catch (err) {

        console.log(err);

        alert("Something went wrong");

    }

});
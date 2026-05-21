const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const loginData = {
        email: email,
        password: password
    };

    try {

        const response = await fetch("http://localhost:8080/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            throw new Error("Login Failed");
        }

        const data = await response.json();

        console.log(data);

        localStorage.setItem("token", data.token);

        alert("Login Successful!");

        window.location.href = "index.html";

    } catch (error) {

        console.error(error);

        alert("Invalid email or password");
    }

});
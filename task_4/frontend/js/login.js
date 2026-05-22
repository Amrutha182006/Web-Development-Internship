document
    .getElementById("loginForm")

    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        try {

            const response = await fetch(
                "http://localhost:8080/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            if (!response.ok) {

                throw new Error("Invalid credentials");
            }

            const data = await response.json();

            console.log(data);

            localStorage.setItem(
                "token",
                data.token
            );

            alert("Login Successful");

            window.location.href = "index.html";

        } catch (error) {

            console.error(error);

            alert("Login Failed");
        }
    });
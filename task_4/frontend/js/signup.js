document
    .getElementById("signup-form")

    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        // PASSWORD MATCH CHECK
        if (password !== confirmPassword) {

            alert("Passwords do not match");

            return;
        }

        try {

            const response = await fetch(
                "http://localhost:8080/auth/signup",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );

            // SIGNUP FAILED
            if (!response.ok) {

                const errorText =
                    await response.text();

                alert(errorText);

                return;
            }

            // SUCCESS
            alert("Account Created Successfully");

            // REDIRECT TO LOGIN
            window.location.href =
                "login.html";
        }

        catch (error) {

            console.error(error);

            alert("Server Error");
        }
    });
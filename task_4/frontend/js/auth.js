const token =
    localStorage.getItem("token");

const loginLink =
    document.getElementById(
        "loginLink"
    );

const signupLink =
    document.getElementById(
        "signupLink"
    );

const profileLink =
    document.getElementById(
        "profileLink"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

if (token) {

    if (loginLink)
        loginLink.style.display = "none";

    if (signupLink)
        signupLink.style.display = "none";

} else {

    if (profileLink)
        profileLink.style.display = "none";

    if (logoutBtn)
        logoutBtn.style.display = "none";
}

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",

        () => {

            localStorage.removeItem(
                "token"
            );

            alert("Logged out");

            window.location.href =
                "login.html";
        }
    );
}
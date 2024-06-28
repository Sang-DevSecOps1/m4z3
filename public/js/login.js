const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  userLogin();
});

async function userLogin() {
  const user_email = document.getElementById("userEmailInputId").value;
  const password = document.getElementById("userPasswordInputId").value;

  const credentials = {
    user_email,
    password,
  };

  try {
    const response = await fetch(`http://localhost:3000/auth/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });


    if (response.status === 200) {
      const loggedUser = await response.json();
      alert("You have successfully logged in.");
      window.location = "../views/dashboard.html";

      const userId = loggedUser.userDetails.user_id;
      const userEmail = loggedUser.userDetails.user_email;
      const userPassword = loggedUser.userDetails.password;

      sessionStorage.setItem("user_id", userId);
      sessionStorage.setItem("user_email", userEmail);
      sessionStorage.setItem("password", userPassword);
    };
  } catch (error) {
    console.log(error, "An error occurred while logging in account.");
  }
}

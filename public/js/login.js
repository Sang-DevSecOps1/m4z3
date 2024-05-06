const loginForm = document.getElementById("loginForm");

console.log("Hello Sang");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  userLogin();
});

async function userLogin() {
  const userEmail = document.getElementById("userEmailInputId");
  const password = document.getElementById("userPasswordInputId");

  const credentials = {
    user_email: userEmail,
    password,
  };

  console.log("Hello Sang");
  try {
    const response = await fetch(`http://localhost:1000/auth/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    console.log("Hello Jesus");
    if (response.status === 200) {
      const loggedUser = await response.json();
      console.log(loggedUser);

      alert("You have successfully logged in.");
      const userEmail = loggedUser.user_email;
      const password = loggedUser.password;
      const user_id = loggedUser.user_id;

      sessionStorage.setItem("email", userEmail);
      sessionStorage.setItem("password", password);
      sessionStorage.setItem("user_id", user_id);
    }
  } catch (error) {
    console.log(error, "An error occurred while logging in account.");
  }
}

const signUpForm = document.querySelector("#signUpFormId");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user_name = document.querySelector("#userNameInputId").value;
  const user_email = document.querySelector("#userEmailInputId").value;
  const password = document.querySelector("#userPasswordInputId").value;
  const confirmPassword = document.querySelector(
    "#confirmUserPasswordInputId"
  ).value;

  const nameError = document.querySelector(".nameError");
  const emailError = document.querySelector(".emailError");
  const passwordError = document.querySelector(".passwordError");
  const confirmPasswordError = document.querySelector(".confirmPasswordError");

  if (inputValidation()) {
    signUpUser();
  }

  async function inputValidation() {
    function isValidEmail(user_email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(user_email);
    }

    async function isStrongPassword(password) {
      const upCase = /[A-Z]/;
      const lowCase = /[a-z]/;
      const numberRegex = /[0-9]/;
      const specialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

      return (
        password.length >= 8 &&
        upCase.test(password) &&
        lowCase.test(password) &&
        numberRegex.test(password) &&
        specialChar.test(password)
      );
    }

    if (user_name.trim().length < 3) {
      nameError.innerHTML =
        "Please enter a valid name with at least 3 characters";
      nameError.classList.add("error");
    } else if (!isNaN(user_name)) {
      nameError.innerHTML = "Name cannot be in number format";
      nameError.classList.add("error");
    } else {
      nameError.innerHTML = "";
      nameError.classList.remove("error");
    }

    if (user_email === "") {
      emailError.innerHTML = "Please insert an email address";
      emailError.classList.add("error");
    } else if (!isValidEmail(user_email)) {
      emailError.innerHTML = "Please insert a valid email address";
      emailError.classList.add("error");
    } else {
      emailError.innerHTML = "";
      emailError.classList.remove("error");
    }

    if (password === "") {
      passwordError.innerHTML = "Please type in password";
      passwordError.classList.add("error");
    } else if (!isStrongPassword(password)) {
      passwordError.innerHTML = "Password is weak";
      passwordError.classList.add("error");
    } else {
      passwordError.innerHTML = "";
      passwordError.classList.remove("error");
    }

    if (confirmPassword !== password) {
      confirmPasswordError.innerHTML =
        "Your passwords don't match, input password again";
      confirmPasswordError.classList.add("error");
    } else {
      confirmPasswordError.innerHTML = "";
      confirmPasswordError.classList.remove("error");
    }
  }

  async function signUpUser() {
    const credentials = {
      user_name,
      user_email,
      password,
    };
    
    try {
      const response = await fetch(`http://localhost:3000/auth/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.status === 409) {
        console.log("The email already exists");
        emailError.innerHTML =
          "Email already exists, please use a different email!!";
        emailError.classList.add("error");
        return;
      } else if (response.status === 201) {
        const newUser = await response.json();
        console.log(newUser);

        alert("You have successfully created an account.");
        const userName = newUser.user_name;
        const userEmail = newUser.user_email;
        const password = newUser.password;
        const user_id = newUser.user_id;

        sessionStorage.setItem("name", userName);
        sessionStorage.setItem("email", userEmail);
        sessionStorage.setItem("password", password);
        sessionStorage.setItem("user_id", user_id);
      }
    } catch (error) {
      console.log(error, "An error occurred while creating account.");
    }
  }

  function checkPassword() {
    const passwordCheck = document.getElementById("toggleButton");
    if (password.type === "password") {
      password.type = "text";
      passwordCheck.textContent = "Hide";
    } else {
      password.type = "password";
      passwordCheck.textContent = "Show";
    }
  }
});

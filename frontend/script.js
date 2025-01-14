const signUpHeaderBtn = document.querySelector(".signup-header-btn");
const signInHeaderBtn = document.querySelector(".signin-header-btn");
const logOutHeaderBtn = document.querySelector(".logout-header-btn");

const signUpContainer = document.querySelector(".signup-container");
const signInContainer = document.querySelector(".signin-container");
const signUpErrorDiv = document.querySelector(".signup-error-div");
const signInErrorDiv = document.querySelector(".signin-error-div");

const signUpSubmitBtn = document.querySelector(".signup-submit-btn");
const signInSubmitBtn = document.querySelector(".signin-submit-btn");

const nameDiv = document.querySelector("#name-div");

function showSignInScreen() {
  signUpHeaderBtn.style.display = "none";
  signInContainer.style.display = "none";
  signUpContainer.style.display = "block";
  signInHeaderBtn.style.display = "block";
  nameDiv.style.display = "none";
  logOutHeaderBtn.style.display = "none";
  signUpErrorDiv.style.display = "none";
  signInErrorDiv.style.display = "block";
}

function showSignUpScreen() {
  signUpHeaderBtn.style.display = "block";
  signInContainer.style.display = "block";
  signUpContainer.style.display = "none";
  signInHeaderBtn.style.display = "none";
  nameDiv.style.display = "none";
  logOutHeaderBtn.style.display = "none";
  signUpErrorDiv.style.display = "block";
  signInErrorDiv.style.display = "none";
}

function logOut() {
  localStorage.removeItem("token");
  showSignUpScreen();
}

signUpHeaderBtn.addEventListener("click", showSignInScreen);
signInHeaderBtn.addEventListener("click", showSignUpScreen);
logOutHeaderBtn.addEventListener("click", logOut);

signUpSubmitBtn.addEventListener("click", async () => {
  const username = document.querySelector(".signup-username").value;
  const password = document.querySelector(".signup-password").value;

  const response = await fetch("http://localhost:3000/signup/", {
    headers: { "Content-type": "application/json" },
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!response) {
    signUpErrorDiv.textContent = "User already exists";
    signUpErrorDiv.style.display = "block";
    return;
  }

  const data = await response.json();
  console.log(data);
});

signInSubmitBtn.addEventListener("click", async () => {
  const username = document.querySelector(".signin-username").value;
  const password = document.querySelector(".signin-password").value;

  const response = await fetch("http://localhost:3000/signin/", {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!response) {
    signInErrorDiv.textContent = "Invalid username or password";
    signInErrorDiv.style.display = "block";
    return;
  }

  const data = await response.json();
  console.log(data);

  const token = response.headers.get("token");
  localStorage.setItem("token", token);

  getUserInfo();
});

async function getUserInfo() {
  if (!localStorage.getItem("token")) {
    return;
  }

  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/me/", {
    headers: {
      "content-type": "application/json",
      token: token,
    },
    method: "GET",
  });
  const data = await response.json();

  showUserScreen(data.username);
}

function showUserScreen(username) {
  signUpHeaderBtn.style.display = "none";
  signInHeaderBtn.style.display = "none";
  logOutHeaderBtn.style.display = "block";

  nameDiv.textContent = "Hello, " + username.toUpperCase();
  nameDiv.style.display = "block";

  signInContainer.style.display = "none";
  signUpContainer.style.display = "none";
  signInErrorDiv.style.display = "none";
  signUpErrorDiv.style.display = "none";

  //   renderTodos();
}

getUserInfo();

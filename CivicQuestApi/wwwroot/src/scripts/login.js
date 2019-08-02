const uri = "api/login";
const timeSheetsUrl = "timesheets.html";
const loginButton = document.querySelector(".login-action");
const userTextbox = document.querySelector("input[type='text']");
const passTextbox = document.querySelector("input[type='password']");

loginButton.addEventListener("click", login);

function login() {
  let attempt = {
    userName: userTextbox.value,
    password: passTextbox.value,
  };

  fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attempt),
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = timeSheetsUrl;
      } else {
        userTextbox.value = "";
        passTextbox.value = "";
      }
    })
    .catch(err => {
      console.error(err);
    });
}

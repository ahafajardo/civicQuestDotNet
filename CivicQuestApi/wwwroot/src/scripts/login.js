const uri = "api/login",
  timeSheetsUrl = "timesheets.html";

const loginForm = document.querySelector(".login"),
  userTextbox = document.querySelector("input[type='text']"),
  passTextbox = document.querySelector("input[type='password']");

loginForm.addEventListener("submit", login);

function login(e) {
  e.preventDefault();
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
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        window.location.href = timeSheetsUrl;
      } else {
        console.log(data);
        throw data.title;
      }
    })
    .catch(err => {
      console.error(err);
      userTextbox.value = "";
      passTextbox.value = "";
    });
}

const timeUri = "api/time";
const returnUrl = "/";

window.addEventListener("DOMContentLoaded", getTimesheets);

function getTimesheets() {
  let token = localStorage.getItem("token");
  fetch(timeUri, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then(res => {
    if (res.status == 401) window.location.href = returnUrl;
  });
}

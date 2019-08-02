const timeUri = "api/time";

window.addEventListener("DOMContentLoaded", getTimesheets);

function getTimesheets() {
  let token = localStorage.getItem("token");
  fetch(timeUri, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

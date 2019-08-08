const timeUri = "api/time";
const returnUrl = "/";
let timesheets = [];

window.addEventListener("DOMContentLoaded", getTimesheets);

function getTimesheets() {
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  fetch(timeUri + `/${userId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then(res => {
      if (res.status >= 400 && 500 > res.status) {
        throw "Bad Request";
      }
      return res.json();
    })
    .then(data => {
      timesheets = data.map(timesheet => {
        timesheet.start = timesheet.start.split("T")[1];
        timesheet.end = timesheet.end.split("T")[1];
        return timesheet;
      });
      console.log(timesheets);
    })
    .catch(err => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = returnUrl;
      console.error(err);
    });
}

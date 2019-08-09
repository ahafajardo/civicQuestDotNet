const timeUri = "api/time";
const returnUrl = "/";

const timeEntries = document.querySelector(".time-entries");
const addTimeEntry = document.querySelector(".time-entry--hidden");

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
      timesheets.forEach(timesheet => {
        const timeEntryHTML = document.createElement("div");
        timeEntryHTML.classList.add("time-entry");
        timeEntryHTML.innerHTML = `
        <div class="time-details">
            <div class="time-stamps">
              <div class="time-stamp">
                <p class="time-stamp__text">Start</p>
                <input type="text" class="input time-stamp__input" value="${
  timesheet.start
}" placeholder="00:00:00" disabled="true"/>
              </div>
              <div class="time-stamp">
                <p class="time-stamp__text">End</p>
                <input type="text" class="input time-stamp__input" value="${
  timesheet.end
}" placeholder="00:00:00" disabled="true"/>
              </div>
            </div>
            <!-- /.time-stamps -->
            <div class="time-info">
              <label class="time-info__label">Notes</label>
              <textarea class="input time-info__desc " placeholder="Write notes here..." disabled="true">${
  timesheet.notes
}</textarea>
            </div>
            <!-- /.time-info -->
          </div>
          <!-- /.time-details -->
          <div class="time-actions">
            <a href="#" class="btn btn--primary time-action">start</a>
            <a href="#" class="btn btn--secondary time-action">edit</a>
            <a href="#" class="btn btn--danger time-action">del</a>
          </div>
          <!-- /.time-actions -->
        `;
        timeEntries.appendChild(timeEntryHTML);
      });
    })
    .catch(err => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = returnUrl;
      console.error(err);
    });
}

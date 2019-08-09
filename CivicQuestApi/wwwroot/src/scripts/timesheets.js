const timeUri = "api/time";
const returnUrl = "/";

const timeEntries = document.querySelector(".time-entries");
const addTimeEntry = document.querySelector(".add-time-entry");
const showAddTimeEntryButton = addTimeEntry.querySelector("button");
const addTimeEntryForm = document.querySelector(".time-entry--hidden");
const hideAddTimeEntryButton = addTimeEntryForm.querySelector(".btn--danger");

let timesheets = [];

window.addEventListener("DOMContentLoaded", getTimesheets);
showAddTimeEntryButton.addEventListener("click", toggleAddTimeEntry);
hideAddTimeEntryButton.addEventListener("click", toggleAddTimeEntry);

function toggleAddTimeEntry() {
  addTimeEntry.classList.toggle("add-time-entry--hidden");
  addTimeEntryForm.classList.toggle("time-entry--hidden");
}

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
        timesheet.date = timesheet.start.split("T")[0];
        timesheet.startTime = timesheet.start.split("T")[1];
        timesheet.endTime = timesheet.end.split("T")[1];
        return timesheet;
      });

      const timesheetsHTML = [...timeEntries.querySelectorAll(".time-entry")];

      timesheetsHTML.forEach((timesheet, i) => {
        if (i != 0) timeEntries.removeChild(timesheet);
      });

      timesheets.forEach(timesheet => {
        const timeEntryHTML = document.createElement("div");
        timeEntryHTML.classList.add("time-entry");
        timeEntryHTML.innerHTML = `
        <div class="time-details">
            <div class="time-stamps">
            <div class="time-stamp">
                <p class="time-stamp__text">Date</p>
                <input type="text" class="input time-stamp__input" value="${timesheet.date.replace(
    /-/g,
    "/",
  )}" placeholder="YYYY/DD/MM" disabled="true"/>
            </div>
              <div class="time-stamp">
                <p class="time-stamp__text">Start</p>
                <input type="text" class="input time-stamp__input" value="${
  timesheet.startTime
}" placeholder="00:00:00" disabled="true"/>
              </div>
              <div class="time-stamp">
                <p class="time-stamp__text">End</p>
                <input type="text" class="input time-stamp__input" value="${
  timesheet.endTime
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
            <button class="btn btn--primary time-action">start</button>
            <button class="btn btn--secondary time-action">edit</button>
            <button class="btn btn--danger time-action">del</button>
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

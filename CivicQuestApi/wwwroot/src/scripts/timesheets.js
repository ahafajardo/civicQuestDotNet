const timeUri = "api/time",
  returnUrl = "/";

const timeEntries = document.querySelector(".time-entries"),
  addTimeEntry = document.querySelector(".add-time-entry"),
  showAddTimeEntryButton = addTimeEntry.querySelector("button"),
  addTimeEntryForm = document.querySelector(".time-entry--hidden"),
  addTimeEntryStamps = addTimeEntryForm.querySelectorAll("input"),
  addTimeEntryNotes = addTimeEntryForm.querySelector(".time-info__desc"),
  hideAddTimeEntryButton = addTimeEntryForm.querySelector(".btn--danger"),
  saveAddTimeEntryButton = addTimeEntryForm.querySelector(".btn--secondary"),
  timerAddTimeEntryButton = addTimeEntryForm.querySelector(".btn--primary");

let timesheets = [];

window.addEventListener("DOMContentLoaded", getTimesheets);
saveAddTimeEntryButton.addEventListener("click", saveAddTimeEntry);
showAddTimeEntryButton.addEventListener("click", toggleAddTimeEntry);
hideAddTimeEntryButton.addEventListener("click", toggleAddTimeEntry);

function saveAddTimeEntry() {
  addTimesheet();
}

function toggleAddTimeEntry() {
  addTimeEntry.classList.toggle("add-time-entry--hidden");
  addTimeEntryForm.classList.toggle("time-entry--hidden");
}

function editTimeEntry(button, timeEntry, id) {
  const stamps = timeEntry.querySelectorAll("input"),
    notes = timeEntry.querySelector(".time-info__desc"),
    editButton = timeEntry.querySelector(".btn--secondary"),
    deleteButton = timeEntry.querySelector(".btn--danger");

  if (timeEntry.dataset.editing == "false") {
    stamps.forEach(stamp => stamp.removeAttribute("disabled"));
    notes.removeAttribute("disabled");
    editButton.textContent = "save";
    deleteButton.textContent = "cancel";
    if (button == deleteButton) deleteTimesheet(id);
  } else {
    stamps.forEach(stamp => stamp.setAttribute("disabled", ""));
    notes.setAttribute("disabled", "");
    editButton.textContent = "edit";
    deleteButton.textContent = "del";
    if (button == editButton) updateTimesheet(id, stamps, notes);
    else getTimesheets();
  }
  const editing = timeEntry.getAttribute("data-editing");
  timeEntry.setAttribute("data-editing", editing == "true" ? "false" : "true");
}

function getTimesheets() {
  let token = localStorage.getItem("token"),
    userId = localStorage.getItem("userId");
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
        timeEntryHTML.setAttribute("data-editing", false);
        timeEntryHTML.innerHTML = `
        <div class="time-details">
            <div class="time-stamps">
            <div class="time-stamp">
                <p class="time-stamp__text">Date</p>
                <input type="text" class="input time-stamp__input" value="${timesheet.date.replace(
    /-/g,
    "/",
  )}" placeholder="YYYY/DD/MM" disabled/>
            </div>
              <div class="time-stamp">
                <p class="time-stamp__text">Start</p>
                <input type="text" class="input time-stamp__input" value="${
  timesheet.startTime
}" placeholder="00:00:00" disabled/>
              </div>
              <div class="time-stamp">
                <p class="time-stamp__text">End</p>
                <input type="text" class="input time-stamp__input" value="${
  timesheet.endTime
}" placeholder="00:00:00" disabled/>
              </div>
            </div>
            <!-- /.time-stamps -->
            <div class="time-info">
              <label class="time-info__label">Notes</label>
              <textarea class="input time-info__desc" placeholder="Write notes here..." disabled>${
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
        const editButton = timeEntryHTML.querySelector(".btn--secondary");
        editButton.addEventListener("click", editTimeEntry.bind(editButton, editButton, timeEntryHTML, timesheet.id));
        const deleteButton = timeEntryHTML.querySelector(".btn--danger");
        deleteButton.addEventListener(
          "click",
          editTimeEntry.bind(deleteButton, deleteButton, timeEntryHTML, timesheet.id),
        );
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

function addTimesheet() {
  let token = localStorage.getItem("token"),
    userId = localStorage.getItem("userId");
  const timesheet = {
    userId: userId,
    start: `${addTimeEntryStamps[0].value}T${addTimeEntryStamps[1].value}`,
    end: `${addTimeEntryStamps[0].value}T${addTimeEntryStamps[2].value}`,
    notes: addTimeEntryNotes.value,
  };

  fetch(timeUri + `/${userId}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(timesheet),
  })
    .then(() => {
      addTimeEntryStamps.forEach(stamp => (stamp.value = ""));
      addTimeEntryNotes.value = "";
      toggleAddTimeEntry();
      getTimesheets();
    })
    .catch(err => console.error(err));
}

function updateTimesheet(id, stamps, notes) {
  let token = localStorage.getItem("token"),
    userId = localStorage.getItem("userId");
  const timesheet = {
    id: id,
    userId: userId,
    start: `${stamps[0].value}T${stamps[1].value}`,
    end: `${stamps[0].value}T${stamps[2].value}`,
    notes: notes.value,
  };

  fetch(timeUri + `/${userId}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(timesheet),
  })
    .then(() => {
      stamps.forEach(stamp => (stamp.value = ""));
      notes.value = "";
      getTimesheets();
    })
    .catch(err => console.error(err));
}

function deleteTimesheet(id) {
  let token = localStorage.getItem("token"),
    userId = localStorage.getItem("userId");
  fetch(timeUri + `/${userId}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then(() => getTimesheets())
    .catch(err => console.error(err));
}

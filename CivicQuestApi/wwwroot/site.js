const uri = "api/cq";
const element = document.querySelector("#counter");
const tableBody = document.querySelector("#todos");
const addInput = document.querySelector("#add-name");

let cqs = null;

function getCount(data) {
  let msg = data ? (data > 1 ? "CQs" : "CQ") : "No CQs";
  element.textContent = data ? `${data} ${msg}` : msg;
}

function getData() {
  fetch(uri)
    .then(res => res.json())
    .then(data => {
      while (tableBody.lastChild) tableBody.removeChild(tableBody.lastChild);

      getCount(data.length);

      const tableRows = data.reduce(
        (html, item) =>
          html +
          `
            <tr>
                <td><input type="checkbox" disabled="true" ${item.isComplete ? "checked" : ""}/></td>
                <td>${item.name}</td>
                <td><button onclick="editItem(${item.id})">Edit</button></td>
                <td><button onclick="deleteItem(${item.id})">Delete</button></td>
            </tr>
        `,
        ""
      );

      tableBody.innerHTML = tableRows;
      cqs = data;
    })
    .catch(err => console.error(err));
}

function addItem() {
  const item = {
    name: addInput.value,
    isComplete: false
  };

  fetch(uri, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  }).then(() => {
    getData();
    addInput.value = "";
  });
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: "DELETE"
  })
    .then(() => getData())
    .catch(err => console.error(err));
}

getData();

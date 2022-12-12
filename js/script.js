// tabledata

let data = [
  {
    id: 1372,
    productID: "10001",
    productName: "Test 1",
    amount: "1000",
    customerName: "abc",
    status: 0,
    transactionDate: "2022-07-10 11:14:52",
    createBy: "abc",
    createOn: "2022-07-10 11:14:52",
  },
  {
    id: 1373,
    productID: "10002",
    productName: "Test 2",
    amount: "2000",
    customerName: "abc",
    status: 0,
    transactionDate: "2022-07-11 13:14:52",
    createBy: "abc",
    createOn: "2022-07-10 13:14:52",
  },
  {
    id: 1374,
    productID: "10001",
    productName: "Test 1",
    amount: "1000",
    customerName: "abc",
    status: 0,
    transactionDate: "2022-08-10 12:14:52",
    createBy: "abc",
    createOn: "2022-07-10 12:14:52",
  },
  {
    id: 1375,
    productID: "10002",
    productName: "Test 2",
    amount: "1000",
    customerName: "abc",
    status: 1,
    transactionDate: "2022-08-10 13:10:52",
    createBy: "abc",
    createOn: "2022-07-10 13:10:52",
  },
  {
    id: 1376,
    productID: "10001",
    productName: "Test 1",
    amount: "1000",
    customerName: "abc",
    status: 0,
    transactionDate: "2022-08-10 13:11:52",
    createBy: "abc",
    createOn: "2022-07-10 13:11:52",
  },
  {
    id: 1377,
    productID: "10002",
    productName: "Test 2",
    amount: "2000",
    customerName: "abc",
    status: 0,
    transactionDate: "2022-08-12 13:14:52",
    createBy: "abc",
    createOn: "2022-07-10 13:14:52",
  },
  {
    id: 1378,
    productID: "10001",
    productName: "Test 1",
    amount: "1000",
    customerName: "abc",
    status: 0,
    transactionDate: "2022-08-12 14:11:52",
    createBy: "abc",
    createOn: "2022-07-10 14:11:52",
  },
  {
    id: 1379,
    productID: "10002",
    productName: "Test 2",
    amount: "1000",
    customerName: "abc",
    status: 1,
    transactionDate: "2022-09-13 11:14:52",
    createBy: "abc",
    createOn: "2022-07-10 11:14:52",
  },
  {
    id: 1380,
    productID: "10001",
    productName: "Test 1",
    amount: "1000",
    customerName: "abc",
    status: 0,
    transactionDate: "2022-09-13 13:14:52",
    createBy: "abc",
    createOn: "2022-07-10 13:14:52",
  },
  {
    id: 1381,
    productID: "10002",
    productName: "Test 2",
    amount: "2000",
    customerName: "abc",
    status: 0,
    transactionDate: "2022-09-14 09:11:52",
    createBy: "abc",
    createOn: "2022-07-10 09:11:52",
  },
  {
    id: 1382,
    productID: "10001",
    productName: "Test 1",
    amount: "1000",
    customerName: "abc",
    status: 0,
    transactionDate: "2022-09-14 10:14:52",
    createBy: "abc",
    createOn: "2022-07-10 10:14:52",
  },
  {
    id: 1383,
    productID: "10002",
    productName: "Test 2",
    amount: "1000",
    customerName: "abc",
    status: 1,
    transactionDate: "2022-08-15 13:14:52",
    createBy: "abc",
    createOn: "2022-07-10 13:14:52",
  },
];
let status = [
  {
    id: 0,
    name: "SUCCESS",
  },
  {
    id: 1,
    name: "FAILED",
  },
];

// Table

// Initialize LOCAL STORAGE data
if (localStorage.getItem("data") == null) {
  localStorage.setItem("data", JSON.stringify(data));
} else {
  salesData = JSON.parse(localStorage.getItem("data")) || [];
  localStorage.setItem("data", JSON.stringify(data));
}

// load table data

window.onload = () => {
  loadTableData(data);
};

function loadTableData(data) {
  const tableBody = document.getElementById("tableData");
  let dataHtml = "";

  for (let d of data) {
    dataHtml += `<tr><td>${d.id}</td><td>${d.productID}</td><td>${d.productName}</td><td>${d.amount}</td><td>${d.customerName}</td><td>${d.status}</td><td>${d.transactionDate}</td><td>${d.createBy}</td><td>${d.createOn}</td></tr>`;
  }
  tableBody.innerHTML = dataHtml;
}

// sort

function sortTable(table, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));
  // Sorting per row
  const sortedRows = rows.sort((a, b) => {
    const aColText = a
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    const bColText = b
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();

    return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
  });

  // hilangin data
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  // masukkin data yang udh di sort
  tBody.append(...sortedRows);

  // toggle sort
  table
    .querySelectorAll("th")
    .forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-sort-asc", asc);
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-sort-desc", !asc);
}

// click sort
document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTable(tableElement, headerIndex, !currentIsAscending);
    })
})

// add Data

// function itemUpdate() {
//     if($("#form-id").val() != null && $("#form-id").val() != '') {
//         // add item
//         itemAddToTable();

//         formClear();

//         $("#form-id").focus();
//     }
// }

// function itemAddToTable() {
//     if($("#table-data tbody").length == 0) {
//         $("#table-data").append("<tbody></tbody>");
//     }

//     $("#table-data tbody").append("<tr>" +
//     "<td>" + $("#form-id").val() + "</td>" + 
//     "<td>" + $("#form-product-id").val() + "</td>" + 
//     "<td>" + $("#form-product-name").val() + "</td>" + 
//     "<td>" + $("#form-amount").val() + "</td>" + 
//     "<td>" + $("#form-customer-name").val() + "</td>" + 
//     "<td>" + $("#form-status").val() + "</td>" + 
//     "<td>" + $("#form-transaction-date").val() + "</td>" + 
//     "<td>" + $("#form-create-by").val() + "</td>" + 
//     "<td>" + $("#form-create-on").val() + "</td>" + "</tr>"
//     );
// }

function addData() {
    const form = document.forms["add-data-form"];
}
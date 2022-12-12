// tabledata

// saya coba tanpa menggunakkan framework, karena saya jauh lebih sering diajarkan tanpa framework tapi tentunya kalo saya diberikan waktu lebih saya ingin belajar framework yang tentunya akan sangat membantu seperti react js/bootstrap.
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
  data = JSON.parse(localStorage.getItem("data")) || [];
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
document.querySelectorAll(".table-sortable th").forEach((headerCell) => {
  headerCell.addEventListener("click", () => {
    const tableElement = headerCell.parentElement.parentElement.parentElement;
    const headerIndex = Array.prototype.indexOf.call(
      headerCell.parentElement.children,
      headerCell
    );
    const currentIsAscending = headerCell.classList.contains("th-sort-asc");

    sortTable(tableElement, headerIndex, !currentIsAscending);
  });
});

// add Data

function addData() {
  const form = document.forms["add-data-form"];
  const idText = form["id"].value;
  const productIdText = form["product-id"].value;
  const productNameText = form["product-name"].value;
  const amountText = form["amount"].value;
  const customerText = form["customer-name"].value;
  const statusText = form["status"].value;
  const transactionDateText = form["transaction-date"].value;
  // format tanggal
  const createByText = form["create-by"].value;
  const createOnText = form["create-on"].value;

  // error

  let message = "";

  if (
    !idText ||
    !productIdText ||
    !productNameText ||
    !amountText ||
    !customerText ||
    !statusText ||
    !transactionDateText ||
    !createByText ||
    !createOnText
  ) {
    message = "All field must be filled!";
  }

  if (message) {
    document.getElementById("error").innerHTML = message;
    return false;
  } else {
    let formData = JSON.parse(localStorage.getItem("data")) || [];
    const newData = {
      id: idText,
      productID: productIdText,
      productName: productNameText,
      amount: amountText,
      customerName: customerText,
      status: statusText,
      transactionDate: transactionDateText,
      createBy: createByText,
      createOn: createOnText,
    };
    data.push(newData);
    localStorage.setItem("data", JSON.stringify(data));
    alert("Data Successfully Added");
    return true;
  }
}
// delete data

let formData = JSON.parse(localStorage.getItem("data")) || [];

console.log(JSON.parse(localStorage.getItem("data")));

document.getElementById("select-label").innerHTML = "Delete Data [1 - " + data.length + "] (from the top)";

function deleteData() {
  const form = document.forms["delete-data-form"];
  const selection = form["select"].value;

  let message = "";

  if (!selection) {
    message = "please choose number from data to be deleted!";
  }

  if (message) {
    document.getElementById("error").innerHTML = message;
    return false;
  } else {
    // delete
    message = `
    Are you sure? \n`

    if (confirm(message) == true) {
      data.splice(selection - 1, 1);
      localStorage.setItem("data", JSON.stringify(data));
      alert("Data Successfully Deleted!");
      return true;
    } else {
      return false;
    }
  }
}

// min max

$(document).ready(function () {
  $("#select-data").attr({
    "max" : data.length,
    "min" : 1,
  });
});

/* saya belum bisa ketemu update tanpa menggunakkan framework, 
jadi mungkin bisa update dengan delete data lalu menambahkan ulang data tersebut,
saya juga belum bisa menemukan cara view detail data tanpa framework
*/
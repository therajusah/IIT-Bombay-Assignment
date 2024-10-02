let chemicalsData = JSON.parse(localStorage.getItem("chemicalsData")) || [
  {
    id: 1,
    chemicalName: "Ammonium Persulfate",
    vendor: "LG Chem",
    density: 3525.92,
    viscosity: 60.63,
    packaging: "Bag",
    packSize: 100.0,
    unit: "kg",
    quantity: 6495.18,
  },
  {
    id: 2,
    chemicalName: "Caustic Potash",
    vendor: "Formosa",
    density: 3172.15,
    viscosity: 48.22,
    packaging: "Bag",
    packSize: 100.0,
    unit: "kg",
    quantity: 8751.9,
  },
  {
    id: 3,
    chemicalName: "Dimethylaminopropylamino",
    vendor: "LG Chem",
    density: 8435.37,
    viscosity: 12.62,
    packaging: "Barrel",
    packSize: 75.0,
    unit: "L",
    quantity: 5964.61,
  },
  {
    id: 4,
    chemicalName: "Mono Ammonium Phosphate",
    vendor: "Sinopec",
    density: 1597.65,
    viscosity: 76.51,
    packaging: "Bag",
    packSize: 105.0,
    unit: "kg",
    quantity: 8183.73,
  },
  {
    id: 5,
    chemicalName: "Ferric Nitrate",
    vendor: "DowDuPont",
    density: 364.04,
    viscosity: 14.9,
    packaging: "Bag",
    packSize: 105.0,
    unit: "kg",
    quantity: 4154.33,
  },
  {
    id: 6,
    chemicalName: "n-Pentane",
    vendor: "Sinopec",
    density: 4535.26,
    viscosity: 66.76,
    packaging: "N/A",
    packSize: "N/A",
    unit: "t",
    quantity: 6272.34,
  },
  {
    id: 7,
    chemicalName: "Glycol Ether PM",
    vendor: "LG Chem",
    density: 6495.18,
    viscosity: 72.12,
    packaging: "Bag",
    packSize: 250.0,
    unit: "kg",
    quantity: 8749.54,
  },
  {
    id: 8,
    chemicalName: "Sodium Hydroxide",
    vendor: "BASF",
    density: 2100.12,
    viscosity: 25.3,
    packaging: "Drum",
    packSize: 50.0,
    unit: "kg",
    quantity: 5600.0,
  },
  {
    id: 9,
    chemicalName: "Acetone",
    vendor: "ExxonMobil",
    density: 790.0,
    viscosity: 3.15,
    packaging: "Barrel",
    packSize: 200.0,
    unit: "L",
    quantity: 8400.0,
  },
  {
    id: 10,
    chemicalName: "Benzene",
    vendor: "Shell",
    density: 876.5,
    viscosity: 4.55,
    packaging: "Drum",
    packSize: 180.0,
    unit: "L",
    quantity: 7200.0,
  },
  {
    id: 11,
    chemicalName: "Sulfuric Acid",
    vendor: "Dow Chemical",
    density: 1840.0,
    viscosity: 22.5,
    packaging: "IBC",
    packSize: 1000.0,
    unit: "kg",
    quantity: 9200.0,
  },
  {
    id: 12,
    chemicalName: "Toluene",
    vendor: "Chevron",
    density: 867.0,
    viscosity: 5.6,
    packaging: "Barrel",
    packSize: 160.0,
    unit: "L",
    quantity: 6800.0,
  },
  {
    id: 13,
    chemicalName: "Ethanol",
    vendor: "BP",
    density: 789.0,
    viscosity: 1.2,
    packaging: "Barrel",
    packSize: 200.0,
    unit: "L",
    quantity: 9400.0,
  },
  {
    id: 14,
    chemicalName: "Hydrochloric Acid",
    vendor: "SABIC",
    density: 1190.0,
    viscosity: 8.9,
    packaging: "IBC",
    packSize: 950.0,
    unit: "kg",
    quantity: 7100.0,
  },
  {
    id: 15,
    chemicalName: "Methanol",
    vendor: "Mitsubishi",
    density: 792.0,
    viscosity: 0.6,
    packaging: "Drum",
    packSize: 220.0,
    unit: "L",
    quantity: 8300.0,
  },
];

function populateTable(data) {
  const tbody = document.querySelector("#chemicalTable tbody");
  tbody.innerHTML = "";
  data.forEach((chemical, index) => {
    const newRow = tbody.insertRow();
    newRow.innerHTML = `
            <td>${index + 1}</td>
            <td contenteditable="true">${chemical.chemicalName}</td>
            <td contenteditable="true">${chemical.vendor}</td>
            <td contenteditable="true">${chemical.density}</td>
            <td contenteditable="true">${chemical.viscosity}</td>
            <td contenteditable="true">${chemical.packaging}</td>
            <td contenteditable="true">${chemical.packSize}</td>
            <td contenteditable="true">${chemical.unit}</td>
            <td contenteditable="true">${chemical.quantity}</td>
        `;

    Array.from(newRow.cells).forEach((cell, cellIndex) => {
      if (cellIndex !== 0) {
        cell.addEventListener("focus", function () {
          handleCellFocus(this);
        });
        cell.addEventListener("blur", function () {
          handleCellBlur(this);
        });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateTable(chemicalsData);
});

document.getElementById("addChemical").addEventListener("click", () => {
  const newChemical = {
    id: chemicalsData.length + 1,
    chemicalName: "New Chemical",
    vendor: "Vendor",
    density: "",
    viscosity: "",
    packaging: "N/A",
    packSize: "",
    unit: "N/A",
    quantity: "",
  };
  chemicalsData.push(newChemical);
  populateTable(chemicalsData);
});

document.getElementById("deleteRow").addEventListener("click", () => {
  const selectedRow = document.querySelector("#chemicalTable tr.selected");
  if (selectedRow) {
    const index = selectedRow.rowIndex - 1;
    chemicalsData.splice(index, 1);
    populateTable(chemicalsData);
  }
});

document.getElementById("refreshData").addEventListener("click", () => {
  chemicalsData =
    JSON.parse(localStorage.getItem("chemicalsData")) || chemicalsData;
  populateTable(chemicalsData);
});

document.getElementById("saveData").addEventListener("click", () => {
  const updatedData = Array.from(
    document.querySelectorAll("#chemicalTable tbody tr")
  ).map((row) => ({
    id: chemicalsData[row.rowIndex - 1]?.id || null,
    chemicalName: row.cells[1].innerText,
    vendor: row.cells[2].innerText,
    density: row.cells[3].innerText,
    viscosity: row.cells[4].innerText,
    packaging: row.cells[5].innerText,
    packSize: row.cells[6].innerText,
    unit: row.cells[7].innerText,
    quantity: row.cells[8].innerText,
  }));

  chemicalsData = updatedData;
  localStorage.setItem("chemicalsData", JSON.stringify(updatedData));
  alert("Data saved successfully!");
});

document.getElementById("chemicalTable").addEventListener("click", (event) => {
  const target = event.target;
  const row = target.closest("tr");
  if (row && row.parentNode.tagName.toLowerCase() === "tbody") {
    const selected = document.querySelector("#chemicalTable tr.selected");
    if (selected) {
      selected.classList.remove("selected");
    }
    row.classList.add("selected");
  }
});

let currentColumn = null;
let currentOrder = "asc";

function sortTableByColumn(order) {
  if (!currentColumn) return;

  chemicalsData.sort((a, b) => {
    let valueA = a[currentColumn];
    let valueB = b[currentColumn];

  
    if (!isNaN(parseFloat(valueA)) && !isNaN(parseFloat(valueB))) {
      valueA = parseFloat(valueA);
      valueB = parseFloat(valueB);
    } else {
      valueA = valueA.toString().toLowerCase();
      valueB = valueB.toString().toLowerCase();
    }

    return order === "asc"
      ? valueA > valueB
        ? 1
        : -1
      : valueA < valueB
      ? 1
      : -1;
  });

  populateTable(chemicalsData); 
}

document.getElementById("uparrow").addEventListener("click", () => {
  currentOrder = "asc";
  sortTableByColumn(currentOrder);
});

document.getElementById("downarrow").addEventListener("click", () => {
  currentOrder = "desc";
  sortTableByColumn(currentOrder);
});

document.querySelectorAll("#chemicalTable th").forEach((th, index) => {
  th.addEventListener("click", () => {
    const columnMap = [
      "id",
      "chemicalName",
      "vendor",
      "density",
      "viscosity",
      "packaging",
      "packSize",
      "unit",
      "quantity",
    ];
    currentColumn = columnMap[index];

    document.querySelectorAll("#chemicalTable th").forEach((header) => {
      header.classList.remove("selected-column");
    });
    th.classList.add("selected-column");
  });
});

function handleCellFocus(cell) {
  cell.setAttribute("data-prev-value", cell.innerText);
}

function handleCellBlur(cell) {
  const prevValue = cell.getAttribute("data-prev-value");
  if (prevValue !== cell.innerText) {
    cell.removeAttribute("data-prev-value");
  }
}

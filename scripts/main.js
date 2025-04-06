// Load user name
function insertNameFromFirestore() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get().then(userDoc => {
        const userName = userDoc.data().name;
        document.getElementById("name-goes-here").innerText = userName;
      });
    }
  });
}
insertNameFromFirestore();

// Load age
function insertAgeFromFirestore() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get().then(userDoc => {
        const age = userDoc.data().age;
        document.getElementById("age-goes-here").innerText = age;
      });
    }
  });
}
insertAgeFromFirestore();

// Load gender
function insertGenderFromFirestore() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get().then(userDoc => {
        const gender = userDoc.data().gender;
        document.getElementById("gender-goes-here").innerText = gender;
      });
    }
  });
}
insertGenderFromFirestore();


// Load medications into table
function loadMedicationsFromFirestore() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const medicationsRef = db.collection("users").doc(user.uid).collection("medications");

      medicationsRef.get().then(querySnapshot => {
        const tableBody = document.getElementById("medication-table-body");
        tableBody.innerHTML = "";

        if (querySnapshot.empty) {
          console.log("No medications found.");
          return;
        }
          // Create a new table row and set its attributes
          // to include the medication data as a JSON string.
          // This allows us to easily retrieve the data when the row is clicked.
          // The row is given a class of "table-light" for styling.
          // The row is also given a "data-med" attribute that contains the medication data as a JSON string.
        querySnapshot.forEach(doc => {
          const data = doc.data();
        
          const row = document.createElement("tr");
          row.classList.add("table-light", "medication-row"); 
          row.setAttribute("data-med", JSON.stringify(data));
        
          row.innerHTML = `
            <th scope="row">
              <input class="form-check-input me-0 status-checkbox" type="checkbox" />
            </th>
            <td>${data.medicineName || "N/A"}</td>
            <td>${data.dosage || "N/A"} ${data.dosageType || ""}</td>
            <td>${data.timeToTake || "Not set"}</td>
          `;
        
          tableBody.appendChild(row);
        });

        setupModalClickListener();

      }).catch(error => {
        console.error("Error loading medications:", error);
      });
    }
  });
}

// Set up modal click listener
function setupModalClickListener() {
  const tableBody = document.getElementById("medication-table-body");

  tableBody.addEventListener("click", function (e) {
    // Ignore clicks on checkboxes
    // if the checkbox is clicked, we don't want to open the modal
    if (e.target.tagName === "INPUT") return;

    // Find the closest row to the clicked element
    // and get the medication data from its attribute
    // If the clicked element is not a table row, return
    // and do nothing.
    const clickedRow = e.target.closest("tr");
    if (!clickedRow) return;

    // Get the medication data from the row's attribute
    // and parse it as JSON.
    const data = JSON.parse(clickedRow.getAttribute("data-med"));

    document.getElementById("modalName").textContent = data.medicineName || "N/A";
    document.getElementById("modalDosage").textContent = data.dosage || "N/A";
    document.getElementById("modalType").textContent = data.dosageType || "N/A";
    document.getElementById("modalStart").textContent = data.startDate || "N/A";
    document.getElementById("modalEnd").textContent = data.endDate || "N/A";
    document.getElementById("modalInterval").textContent = data.intakeInterval || "N/A";
    document.getElementById("modalNotes").textContent = data.notes || "N/A";

    const modal = new bootstrap.Modal(document.getElementById("medDetailsModal"));
    modal.show();
  });
}

// Page load setup
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");
  loadMedicationsFromFirestore();


  // Set up the event listener for the status checkboxes
  // This listener will be triggered when the checkbox is checked or unchecked.
  // It will find the closest table row and apply the appropriate styles.

  document.addEventListener("change", function (e) {
    // Check if the clicked element is a checkbox
    if (e.target.classList.contains("status-checkbox")) {

      // Find the closest table row to the checkbox
      const row = e.target.closest("tr");
      
      if (e.target.checked) {
        // If the checkbox is checked, apply the styles to the row
        row.style.textDecoration = "line-through";
        row.style.opacity = "0.6";
      } else {
        // If the checkbox is unchecked, remove the styles from the row
        row.style.textDecoration = "none"; 
        row.style.opacity = "1";
      }
    }
  });
});

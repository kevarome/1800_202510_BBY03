
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

// Load email
function insertEmailFromFirestore() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get().then(userDoc => {
        const email = userDoc.data().email;
        document.getElementById("email-goes-here").innerText = email;
      });
    }
  });
}
insertEmailFromFirestore();

// Load phone
function insertPhoneFromFirestore() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get().then(userDoc => {
        const phone = userDoc.data().phone;
        document.getElementById("phone-goes-here").innerText = phone;
      });
    }
  });
}
insertPhoneFromFirestore();

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

        querySnapshot.forEach(doc => {
          const data = doc.data();
          data.id = doc.id;

            // Create a new table row and set its attributes
            // to include the medication data as a JSON string.
            // This allows us to easily retrieve the data when the row is clicked.
            // The row is given a class of "table-light" for styling.
            // The row is also given a "data-med" attribute that contains the medication data as a JSON string.
          const row = document.createElement("tr");
          row.classList.add("table-light");
          row.setAttribute("data-med", JSON.stringify(data));

          row.innerHTML = `
            <th scope="row">
              <input class="form-check-input me-0" type="checkbox" />
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

// Function to setup the modal click listener
function setupModalClickListener() {
  const tableBody = document.getElementById("medication-table-body");

  tableBody.addEventListener("click", function (e) {
    // Ignore the click event on checkboxes
    if (e.target.tagName === "INPUT") return;

    // Find the clicked row
    const clickedRow = e.target.closest("tr");
    if (!clickedRow) return;

    // Get medication data from the clicked row
    const data = JSON.parse(clickedRow.getAttribute("data-med"));

    // Fill the modal with data
    $("#medName").val(data.medicineName || "N/A");
    $("#medDosage").val(data.dosage || "N/A");
    $("#medType").val(data.dosageType || "N/A");
    $("#medStart").val(data.startDate || "N/A");
    $("#medEnd").val(data.endDate || "N/A");
    $("#medInterval").val(data.intakeInterval || "N/A");
    $("#medNotes").val(data.notes || "N/A");

    // Set modal inputs to readonly state
    $("#medDetailsModal input, #medNotes").prop("readonly", true);
    $("#saveMedBtn, #deleteMedBtn").addClass("d-none");
    $("#editMedBtn").removeClass("d-none");

    // Show the modal
    $("#medDetailsModal").modal("show");

    // Save the current medication ID and data
    currentMedId = data.id;  // Assume the ID is stored in data-med attribute
    originalMedData = data;
  });
}

// Call the function to set up the click event listener
setupModalClickListener();


// Page load setup
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");
  loadMedicationsFromFirestore();
});


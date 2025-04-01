
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

// Load profile image (text or image src, adjust accordingly)
function callImageFromFirestore() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get().then(userDoc => {
        const imageUrl = userDoc.data().profileImage;
        document.getElementById("profileImage-goes-here").innerText = imageUrl; // or .src = imageUrl;
      });
    }
  });
}
callImageFromFirestore();

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

// Set up modal click listener
function setupModalClickListener() {
  const tableBody = document.getElementById("medication-table-body");

  tableBody.addEventListener("click", function (e) {
    if (e.target.tagName === "INPUT") return;

    const clickedRow = e.target.closest("tr");
    if (!clickedRow) return;

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
});

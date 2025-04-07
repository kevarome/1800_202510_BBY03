let currentMedId = null;
let originalMedData = null;

// Click Edit to make fields editable
$("#editMedBtn").click(() => {
  $("#medDetailsModal input, #medNotes").prop("readonly", false);
  $("#saveMedBtn, #deleteMedBtn").removeClass("d-none");
  $("#editMedBtn").addClass("d-none");
});

// Click Save to save updates to Firebase
$("#saveMedBtn").click(() => {
  const updated = {
    medicineName: $("#medName").val(),
    dosage: $("#medDosage").val(),
    dosageType: $("#medType").val(),
    startDate: $("#medStart").val(),
    endDate: $("#medEnd").val(),
    intakeInterval: $("#medInterval").val(),
    notes: $("#medNotes").val()
  };

  // Update Firebase data
  var user = firebase.auth().currentUser;
  if (user) {
    db.collection('users').doc(user.uid).collection("medications").doc(currentMedId).update(updated)
      .then(() => {
        alert("Medication updated successfully.");
        $("#medDetailsModal").on('hidden.bs.modal', function () {
          loadMedications(); // wait until modal is fully hidden
          $("#medDetailsModal").off('hidden.bs.modal'); // avoid multiple triggers
        });
        $("#medDetailsModal").modal("hide");  // Reload medications data
        window.location.href = "main.html"; 
      })

      .catch(error => {
        console.error("Error updating:", error);
        alert("Failed to update.");
      });
  }
});

// Click Delete to remove the medication
$("#deleteMedBtn").click(() => {
  // Confirm deletion
  if (confirm("Are you sure to delete this medication?")) {
    // Delete medication from Firebase database
    var user = firebase.auth().currentUser;
    if (user) {
      db.collection('users').doc(user.uid).collection("medications").doc(currentMedId).delete()
        .then(() => {
          // Successful deletion, alert user and hide modal
          alert("Deleted.");
          $("#medDetailsModal").modal("hide");
          // Reload medications data
          window.location.href = "main.html"; 
        })
        .catch(error => {
          // Deletion failed, log the error and alert user
          console.error("Delete error:", error);
          alert("Delete failed.");
        }); 
    }
  }
});

// Function to load medication data
function loadMedications() {
  var user = firebase.auth().currentUser;
  if (user) {
    db.collection('users').doc(user.uid).collection('medications').get()
      .then(snapshot => {
        const medications = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(medications);
        $("#medicationList").empty();
        medications.forEach(med => {
        $("#medicationList").append(`
        <li class="med-item" data-id="${med.id}">${med.medicineName} - ${med.dosage}</li>
          `);
        });

        $(".med-item").click(function() {
          currentMedId = $(this).data("id");
          showMedicationDetails(currentMedId);
        });
      })
      .catch(error => {
        console.error("Error loading medications:", error);
      });
  }
}





// Function to add prescription data to Firestore
function addMedication() {
    // Getting form values
    let medicineName = document.getElementById('medicineName').value;
    let intakeInterval = document.getElementById('intakeInterval').value;
    let timeToTake = document.getElementById('timeToTake').value;
    let dosage = document.getElementById('dosage').value;
    let dosageType = document.getElementById('dosageType').value;
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;
    let notes = document.getElementById('notes').value;

    console.log(medicineName, intakeInterval, timeToTake, dosage, startDate, endDate, notes);

    var user = firebase.auth().currentUser;
    if (user) {

    var userID = user.uid;
    // Adding medication data
    db.collection('users').doc(user.uid).collection('medications').add({
      medicineName: medicineName,
      intakeInterval: intakeInterval,
      timeToTake: timeToTake,
      dosage: dosage,
      dosageType: dosageType,
      startDate: startDate,
      endDate: endDate,
      notes: notes,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        window.location.href = "thanks.html"; // Redirect to the thanks page
    })
    .catch((error) => {
      console.error('Error adding prescription: ', error);
    });
  } else {
    console.log('No user is signed in.');
    window.location.href = 'medication_form.html';

  }
}

// Adding event listener for "Add" button
document.getElementById('addButton').addEventListener('click', (e)=>{
    addMedication();
});


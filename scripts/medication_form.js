var hikeDocID = localStorage.getItem("hikeDocID");    //visible to all functions on this page
function getHikeName(id) {
  db.collection("users")
    .doc(id)
    .get()
    .then((thisHike) => {
      var hikeName = thisHike.data().name;
      document.getElementById("hikeName").innerHTML = hikeName;
    });
}

// Function to add prescription data to Firestore
function addMedication() {
    // Getting form values
    let medicineName = document.getElementById('medicineName').value;
    let intakeInterval = document.getElementById('intakeInterval').value;
    let dosage = document.getElementById('dosage').value;
    let dosageType = document.getElementById('dosageType').value;
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;
    let notes = document.getElementById('notes').value;

    console.log(medicineName, intakeInterval, dosage, startDate, endDate, notes);

    var user = firebase.auth().currentUser;
    if (user) {

    var userID = user.uid;
    // Adding medication data
    db.collection('users').doc(user.uid).collection('medications').add({
      medicineName: medicineName,
      intakeInterval: intakeInterval,
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

///////////////
///////////////

// Function to fetch medication name
/* 
async function getMedicationName(userId, medicationId) {
    const medicationRef = doc(db, `users/${userId}/medications/${medicationId}`);

    try {
        const docSnap = await getDoc(medicationRef);
        if (docSnap.exists()) {
            const medicationData = docSnap.data();
            document.getElementById("medicationName-goes-here").innerText = medicationData.name;
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching document:", error);
    }
}

// Example Usage (Replace with actual user and medication IDs)
const USER_ID = "exampleUserId";
const MEDICATION_ID = "exampleMedicationId";
getMedicationName(USER_ID, MEDICATION_ID);
*/
//////////
/////////
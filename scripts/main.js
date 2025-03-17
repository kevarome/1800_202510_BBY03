function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userName = userDoc.data().name;
                console.log(userName);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("name-goes-here").innerText = userName;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}
insertNameFromFirestore();

function insertMedicineNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let medicineName = userDoc.data().medicineName;
                console.log(medicineName);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("medicineName-goes-here").innerText = medicineName;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}
insertMedicineNameFromFirestore();
//getNameFromAuth(); //run the function


//medication js
function writeMeds() {
    //define a variable for the collection you want to create in Firestore to populate data
    var medicationRef = db.collection("medication");

    medicationRef.add({
        code: "BBY01",
        name: "Tylenol", //replace with your own city?
        intakeInterval: 3, //number value
        dosage: 4, //number value
        startDate: "2024-03-17",
        endDate: "2024-03-31",         
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    medicationRef.add({
        code: "AM01",
        name: "Vitamin C", //replace with your own city?
        city: "Anmore",
        province: "BC",
        level: "moderate",
        details: "Close to town, and relaxing",
        length: 10.5,      //number value
        hike_time: 80,     //number value
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    medicationRef.add({
        code: "NV01",
        name: "Vitamin D", //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "hard",
        details:  "Amazing ski slope views",
        length: 8.2,        //number value
        hike_time: 120,     //number value
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
}

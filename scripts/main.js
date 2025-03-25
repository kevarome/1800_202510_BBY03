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

function insertMedicationFromFirestore() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("User UID:", user.uid);
            let medicationsRef = db.collection("users").doc(user.uid).collection("medications");

            // Retrieve the first medication document
            medicationsRef.limit(1).get().then(querySnapshot => {
                if (!querySnapshot.empty) {
                    let medicationDoc = querySnapshot.docs[0]; // Get the first document
                    let medicationName = medicationDoc.data()?.name || "No Medication Found"; // Default message if name is missing

                    let medicationElement = document.getElementById("medication-goes-here");
                    if (medicationElement) {
                        medicationElement.innerText = medicationName;
                    } else {
                        console.warn("Element with ID 'medication-goes-here' not found.");
                    }
                } else {
                    console.log("No medications found for this user.");
                }
            }).catch(error => {
                console.error("Error retrieving medication document:", error);
            });
        } else {
            console.log("No user is logged in.");
        }
    });
}

// Call the function
insertMedicationFromFirestore();

//getNameFromAuth(); //run the function


function insertEmailFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userEmail = userDoc.data().email;
                console.log(userEmail);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("email-goes-here").innerText = userEmail;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}
insertEmailFromFirestore();

function insertPhoneFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userPhone = userDoc.data().phone;
                console.log(userPhone);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("phone-goes-here").innerText = userPhone;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}
insertPhoneFromFirestore();

function insertAgeFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userAge = userDoc.data().age;
                console.log(userAge);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("age-goes-here").innerText = userAge;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}
insertAgeFromFirestore();

function insertGenderFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userGender = userDoc.data().gender;
                console.log(userGender);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("gender-goes-here").innerText = userGender;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}
insertGenderFromFirestore();


function addCheckboxListener(checkboxId, textId) {
    document.getElementById(checkboxId).addEventListener('click', function () {
        const checkbox = document.getElementById(checkboxId);
        const text = document.getElementById(textId);
        if (checkbox.checked) {
            text.style.textDecoration = 'line-through';
        } else {
            text.style.textDecoration = 'none';
        }
    });
}

addCheckboxListener('flexCheckChecked1', 'Aspirin');
addCheckboxListener('flexCheckChecked2', 'Amoxicillin');

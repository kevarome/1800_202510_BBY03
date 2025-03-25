var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {

                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(user.uid)
                    //get the document for current user.
                    currentUser.get()
                        .then(userDoc => {
                            //get the data fields of the user
                            let userName = userDoc.data().name;
                            let userEmail = userDoc.data().email;
                            let userPhone = userDoc.data().phone;
                            let userAge = userDoc.data().age;
                            let userGender = userDoc.data().gender;
                            let userImage = userDoc.data().profilePic;

                            //if the data fields are not empty, then write them in to the form.
                            if (userName != null) {
                                document.getElementById("nameInput").value = userName;
                            }
                            if (userEmail != null) {
                                document.getElementById("emailInput").value = userEmail;
                            }
                            if (userPhone != null) {
                                document.getElementById("phoneInput").value = userPhone;
                            }
                            if (userAge != null) {
                                document.getElementById("ageInput").value = userAge;
                            }
                            if (userGender != null) {
                                document.getElementById("genderInput").value = userGender;
                            }
                            if (userImage != null) {
                                document.getElementById("fileInput").src =userImage;
                            }
                            
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }

//call the function to run it 
populateUserInfo();

function save() {
    let userName = document.getElementById("nameInput").value;
    let userEmail = document.getElementById("emailInput").value;
    let userPhone = document.getElementById("phoneInput").value;
    let userAge = document.getElementById("ageInput").value;
    let userGender = document.getElementById("genderInput").value;
    let userImage = document.getElementById("fileInput").src;

    if (currentUser) {
        currentUser.update({
            name: userName,
            email: userEmail,
            phone: userPhone,
            age: userAge,
            gender: userGender,
            profilePic: userImage
        })
        .then(() => {
          
            document.getElementById('personalInfoFields').disabled = true;
        })
        .catch(error => {
            console.error("error：", error);
        });
    } else {
        console.error("No user is signed in");
    }
}

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }
document.getElementById('savebtn').addEventListener('click',save)

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("User logged in:", user.uid);
    } else {
        console.log("No user signed in");
    }
});

// Attach event listener to the file input
// Function to handle file selection and Base64 encoding
document.getElementById("fileInput").addEventListener("change", handleFileSelect);
function handleFileSelect(event) {
    var file = event.target.files[0]; // Get the selected file

    if (file) {
        var reader = new FileReader(); // Create a FileReader to read the file

        // When file reading is complete
        reader.onload = function (e) {
            var base64String = e.target.result.split(',')[1]; // Extract Base64 data

            // Save the Base64 string to Firestore under the user's profile
            saveProfileImage(base64String);
        };

        // Read the file as a Data URL (Base64 encoding)
        reader.readAsDataURL(file);
    }
}
// Function to save the Base64 image to Firestore
function saveProfileImage(base64String) {
    // Save Base64 image as a field in the user's Firestore document
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            userId = user.uid;
            db.collection("users").doc(userId).set({
                profileImage: base64String
            }, { merge: true }) // Merge prevents overwriting existing data
                .then(function () {
                    console.log("Profile image saved successfully!");
                    displayProfileImage(base64String); // Display the saved image
                })
                .catch(function (error) {
                    console.error("Error saving profile image: ", error);
                });
        } else {
            console.error("No user is signed in.");
        }   
    });
}
// Function to display the stored Base64 image on the profile page
function displayProfileImage(base64String) {
var imgElement = document.getElementById("fileInput");
imgElement.src = "data:image/png;base64," + base64String; // Set the image source
}




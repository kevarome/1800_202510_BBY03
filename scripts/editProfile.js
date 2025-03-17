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
                            let uesrGender = userDoc.data().gender;

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
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }

        function save() {
            let userName = document.getElementById("nameInput").value;
            let userEmail = document.getElementById("emailInput").value;
            let userPhone = document.getElementById("phoneInput").value;
            let userAge = document.getElementById("ageInput").value;
            let userGender = document.getElementById("genderInput").value;
       
            if (currentUser) {
                currentUser.update({
                    name: userName,
                    email: userEmail,
                    phone: userPhone,
                    age: userAge,
                    gender: userGender
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
        

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }
document.getElementById('savebtn').addEventListener('click',save)
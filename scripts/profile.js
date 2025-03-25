firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // Check if Firestore is accessible and the user has a profile
        firebase.firestore().collection("users").doc(user.uid).get().then(doc => {
            if (doc.exists) {
                const data = doc.data();
                const profilePic = document.getElementById("profileImage");

                if (profilePic) {
                    // If the user has a profile picture stored, use it, otherwise use a default
                    if (data && data.profilePic) {
                        profilePic.src = data.profilePic;
                    } else {
                        profilePic.src = "default-avatar.png";
                    }
                } else {
                    console.error("Profile picture element not found.");
                }
            } else {
                console.log("No profile found for this user.");
            }
        }).catch(error => {
            console.error("Error fetching user profile:", error);
        });
    } else {
        console.log("No user is signed in.");
    }
});
var currentUser; //points to the document of the user who is logged in
function showProfilePic() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user

        let userImage = userDoc.data().profileImage;


        if (userImage != null) {
          document.getElementById("uploadPhoto").src = "data:image/png;base64," + userImage;
        }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}
showProfilePic();
//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   
		        // If the "user" variable is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            $('#navbarPlaceholder').load('./text/nav_after_login.html', function (response, status, xhr) {
                if (status === "error") {
                    console.error(" Navbar (after login) failed to load:", xhr.status, xhr.statusText);
                } else {
                    console.log(" Navbar (after login) loaded.");
                }
            });

        } else {
            // No user is signed in.
            $('#navbarPlaceholder').load('./text/nav_before_login.html', function (response, status, xhr) {
                if (status === "error") {
                    console.error(" Navbar (before login) failed to load:", xhr.status, xhr.statusText);
                } else {
                    console.log(" Navbar (before login) loaded.");
                }
            });
        }

        // Footer always loads
        $('#footerPlaceholder').load('./text/footer.html', function (response, status, xhr) {
            if (status === "error") {
                console.error(" Footer failed to load:", xhr.status, xhr.statusText);
            } else {
                console.log(" Footer loaded.");
            }
        });
    });
}

loadSkeleton(); //invoke the function

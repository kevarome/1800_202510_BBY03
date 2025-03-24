document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
  

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(" User is logged in:", user.uid);
  
        firebase.firestore()
          .collection('users')
          .doc(user.uid)
          .collection('medications')
          .get()
          .then((querySnapshot) => {
            var events = [];
  
            querySnapshot.forEach((doc) => {
              var data = doc.data();
              console.log(" Fetched medication:", data);

              // Add the medication to the calendar
              events.push({
                title: data.medicineName,
                start: data.startDate  // Use the start date of the medication
                
              });
            });
  
            //Draw the calendar
            var calendar = new FullCalendar.Calendar(calendarEl, {
              initialView: 'dayGridMonth',
              events: events
            });
  
            calendar.render();
          })
          .catch((error) => {
            console.error(" Error fetching medications:", error);
          });
  
      } else {
        console.log(" User not logged in.");
        window.location.href = 'login.html';
      }
    });
  });
  
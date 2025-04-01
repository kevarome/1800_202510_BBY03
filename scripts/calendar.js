document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("User is logged in:", user.uid);

      db.collection('users')
        .doc(user.uid)
        .collection('medications')
        .get()
        .then((querySnapshot) => {
          const events = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("Fetched medication:", data);

            const start = new Date(data.startDate);
            const end = new Date(data.endDate);
            const interval = parseInt(data.intakeInterval);

            for (let d = new Date(start); d <= new Date(end); d.setDate(d.getDate() + interval)) {
              const isoDate = d.toISOString().split('T')[0];

              events.push({
                title: data.medicineName,
                start: isoDate,
                extendedProps: {
                  dosage: data.dosage,
                  dosageType: data.dosageType,
                  startDate: data.startDate,
                  endDate: data.endDate,
                  intakeInterval: data.intakeInterval,
                  notes: data.notes
                }
              });
            }
          });

          const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: events,

            eventClick: function (info) {
              document.getElementById('modalName').textContent = info.event.title;
              document.getElementById('modalDosage').textContent = info.event.extendedProps.dosage || '';
              document.getElementById('modalType').textContent = info.event.extendedProps.dosageType || '';
              document.getElementById('modalStart').textContent = info.event.extendedProps.startDate || '';
              document.getElementById('modalEnd').textContent = info.event.extendedProps.endDate || '';
              document.getElementById('modalInterval').textContent = info.event.extendedProps.intakeInterval || '';
              document.getElementById('modalNotes').textContent = info.event.extendedProps.notes || '';

              const modal = new bootstrap.Modal(document.getElementById('medDetailsModal'));
              modal.show();
            }
          });

          calendar.render();
        })
        .catch((error) => {
          console.error("Error fetching medications:", error);
        });

    } else {
      console.log("User not logged in.");
      window.location.href = 'login.html';
    }
  });
});

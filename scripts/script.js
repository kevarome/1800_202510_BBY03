//---------------------------------
// Your own functions here
//---------------------------------


//  Calendar Script
    document.addEventListener('DOMContentLoaded', function () {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth', // monthly view
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay' // change the view
            },
            events: [
                {
                    title: 'Meeting',
                    start: '2024-03-10T10:00:00',
                    end: '2024-03-10T12:00:00'
                },
                {
                    title: 'Conference',
                    start: '2024-03-15',
                    end: '2024-03-17'
                }
            ]
        });
        calendar.render();
    });
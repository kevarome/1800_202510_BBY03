
// This script is used to access the camera of the device and take a picture
// The picture is displayed on the screen and can be saved by the user
const video = document.getElementById('video');

        // Get the canvas and photo elements
        const canvas = document.getElementById('canvas');

        // Get the photo button
        const photo = document.getElementById('photo');

        // Get the capture button
        const captureButton = document.getElementById('captureButton');

        // Function to start the camera 
        // This function will be called when the page loads to start the camera automatically.
        async function startCamera() {
            try {
                // Get the camera stream and set it as the source of the video element
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        facingMode: 'environment' 
                    } 
                });
                video.srcObject = stream;
            } catch (err) {
                console.error("Error accessing the camera", err);
                alert("Error accessing the camera: " + err.message);
            }
        }

        // Add an event listener to the capture button
        // This event listener will take a picture when the button is clicked.
        captureButton.addEventListener('click', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw the video frame on the canvas 
            // This will take a snapshot of the video and display it on the canvas
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert the canvas to a data URL
            const imageDataUrl = canvas.toDataURL('image/jpeg');
            photo.src = imageDataUrl;
        });

        // Start the camera when the page loads
        window.addEventListener('load', startCamera);
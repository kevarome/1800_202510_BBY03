// Select elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const captureButton = document.getElementById('captureButton');

// Function to start the camera
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing the camera", err);
        alert("Error accessing the camera: " + err.message);
    }
}

// Capture photo event
captureButton.addEventListener('click', () => {
    // Set canvas size to match video frame
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame onto the canvas
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to an image
    const imageDataUrl = canvas.toDataURL('image/jpeg');

    // Display the captured image
    photo.src = imageDataUrl;
    photo.style.display = "block"; // make it visible

    // Prevent layout shift by keeping the container centered
    document.querySelector('.capture-container').style.minHeight = "auto";
});

// Start the camera when the page loads
window.addEventListener('load', startCamera);

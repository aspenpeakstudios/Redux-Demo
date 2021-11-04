
// Start browser-sync
// ..
// cd C:\Users\Bash Warrior King\Redux-Demo\JS30L19-Webcam> 
// browser-sync start --config bs-config.js


const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// Gets the video camera from the device.  
// Handles permissions and will generate a user prompt to allow that permission.
function getVideo() {
    navigator.mediaDevices.getUserMedia({video:true, audio:false})
        .then(localMediaStream => {      
            // https://stackoverflow.com/questions/27120757/failed-to-execute-createobjecturl-on-url
            // Some specs changed since time of Wes's course.  
            video.srcObject = localMediaStream;     
            video.play();
        })
        .catch(err => {
            console.error(`Oh No!!!`, err);
        });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    console.log(width, height);
    
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    }, 16);
}

getVideo();

window.setTimeout(function() {paintToCanvas();}, 4000);

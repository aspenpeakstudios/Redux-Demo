
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

        let pixels = ctx.getImageData(0,0, width, height);
        
        pixels = greenScreen(pixels);

        //ctx.globalAlpha = 0.1;
        ctx.putImageData(pixels, 0,0);

    }, 16);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200;  // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50;   // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;  // BLUE
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 550] = pixels.data[i + 0] + 200;  // RED
        pixels.data[i + 100] = pixels.data[i + 1] - 50;   // GREEN
        pixels.data[i - 550] = pixels.data[i + 2] * 0.5;  // BLUE
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (let i = 0; i < pixels.data.length; i+=4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alphs = pixels.data[i + 3];

        // If any of the controls are outside of normal ranges, then
        // make the colors invisible.
        if (red >= levels.rmin 
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
                pixels.data[i + 3] = 0;
            }        
    }
    return pixels;
}

function takePhoto() {
    // Audio - Play the sound
    snap.currentTime = 0;
    snap.play();

    // Take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', "handsome");
    link.innerHTML= `<img src="${data}" alt="handsome" />`;
    strip.insertBefore(link, strip.firstChild);

    console.log(data);
}

getVideo();

video.addEventListener('canplay', paintToCanvas);

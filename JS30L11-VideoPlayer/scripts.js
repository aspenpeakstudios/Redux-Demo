
/* Get our Elements */
const player = document.querySelector(".player");
const video = player.querySelector("video");
const playButton = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll('[data-skip]');
const progress = player.querySelector(".progress");
const progressBar = progress.querySelector(".progress__filled");
const sliders = player.querySelectorAll('input[type=range]');


/* Build out functions */
function togglePlay() {
    let action = video.paused ? "play" : "pause";
    video[action]();
}

function togglePlayIcon() {
    const icon = video.paused ? '►' : '❚ ❚';
    playButton.textContent = icon;
}

function skipAround() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function updateProgressBar() {
    let percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function updateVideoTime(e) {    
    let location = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = location;    
}

function updateRanges() {
    video[this.name] = this.value;
    console.log(this.name + ": " + this.value);
}


/* Hook up event handlers */
video.addEventListener('click', togglePlay);
video.addEventListener('play', togglePlayIcon);
video.addEventListener('pause', togglePlayIcon);

playButton.addEventListener('click', togglePlay);
skipButtons.forEach( button => button.addEventListener('click', skipAround) );

sliders.forEach( input => input.addEventListener('change', updateRanges));
sliders.forEach( input => input.addEventListener('mousemove', updateRanges));

video.addEventListener('timeupdate', updateProgressBar);

let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && updateVideoTime(e) );
progress.addEventListener('click', updateVideoTime);



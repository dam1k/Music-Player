const musicContainer = document.getElementById('music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('#progress-container');
const title = document.getElementById('title');
const cover = document.querySelector('#cover');

//Song titles
const songs = ['hey', 'summer', 'ukulele'];

//Keep track of song
let songIndex = 0;

//Initially load song details into DOM
loadSong(songs[songIndex]);

function loadSong(song) {
    title.textContent = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('.fas').className = 'fas fa-play';

    audio.pause();
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('.fas').className = 'fas fa-pause';

    audio.play();
}

function prevSong() {
songIndex--;

if(songIndex < 0) {
    songIndex = songs.length - 1;
} 

loadSong(songs[songIndex]);
playSong();
}

function nextSong() {
    songIndex++;
     
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
const {duration, currentTime} = e.srcElement;
const progressPercent = (currentTime / duration) * 100;

progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}
//Event Listeners

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying) {
      pauseSong();
     } else {
        playSong();
    }
})

audio.addEventListener('timeupdate', updateProgress);

//Change Song
prevBtn.addEventListener('click', prevSong);

nextBtn.addEventListener('click', nextSong);

//Click on progress bar
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);
const progress = document.getElementById('progress-bar');
const audioSong = document.getElementById('current');
const nextSong = document.getElementById('next');
const prevSong = document.getElementById('prev');
const play = document.getElementById('play');
const playSelector = document.getElementsByClassName('play-button')[0];
const time = document.getElementsByClassName('current-time')[0];
const leftTime = document.getElementsByClassName('time-left')[0];
const songAuthor = document.getElementById('song-author');
const songName = document.getElementById('song-name');
const volume = document.getElementById('volume-bar');
const trackList = document.getElementsByClassName('tracklist')[0];

const requestSongs = () => {

    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open('GET', '/songs', true);

        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                reject(xhr.status + ': ' + xhr.statusText);
            } else {
                resolve(JSON.parse(xhr.responseText));
            }

        }
    });
};

function generateAll(songsArray) {

    songsArray.forEach((i) => {
        let song = document.createElement('li');
        song.innerHTML = `${i.slice(0, -4)}<div id=${i} class="hidden loading-pulse"></div>`;
        trackList.appendChild(song);
    });

    const helpers = {


        formatTime: function(secs, format) {
            let hr = Math.floor(secs / 3600);
            let min = Math.floor((secs - (hr * 3600)) / 60);
            let sec = Math.floor(secs - (hr * 3600) - (min * 60));

            if (sec < 10) {
                sec = '0' + sec;
            }

            return min + ':' + sec;
        },


        formatSource: function(elem) {
            elem = elem.split('/');
            elem = elem[elem.length - 1];
            return elem;
        }

    }

    class Player {
        constructor(audio, sources) {
            this.audio = audio;
            this.sources = sources;
            this.inPlay = false;
            this.currentValue = 0;
            this.audio.volume = 0.25;
            this.generateView = function() {
                songAuthor.innerHTML = helpers.formatSource(createdPlayer.audio.src).split('-')[0];
                songName.innerHTML = helpers.formatSource(createdPlayer.audio.src).split('-')[1].slice(0, -4);
            }
        }

        playAudio() {
            let songName = helpers.formatSource(this.audio.src);
            document.getElementById(songName).classList.remove('hidden');
            this.audio.play();
        }

        pauseAudio() {
            this.audio.pause();
        }

        nextTrack() {
            let src = helpers.formatSource(this.audio.src);
            document.getElementById(src).classList.add('hidden');
            if (!this.sources[this.sources.indexOf(src) + 1]) {
                this.audio.src = `songs/${this.sources[0]}`;
            } else {
                this.audio.src = `songs/${this.sources[this.sources.indexOf(src) + 1]}`;
            }
            let newSrc = helpers.formatSource(this.audio.src);
            document.getElementById(newSrc).classList.remove('hidden');
            this.generateView();
            this.audio.play();
        }

        prevTrack() {
            let src = helpers.formatSource(this.audio.src);
            document.getElementById(src).classList.add('hidden');
            if (!this.sources[this.sources.indexOf(src) - 1]) {
                this.audio.src = `songs/${this.sources[this.sources.length-1]}`;
            } else {
                this.audio.src = `songs/${this.sources[this.sources.indexOf(src) - 1]}`;
            }
            let newSrc = helpers.formatSource(this.audio.src);
            document.getElementById(newSrc).classList.remove('hidden');
            this.generateView();
            this.audio.play();
        }

        showTime() {
            let timeStamp = this.audio.currentTime;
            time.innerHTML = helpers.formatTime(Math.ceil(timeStamp));
            leftTime.innerHTML = helpers.formatTime(Math.ceil(this.audio.duration));
            this.currentValue = 100 * this.audio.currentTime / this.audio.duration;
            progress.value = this.currentValue;
            document.getElementsByClassName('mdl-slider__background-lower')[0].style.flex = `0.01 1 ${this.currentValue}%`;
        }

        rewind() {
            this.audio.currentTime = this.audio.duration * progress.value / 100;
            document.getElementsByClassName('mdl-slider__background-lower')[0].style.flex = `0.01 1 ${this.currentValue}%`;
        }

        changeVolume() {
            this.audio.volume = volume.value / 100;
        }

        changeTrack(e) {
            let src = helpers.formatSource(this.audio.src);
            document.getElementById(src).classList.add('hidden');
            this.audio.src = `songs/${e.innerHTML.split('<')[0]}.mp3`;
            let newSrc = helpers.formatSource(this.audio.src);
            document.getElementById(newSrc).classList.remove('hidden');
            this.generateView();
            this.audio.play();
        }

    }

    const createdPlayer = new Player(audioSong, songsArray);

    nextSong.addEventListener('click', () => {
        createdPlayer.nextTrack();
    });

    prevSong.addEventListener('click', () => {
        createdPlayer.prevTrack();
    });

    volume.addEventListener('change', () => {
        createdPlayer.changeVolume();
    });

    progress.addEventListener('mouseup', () => {
        createdPlayer.rewind();
    });

    play.addEventListener('click', () => {
        songAuthor.innerHTML = helpers.formatSource(createdPlayer.audio.src).split('-')[0];
        songName.innerHTML = helpers.formatSource(createdPlayer.audio.src).split('-')[1].slice(0, -4);
        if (createdPlayer.inPlay == false) {
            createdPlayer.inPlay = true;
            playSelector.classList.remove('play-button');
            playSelector.classList.add('pause-button')
            createdPlayer.playAudio();
        } else {
            createdPlayer.inPlay = false;
            playSelector.classList.remove('pause-button');
            playSelector.classList.add('play-button')
            createdPlayer.pauseAudio();
        }

    });

    trackList.addEventListener('click', (e) => {
        createdPlayer.changeTrack(e.target);
    })

    setInterval(() => createdPlayer.showTime(), 500);
};

requestSongs()
    .then((result) => generateAll(result))
    .catch((err) => console.log(err))

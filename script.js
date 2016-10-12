const audioSong = document.getElementById('current');
const nextSong = document.getElementById('next');
const prevSong = document.getElementById('prev');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const time = document.getElementsByClassName('time')[0];
const currentSong = document.getElementsByClassName('now-playing')[0];

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
    }

    playAudio() {
        this.audio.play();
        currentSong.innerHTML = this.audio.src;
    }

    pauseAudio() {
        this.audio.pause();
    }

    nextTrack() {
        let src = helpers.formatSource(this.audio.src);
        this.audio.src = this.sources[this.sources.indexOf(src) + 1];
        currentSong.innerHTML = this.audio.src;
        this.audio.play();
    }

    prevTrack() {
        let src = helpers.formatSource(this.audio.src);
        this.audio.src = this.sources[this.sources.indexOf(src) - 1];
        currentSong.innerHTML = this.audio.src;
        this.audio.play();
    }

    showTime() {
        let timeStamp = this.audio.currentTime;
        time.innerHTML = helpers.formatTime(Math.ceil(timeStamp));
    }

    rewind() {
        console.log(this.audio.currentTime);
    }

}

const createdPlayer = new Player(audioSong, ['TheNeighbourhood.mp3', 'Blame.mp3']);

nextSong.addEventListener('click', () => {
    createdPlayer.audio.currentTime = 0;
    createdPlayer.nextTrack();
});

prevSong.addEventListener('click', () => {
    createdPlayer.audio.currentTime = 0;
    createdPlayer.prevTrack();
});

play.addEventListener('click', () => {
    createdPlayer.playAudio();
});
pause.addEventListener('click', () => {
    createdPlayer.pauseAudio();
});

setInterval(() => createdPlayer.showTime(), 40);


Array.prototype.forEach.call(document.querySelectorAll('.mdl-card__media'), function(el) {
    var link = el.querySelector('a');
    if (!link) {
        return;
    }
    var target = link.getAttribute('href');
    if (!target) {
        return;
    }
    el.addEventListener('click', function() {
        location.href = target;
    });
});

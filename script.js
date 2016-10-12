const audioSong = document.getElementById('current');
const nextSong = document.getElementById('next');
const prevSong = document.getElementById('prev');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const time = document.getElementsByClassName('time')[0];
const currentSong = document.getElementsByClassName('now-playing')[0];

const helpers = {

    degToRad: function(degree) {
        var factor = Math.PI / 180;
        return degree * factor;
    },

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




const c = document.getElementById('myCanvas');
const ctx = c.getContext('2d');

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
        time.innerHTML = `${helpers.formatTime(Math.ceil(timeStamp))}`;
        if (timeStamp != 0) {
            ctx.beginPath();
            ctx.arc(250, 250, 200, helpers.degToRad(270), helpers.degToRad((this.audio.currentTime * 6) - 90));
            ctx.stroke();
        }

    }

    // startProgress() {
    // }

}

const createdPlayer = new Player(audioSong, ['TheNeighbourhood.mp3', 'Blame.mp3']);

nextSong.addEventListener('click', () => {
    createdPlayer.nextTrack();
});

prevSong.addEventListener('click', () => {
    createdPlayer.prevTrack();
});

play.addEventListener('click', () => {
    createdPlayer.playAudio();
});
pause.addEventListener('click', () => {
    createdPlayer.pauseAudio();
});

setInterval(() => createdPlayer.showTime(), 40);

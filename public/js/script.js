const audioSong = document.getElementById('current');
const nextSong = document.getElementById('next');
const prevSong = document.getElementById('prev');
const play = document.getElementById('play');
const playSelector = document.getElementsByClassName('play-button')[0];
const time = document.getElementsByClassName('time')[0];
const songAuthor = document.getElementById('song-author');
const songName = document.getElementById('song-name');

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
        elem = elem[elem.length - 1].slice(0, -4);
        return elem;
    }

}



class Player {
    constructor(audio, sources) {
        this.audio = audio;
        this.sources = sources;
        this.inPlay = false;
    }

    playAudio() {
        this.audio.play();
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

const createdPlayer = new Player(audioSong, ['TheNeighbourhood-How.mp3', 'Diplo&ZedsDead-Blame.mp3']);

nextSong.addEventListener('click', () => {
    createdPlayer.nextTrack();
});

prevSong.addEventListener('click', () => {
    createdPlayer.prevTrack();
});

play.addEventListener('click', () => {
    songAuthor.innerHTML =  helpers.formatSource(createdPlayer.audio.src).split('-')[0];
    songName.innerHTML =  helpers.formatSource(createdPlayer.audio.src).split('-')[1];
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


setInterval(() => createdPlayer.showTime(), 1000);

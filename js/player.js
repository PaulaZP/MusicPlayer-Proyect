const musicSong = document.querySelector("#audio");
let play = document.querySelector('#play img');
let next = document.querySelector('#next');
let prev = document.querySelector('#previous');
let canvasCtx = document.querySelector('.canvasAnimate');
let ctx = canvasCtx.getContext('2d');
let WIDTH = canvasCtx.width;
let HEIGHT = canvasCtx.height;
let counter = 0;

function apiArtist(){
  fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/gorillaz')
  .then((response) => response.json())
  .then((data) => {
    const currentSong = data[counter].audio;
    listSong(data, currentSong);

    const listInfo = document.getElementById('list-info-song');

    const albumName = document.createElement('p');
    albumName.setAttribute('class', 'name-album');
    listInfo.appendChild(albumName);
    albumName.innerHTML = `Name album: ${data[counter].album}`;

    const songName = document.createElement('p');
    songName.setAttribute('class', 'name-song');
    listInfo.appendChild(songName);
    songName.innerHTML = `Name song: ${data[counter].name}`;

  });
}

function playSong(){
  play.addEventListener('click', () =>{
    if(play.classList.contains('playing')){
      play.src = './img/play.png';
      play.setAttribute('id', 'btnPause');
      musicSong.pause();
    }else{
      play.src = './img/pause.png';
      canvasAnimate(musicSong);
      musicSong.play();
    }
    play.classList.toggle('playing');
  });
}

function nextSong(data) {
  next.addEventListener('click', () => {
    const actualCount = counter++;
    if(actualCount < data.length){

      musicSong.src = data[actualCount].audio;
      musicSong.play();
    }else{
      counter = 0;
      musicSong.src = data[counter].audio;
      musicSong.play();
    }
  });
}

/*    if(counter < data.length){
      const actualCount = counter++;
      musicSong.src = data[actualCount].audio;
      musicSong.play();
    }else{
      counter = 0;
      musicSong.src = data[counter].audio;
      musicSong.play();
    }*/

function previousSong(song) {
  previous.addEventListener('click', () => {
    if(counter > 0){
      counter -= 1;
    }else{
      counter = listSong(song);
    }
    console.log('hola soy previous')
  });
}

function listSong(data, song) {
  musicSong.setAttribute('crossorigin', 'anonymous');
  musicSong.load();
  musicSong.src = song;
  playSong();
  nextSong(data, song);
  previousSong();
}

function canvasAnimate(musicSong){
  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let analyser = audioCtx.createAnalyser();

  let source = audioCtx.createMediaElementSource(musicSong);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 2048;
  source.connect(analyser);

  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);

  function draw() {
    analyser.getByteFrequencyData(dataArray);
    ctx.fillStyle ="#01061D";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    let barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;

    let x = 0;
    for(let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] + 250;
      const r = 178;
      const g = 102;
      const b = 255;
      ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
      ctx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);
      x += barWidth + 0;
    }
    requestAnimationFrame(draw);
  };
  draw();
}

apiArtist();

/*const musicSong = document.querySelector("#audio");
let play = document.querySelector('#play img');
let next = document.querySelector('#next');
let previous = document.querySelector('#previous');
let canvasCtx = document.querySelector('.canvasAnimate');
let ctx = canvasCtx.getContext('2d');
let WIDTH = canvasCtx.width;
let HEIGHT = canvasCtx.height;
let counter = 0;

function apiGorillaz(){
  fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/gorillaz')
  .then((response) => response.json())
  .then((data) => {
    const currentSong = data[counter].audio;
    listSong(currentSong);

    const listInfo = document.getElementById('list-info-song');

    const albumName = document.createElement('p');
    albumName.setAttribute('class', 'name-album');
    listInfo.appendChild(albumName);
    albumName.innerHTML = `Name album: ${data[counter].album}`;

    const songName = document.createElement('p');
    songName.setAttribute('class', 'name-song');
    listInfo.appendChild(songName);
    songName.innerHTML = `Name song: ${data[counter].name}`;

    handleControls(data, currentSong);
  });

}

function handleControls(data, currentSong){
  const create = new MusicPlayer(musicSong, play, next, previous, counter, data);
  create.songStatus();
  create.nextSong(data,currentSong);
  create.previousSong();
}

class MusicPlayer{
  constructor(musicSong, play, next, previous, counter,data){
    this.musicSong = musicSong;
    this.play = play;
    this.next = next;
    this.previous = previous;
    this.counter = counter;
    this.data = data;
  }

  songStatus(){
    this.play.addEventListener('click', () =>{
      if(this.play.classList.contains('playing')){
        this.play.src = './img/play.png';
        this.play.setAttribute('id', 'btnPause');
        this.musicSong.pause();
      }else{
        this.play.src = './img/pause.png';
        //canvasAnimate(this.musicSong);
        this.musicSong.play();
      }
      this.play.classList.toggle('playing');
    });
  }

  nextSong(song){
    this.next.addEventListener('click', () => {
      const actualCounter = this.counter++;
      console.log(actualCounter)
      const nextSong = this.data[actualCounter].audio;
      this.musicSong = nextSong;
      console.log('hola soy next', nextSong);
      if(counter < listSong(song)){
        musicSong.setAttribute('crossorigin', 'anonymous');
        musicSong.load();
        musicSong.src = nextSong;
        counter += 1;
        console.log(musicSong)

      }else{
        counter = 0;
      }

    });
  }
  previousSong(){
    this.previous.addEventListener('click', () => {
      if(counter > 0){
        counter -= 1;
      }else{
        counter = listSong();
      }
      console.log('hola soy previous')
    });
  }
}

function listSong(song) {
  musicSong.setAttribute('crossorigin', 'anonymous');
  musicSong.load();
  musicSong.src = song;
}

function canvasAnimate(musicSong){
  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let analyser = audioCtx.createAnalyser();
  let source = audioCtx.createMediaElementSource(musicSong);

  analyser.connect(audioCtx.destination);
  analyser.fftSize = 2048;
  source.connect(analyser);

  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);

  function draw() {
    analyser.getByteFrequencyData(dataArray);
    ctx.fillStyle ="#01061D";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    let barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for(let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] + 250;
      const r = 178;
      const g = 102;
      const b = 255;
      ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
      ctx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);
      x += barWidth + 0;
    }
    requestAnimationFrame(draw);
  };
  draw();
}

apiGorillaz();*/


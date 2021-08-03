const musicSong = document.querySelector("#audio");
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
  });
}

function handleControls(){
  const create = new MusicPlayer(musicSong, play, next, previous);
  create.songStatus();
  create.nextSong();
  create.previousSong();
}

class MusicPlayer{
  constructor(musicSong, play, next, previous){
    this.musicSong = musicSong;
    this.play = play;
    this.next = next;
    this.previous = previous;
  }
  songStatus(){
    this.play.addEventListener('click', () =>{
      if(this.play.classList.contains('playing')){
        this.play.src = './img/play.png';
        this.play.setAttribute('id', 'btnPause');
        this.musicSong.pause();
      }else{
        this.play.src = './img/pause.png';
        canvasAnimate(this.musicSong);
        this.musicSong.play();
      }
      this.play.classList.toggle('playing');
    });
  }
  nextSong(){
    this.next.addEventListener('click', () => {
      if(counter < listSong()){
        counter += 1;
      }else{
        counter = 0;
      }
      console.log('hola soy next')
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

apiGorillaz();
handleControls();

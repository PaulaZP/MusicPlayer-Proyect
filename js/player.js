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
  fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/aurora')
  .then((response) => response.json())
  .then((data) => {
    const currentSong = data[counter].audio;
    listSong(data, currentSong);
    infoSong(data)
  });
}
function infoSong(data){
    const listInfo = document.getElementById('list-info-song');
    listInfo.innerHTML = "";

    const albumName = document.createElement('p');
    albumName.setAttribute('class', 'name-album');
    listInfo.appendChild(albumName);
    albumName.innerHTML = `Name album: ${data[counter].album}`;

    const songName = document.createElement('p');
    songName.setAttribute('class', 'name-song');
    listInfo.appendChild(songName);
    songName.innerHTML = `Name song: ${data[counter].name}`;
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
    if(counter == 0){
      counter = 1;
    }
    const actualCount = counter++;
    if(actualCount < data.length){
      infoSong(data);
      musicSong.src = data[actualCount].audio;
      musicSong.play();
    }else{
      counter = 0;
      musicSong.src = data[counter].audio;
      musicSong.play();
    }
  });
}

function previousSong(data) {
  previous.addEventListener('click', () => {
    if(counter == 0){
      counter = data.length;
    }
    const actualCount = counter--;
    if(actualCount < data.length){
      infoSong(data);
      musicSong.src = data[actualCount].audio;
      musicSong.play();
    }else{
      counter = 0;
      musicSong.src = data[counter].audio;
      musicSong.play();
    }
  });
}

function listSong(data, song) {
  musicSong.setAttribute('crossorigin', 'anonymous');
  musicSong.load();
  musicSong.src = song;
  playSong();
  nextSong(data);
  previousSong(data);
}

function canvasAnimate(musicSong){
  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let analyser = audioCtx.createAnalyser();

  let source = audioCtx.createMediaElementSource(musicSong);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 1024;
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

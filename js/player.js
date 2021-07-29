const musicSong = document.querySelector("#audio");
let play = document.querySelector('#play');
let next = document.querySelector('next');
let prev = document.querySelector('prev');
let canvasCtx = document.querySelector('.canvasAnimate');
let ctx = canvasCtx.getContext('2d');
let WIDTH = canvasCtx.width;
let HEIGHT = canvasCtx.height;


function apiArtist(){
    fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/gorillaz')
    .then((response) => response.json())
    .then((data) => {
        const currentSong = data[3].audio;
        ListSong(currentSong);
    });
}

function ListSong(song) {
    musicSong.setAttribute('crossorigin', 'anonymous');
    musicSong.load();
    musicSong.src = song;

    play.addEventListener('click', () =>{
        canvasAnimate(musicSong);
        musicSong.play();
    });
}

function canvasAnimate(musicSong){
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let analyser = audioCtx.createAnalyser();

    let source = audioCtx.createMediaElementSource(musicSong);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 16384;
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
            barHeight = dataArray[i] + 150;
            ctx.fillStyle = 'rgb(' + (barHeight+100) + ',400,10,20)';
            ctx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);
            x += barWidth + 0.5;
        }
        requestAnimationFrame(draw);
    };
    draw();
}

apiArtist();
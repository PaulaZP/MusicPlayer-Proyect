import Songs from "./sesion.js";

const id = localStorage.getItem('nameArtist')

const urlSong = `https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/${id}`;

function apiSong(){
  fetch(urlSong)
  .then((response) => response.json())
  .then((data) => {
    const prueba2 = new Songs(data);
    prueba2.artist();
  });
}
apiSong();

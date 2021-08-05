import Songs from "./sesion.js";
import GeneralPlayer from "./artist.js";

const id = localStorage.getItem('nameArtist');

const urlSong = `https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/${id}`;
const urlArtistInfo = `https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/artists`;

function apiSong(){
  fetch(urlSong)
  .then((response) => response.json())
  .then((data) => {
    const prueba2 = new Songs(data);
    prueba2.artist();
  });
}
apiSong();

function apiArtistDescription(){
  fetch(urlArtistInfo)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((nameArtist) => {
      if(nameArtist.id === id){
        const artistDescription = new GeneralPlayer(nameArtist);
        artistDescription.artistinfo();

      }
    })
  });
}
apiArtistDescription();

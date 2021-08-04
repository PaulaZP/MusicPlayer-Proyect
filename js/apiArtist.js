import GeneralPlayer from './artist.js';
import { songs } from './sesion.js';

function apiArtist(){
  fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/artists')
  .then((response) => response.json())
  .then((data) => {
    const artistData = new GeneralPlayer(data);
    artistData.artist();
  });
}

function apiSong(){
  fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/radiohead')
  .then((response) => response.json())
  .then((data) => {
    const prueba2 = new songs(data);
    prueba2.artist();
  });
}

function apiArtistInfo(){
  fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/artists')
  .then((response) => response.json())
  .then((data) => {
    const prueba1 = new songs(data);
    prueba1.artistinfo();
  });
}
export {apiArtist, apiSong, apiArtistInfo}

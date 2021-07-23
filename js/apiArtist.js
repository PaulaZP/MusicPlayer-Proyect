import GeneralPlayer from './artist.js';

function apiArtist(){
  fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/artists')
  .then((response) => response.json())
  .then((data) => {
    const artistData = new GeneralPlayer(data);
    artistData.artist();
  });
}

export {apiArtist}

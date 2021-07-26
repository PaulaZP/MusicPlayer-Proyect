class GeneralPlayer{
  constructor(data){
    this.data = data;
  }
  artist(){
    for (let i = 0; i < this.data.length; i++) {

      const characterList = document.getElementById('artist_songs');

      const item = document.createElement('li');
      item.setAttribute('class', 'item-artist-list');
      characterList.appendChild(item);

      const picture = document.createElement('img');
      picture.setAttribute('src', `${this.data[i].image}`);
      picture.setAttribute('class', 'picture-album');
      item.appendChild(picture);

      const albumName = document.createElement('p');
      albumName.setAttribute('class', 'name-album');
      item.appendChild(albumName);
      albumName.innerHTML = `${this.data[i].album}`;

      const artistName = document.createElement('p');
      artistName.setAttribute('class', 'name-artist');
      item.appendChild(artistName);
      artistName.innerHTML = `${this.data[i].name}`;

      const buttonplay = document.createElement('a');
      buttonplay.setAttribute('class', 'btn-play-artist');
      item.appendChild(buttonplay);
      buttonplay.innerHTML = `
      <a href="#">
        <img src="img/play.png" alt="">
      </a>`;
    }
  }

  artistinfo(){

      const artistInfoList = document.getElementById('artist_information');

      const itemInfo = document.createElement('div');
      itemInfo.setAttribute('class', 'item-artist-info');
      artistInfoList.appendChild(itemInfo);

      const picturArtist = document.createElement('img');
      picturArtist.setAttribute('src', `${this.data[0].image}`);
      picturArtist.setAttribute('class', 'picture-artist-info');
      itemInfo.appendChild(picturArtist);

      const artistName = document.createElement('p');
      artistName.setAttribute('class', 'name-artist-info');
      itemInfo.appendChild(artistName);
      artistName.innerHTML = `${this.data[0].name}`;

      const artisDescription = document.createElement('p');
      artisDescription.setAttribute('class', 'name-artist-description');
      itemInfo.appendChild(artisDescription);
      artisDescription.innerHTML = `${this.data[0].description}`;
  }
}

fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/radiohead')
.then((response) => response.json())
.then((data) => {
  const prueba2 = new GeneralPlayer(data);
  prueba2.artist();
});

fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/artists')
.then((response) => response.json())
.then((data) => {
  const prueba1 = new GeneralPlayer(data);
  prueba1.artistinfo();
});



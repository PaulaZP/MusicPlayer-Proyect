class Songs{
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
      <a href="player.html">
        <img src="img/play.png" alt="boton play">
      </a>`;
    }
  }
}

export default Songs;



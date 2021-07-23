import {apiArtist} from './apiArtist.js';

apiArtist();

class GeneralPlayer{
  constructor(data){
    this.data = data;
  }
  artist(){
    for (let i = 0; i < this.data.length; i++) {

      const characterList = document.getElementById('character-list-sesion');

      const item = document.createElement('li');
      item.setAttribute('class', 'item-artist-sesion');
      characterList.appendChild(item);

      const picture = document.createElement('img');
      picture.setAttribute('src', `${this.data[i].image}`);
      picture.setAttribute('class', 'picture-artist-sesion');
      item.appendChild(picture);

      const artistName = document.createElement('p');
      artistName.setAttribute('class', 'name-artist-sesion');
      item.appendChild(artistName);
      artistName.innerHTML = `${this.data[i].name}`;
    }
  }
}
export default GeneralPlayer;


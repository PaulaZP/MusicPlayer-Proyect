class GeneralPlayer{
  constructor(data){
    this.data = data;
  }
  artist(){
    const characterList = document.querySelector('.character-list-sesion');
    for (let i = 0; i < this.data.length; i++) {
      const item = document.createElement('li');
      item.setAttribute('class', 'item-artist-sesion');
      characterList.appendChild(item);

      const picture = document.createElement('img');
      picture.setAttribute('src', `${this.data[i].image}`);
      picture.setAttribute('class', 'picture-artist-sesion');
      item.appendChild(picture);

      const a = document.createElement('a');
      a.setAttribute('class', 'name-artist-sesion');
      a.setAttribute('href', 'artistlist.html');
      item.appendChild(a);
      a .innerHTML = `${this.data[i].id}`;
      const name = `${this.data[i].name}`.innerHTML;
      console.log(name);
    }
    characterList.addEventListener('click', (event)=> {
      const artistName = event.target;
      const name = artistName.innerHTML;
      localStorage.setItem('nameArtist',name);
    })
  }
  artistinfo(){
    const artistInfoList = document.querySelector('.artist_information');
      const itemInfo = document.createElement('div');
      itemInfo.setAttribute('class', 'item-artist-info');
      artistInfoList.appendChild(itemInfo);

      const picturArtist = document.createElement('img');
      picturArtist.setAttribute('src', `${this.data.image}`);
      picturArtist.setAttribute('class', 'picture-artist-info');
      itemInfo.appendChild(picturArtist);

      const artistName = document.createElement('p');
      artistName.setAttribute('class', 'name-artist-info');
      itemInfo.appendChild(artistName);
      artistName.innerHTML = `${this.data.name}`;

      const artisDescription = document.createElement('p');
      artisDescription.setAttribute('class', 'name-artist-description');
      itemInfo.appendChild(artisDescription);
      artisDescription.innerHTML = `${this.data.description}`;
  }
}
export default GeneralPlayer;


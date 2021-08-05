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
      a.setAttribute('target', '_blank');
      item.appendChild(a);
      a .innerHTML = `${this.data[i].id}`;
      const name = `${this.data[i].name}`.innerHTML;
      console.log(name);
    }
    characterList.addEventListener('click', (event)=> {
        console.log('hola',event)
        const artistName = event.target;
        const name = artistName.innerHTML;
        console.log(name);
        localStorage.setItem('nameArtist',name);
    })
  }
}
export default GeneralPlayer;


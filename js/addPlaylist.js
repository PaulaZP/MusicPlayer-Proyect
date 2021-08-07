const addPlaylist = document.querySelector('.modal-a');
const formModal = document.querySelector('.form-modal');
const ulPlaylist = document.querySelector('.ul-playlist');

addPlaylist.addEventListener('click', () => {
  const liPlaylist = document.createElement('li');
  ulPlaylist.appendChild(liPlaylist);

  const input = document.querySelector('modal-input');
  ulPlaylist.appendChild(input);
  input.innerHTML = `${formModal.elements[0].value}`;
});

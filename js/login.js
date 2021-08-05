/*const formCreate = document.querySelector('#form-create');

formCreate.addEventListener('submit', (e) => {
  e.preventDefault();
  let inputsCreate = {
    'userName': `${formCreate.elements[0].value}`,
    'email': `${formCreate.elements[1].value}`,
    'password': `${formCreate.elements[2].value}`
  }
  formCreate.elements[0].value = "";
  formCreate.elements[1].value = "";
  formCreate.elements[2].value = "";
  formCreate.elements[3].value = "";

  createAccount(inputsCreate)
});

function createAccount(inputsCreate){
  fetch('https://music-proyect.herokuapp.com/user')
  .then((response) => response.json())
  .then((data) => {
    const data = data.id;
    localStorage.setItem(data);
  });
}*/


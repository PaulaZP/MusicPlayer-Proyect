const formCreate = document.querySelector('.form-create');
const formLogin = document.querySelector('.form-sing');
const message = document.querySelector('#messageError');

function createAccount(inputsCreate){
  fetch('http://localhost:4000/user', {
    method: "POST",
    body: JSON.stringify(inputsCreate),
    headers: {
        'Content-Type': 'application/json'
    },
  })
  .then((response) => {
      return response.json();
  })
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}

formCreate.addEventListener('submit', (e) => {
  e.preventDefault();
  if(formCreate.elements[2].value === formCreate.elements[3].value){
    message.style.display = 'none';
  }else{
    message.style.display = 'block';
  }
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


function login(inputLogin){
  fetch('http://localhost:4000/users/login', {
    method: "POST",
    body: JSON.stringify(inputLogin),
    headers: {
        'Content-Type': 'application/json'
    },
  })
  .then((response) => {
      return response.json();
  })
  .then((data) => {
    console.log(data)
    idUser(data);
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  let inputLogin = {
    'email': `${formLogin.elements[0].value}`,
    'password': `${formLogin.elements[1].value}`
  }
  formLogin.elements[0].value = "";
  formLogin.elements[1].value = "";

  login(inputLogin)
});

function idUser(data) {
  const saveIdUser = localStorage.setItem('userId',data.id);
  console.log(saveIdUser);
  window.location.href = 'home.html';
}

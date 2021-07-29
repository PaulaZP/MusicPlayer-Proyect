const formCreate = document.getElementById('form-create');

const password = document.querySelector("[name='password']");
const passwordCheck = document.querySelector("[name='password check']");

formCreate.addEventListener('submit', (e) => {
  e.preventDefault();

  checkInput();
});

function checkInput() {
  const passwordValue = password.value.trim(); //.trim elimina los espacios en blancoen ambos extremos del string
  const passwordCheckValue =  passwordCheck.value.trim();

  if(passwordValue === '') {
    setErrorFor(password, 'Password cannot be blank');
  } else {
    setExitoFor(password);
  }
  if(passwordCheckValue === '') {
    setErrorFor(passwordCheck, 'Password cannot be blank');
  } else if(passwordCheckValue != passwordValue) {
    setErrorFor(passwordCheck, 'Password does not match');
  } else {
    setExitoFor(passwordCheck);
  }
};

function setErrorFor(input, message) {
  const inputBox = input.parentElement;
  inputBox.className = 'input-box error';
};

function setExitoFor(input) {
  const inputBox = input.parentElement;
  inputBox.className = 'input-box exito';
};

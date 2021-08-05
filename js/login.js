const formCreate = document.querySelector('.form-create');

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





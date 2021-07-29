/*validar el correo*/
function verificarEmail(){
  const email = document.querySelector('#email')
  email.addEventListener('input', (event) => {
    const field  = event.target;
    const verify = document.querySelector('#verifyEmail');
    const caracterEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (caracterEmail.test(field.value)) {
    verify.innerText = "válido";
    } else if(field.value == ""){
      verify.innerText = "";
    }else{
      verify.innerText = "incorrecto";
    }
  });
}

verificarEmail();
verificarName();

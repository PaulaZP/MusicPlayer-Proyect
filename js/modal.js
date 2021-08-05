let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

btn.addEventListener('click', () => {
  modal.style.display = "flex";
})

span.addEventListener('click', () => {
  modal.style.display = "none";
})

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
})


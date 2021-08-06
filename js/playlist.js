function printPlaylist (playlist) {
  //edita la tarea
  const editTarea = document.createElement("button");
  editTarea.className = "edit";
  editTarea.setAttribute("id", `edit-${playlist.contador}`);
  editTarea.dataset.taskId = playlist.contador;
  editTarea.innerHTML = "editar";

  //Borrar
  const deleteTarea = document.createElement("button");
  deleteTarea.className = "delete";
  deleteTarea.setAttribute("id", `delete-${playlist.contador}`);
  deleteTarea.dataset.taskId = playlist.contador;
  deleteTarea.innerHTML = "Borrar";

}

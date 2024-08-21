$(document).ready(function() {
  $("form").on("submit", manejoFomulario);
})
const manejoFomulario = function(e) {
  e.preventDefault();
  let idHeroe = $("#numHeroe").val();
  validarFormulario(idHeroe);
}
function validarFormulario(datos) {
  const token = '5739f919c082050a6eb2e3acfbbcadc6';
  const regex = /^\d+$/;
  if (regex.test(datos) && datos > 0 && datos <= 733 ) {
    $("#img-welcome").addClass("d-none");
    $(".heroe").superhero(token, datos);
  }
  else if( datos> 733){
    alert("Heroe no encontrado. Intenta con un número menor al ingresado.");
  }
  else {
    alert("No se puede buscar heroe. Has ingresado una letra.");
  }
}


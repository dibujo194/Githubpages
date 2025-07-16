document.getElementById('testimonial-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const testimonial = document.getElementById('testimonial').value;

  // Guardar los datos
  localStorage.setItem('testimonialName', name);
  localStorage.setItem('testimonialText', testimonial);

  alert('Gracias por enviar tu testimonio!');

  // Limpiar el formulario
  document.getElementById('name').value = '';
  document.getElementById('testimonial').value = '';
});

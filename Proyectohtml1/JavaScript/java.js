const botones = document.querySelectorAll('.agregar-carrito');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const card = boton.closest('.card');
    const nombre = card.querySelector('p strong')?.innerText || "Producto sin nombre";
    const precioTexto = card.querySelector('.precio')?.innerText || "S/ 0";
    const inputCantidad = card.querySelector('.cantidad');
    const cantidad = inputCantidad ? parseInt(inputCantidad.value) : 1;

    const imagen = card.querySelector('img')?.src || 'images/default.jpg'; 
    const precio = parseFloat(precioTexto.replace(/[^\d.]/g, '')) || 0;
    const total = precio * cantidad;

    const nuevoProducto = {
      nombre,
      precio,
      cantidad,
      total,
      imagen 
    };

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const existente = carrito.find(p => p.nombre === nombre);
    if (existente) {
      existente.cantidad += cantidad;
      existente.total = existente.precio * existente.cantidad;
    } else {
      carrito.push(nuevoProducto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`Producto agregado: ${nombre} (x${cantidad})`);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const tarjetas = document.querySelectorAll('.card');
  const catalogo = [];

  tarjetas.forEach(card => {
    const nombre = card.querySelector('.nombre strong')?.innerText || 'Producto sin nombre';
    const precioTexto = card.querySelector('.precio')?.innerText || 'S/ 0';
    const precio = parseFloat(precioTexto.replace(/[^\d.]/g, '')) || 0;
    const imagen = card.querySelector('img')?.getAttribute('src') || '';
    
    // Buscar info adicional
    const infoExtra = card.querySelectorAll('p');
    let publico = '', uso = '', tallas = '', colores = '';

    infoExtra.forEach(p => {
      const texto = p.innerText.toLowerCase();
      if (texto.includes('público:')) publico = p.innerText.split(':')[1].trim();
      if (texto.includes('uso:')) uso = p.innerText.split(':')[1].trim();
      if (texto.includes('tallas:')) tallas = p.innerText.split(':')[1].trim();
      if (texto.includes('colores:')) colores = p.innerText.split(':')[1].trim();
    });

    catalogo.push({
      nombre,
      precio,
      imagen,
      publico,
      uso,
      tallas,
      colores
    });
  });

  // Guardar catálogo en localStorage
  localStorage.setItem('catalogo', JSON.stringify(catalogo));
});

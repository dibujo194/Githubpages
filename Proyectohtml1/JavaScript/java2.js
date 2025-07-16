function mostrarCarrito(productos) {
  const carritoContainer = document.getElementById('carrito-container');
  carritoContainer.innerHTML = ''; 

  productos.forEach(producto => {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td><img src="${producto.imagen}" alt="${producto.nombre}" width="50"></td>
      <td>${producto.nombre}</td>
      <td>S/ ${producto.precio}</td>
      <td>
        <input type="number" value="${producto.cantidad}" min="1" 
          class="input-cantidad" 
          data-nombre="${producto.nombre}" 
          data-precio="${producto.precio}"
          style="width: 50px; padding: 4px;">
      </td>
      <td class="total-producto">S/ ${producto.precio * producto.cantidad}</td>
      <td><button onclick="eliminarProducto('${producto.nombre}')">Eliminar</button></td>
    `;

    carritoContainer.appendChild(fila);

    // Escuchar cambios de cantidad
    const inputCantidad = fila.querySelector('.input-cantidad');
    inputCantidad.addEventListener('input', function () {
      const nuevaCantidad = parseInt(this.value);
      const nombre = this.getAttribute('data-nombre');
      const precio = parseFloat(this.getAttribute('data-precio'));
      const totalCelda = fila.querySelector('.total-producto');

      if (nuevaCantidad >= 1) {
        // Actualizar total visual
        totalCelda.textContent = 'S/ ' + (nuevaCantidad * precio);

        // Actualizar en localStorage
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.map(p => {
          if (p.nombre === nombre) {
            p.cantidad = nuevaCantidad;
            p.total = nuevaCantidad * precio;
          }
          return p;
        });

        localStorage.setItem('carrito', JSON.stringify(carrito));
      }
    });
  });
}

function eliminarProducto(nombre) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(producto => producto.nombre !== nombre);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito(carrito);
  mostrarSugerencias(); // Vuelve a mostrar sugerencias al eliminar
}

function ordenarPorPrecio() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.sort((a, b) => a.precio - b.precio);  
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito(carrito);
}

function buscarProductoPorNombre() {
  const searchQuery = document.getElementById('buscarProducto').value.toLowerCase();
  const catalogo = JSON.parse(localStorage.getItem('catalogo')) || [];

  const productosFiltrados = catalogo.filter(producto =>
    producto.nombre.toLowerCase().includes(searchQuery)
  );

  mostrarResultadosDeCatalogo(productosFiltrados);
}

function mostrarResultadosDeCatalogo(productos) {
  const carritoContainer = document.getElementById('carrito-container');
  carritoContainer.innerHTML = '';

  productos.forEach(producto => {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td><img src="${producto.imagen}" alt="${producto.nombre}" width="50"></td>
      <td>${producto.nombre}</td>
      <td>S/ ${producto.precio}</td>
      <td><button onclick="agregarAlCarrito('${producto.nombre}')">Agregar</button></td>
    `;

    carritoContainer.appendChild(fila);
  });
}

function agregarAlCarrito(nombreProducto) {
  const catalogo = JSON.parse(localStorage.getItem('catalogo')) || [];
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const producto = catalogo.find(p => p.nombre === nombreProducto);
  if (!producto) return;

  const yaEnCarrito = carrito.find(p => p.nombre === producto.nombre);
  if (yaEnCarrito) {
    yaEnCarrito.cantidad += 1;
    yaEnCarrito.total = yaEnCarrito.precio * yaEnCarrito.cantidad;
  } else {
    carrito.push({
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1,
      total: producto.precio
    });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito(carrito);
  mostrarSugerencias();
}

function mostrarSugerencias() {
  const catalogo = JSON.parse(localStorage.getItem('catalogo')) || [];
  const sugerenciasContainer = document.getElementById('sugerencias');
  sugerenciasContainer.innerHTML = '';

  catalogo.slice(0, 5).forEach(producto => {
    const card = document.createElement('div');
    card.className = 'sugerencia-card';

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <p><strong>${producto.nombre}</strong></p>
      <p>S/ ${producto.precio}</p>
      <button onclick="agregarAlCarrito('${producto.nombre}')">AGREGAR</button>
    `;

    sugerenciasContainer.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const productos = JSON.parse(localStorage.getItem('carrito')) || [];
  mostrarCarrito(productos);
  mostrarSugerencias();
});

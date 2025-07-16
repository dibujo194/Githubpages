const catalogo = [
  { nombre: "Blazer negro hombre", precio: 4000 },
  { nombre: "Chaqueta gris mujer", precio: 1100 },
  { nombre: "Falda negra", precio: 2100 },
  { nombre: "Zapato negro brillante", precio: 1100 },
  { nombre: "Zapato marrón de cuero", precio: 2200 },
  { nombre: "Reloj deportivo de lujo", precio: 1800 },
  { nombre: "Cartera negra elegante", precio: 7500 },
  { nombre: "Suéter tejido grueso", precio: 1500 },
  { nombre: "Abrigo ligero", precio: 2200 },
  { nombre: "Vestido floral", precio: 2000 },
  { nombre: "Camisa estampada", precio: 1300 },
  { nombre: "Shorts denim", precio: 900 },
  { nombre: "Top sin mangas", precio: 750 },
  { nombre: "Chaqueta acolchada", precio: 3000 },
  { nombre: "Pantalón térmico", precio: 2200 }
];

let productoSeleccionado = null;

function buscarProducto() {
  const entrada = document.getElementById("buscarProducto").value.trim().toLowerCase();
  const resultado = document.getElementById("resultadoBusqueda");
  const seccionTalla = document.getElementById("seccionTalla");
  const resultadoFinal = document.getElementById("resultado");

  resultadoFinal.innerHTML = "";
  seccionTalla.style.display = "none";
  productoSeleccionado = null;

  if (entrada === "") {
    resultado.innerHTML = "<p style='color:red;'>Ingresa un nombre de producto.</p>";
    return;
  }

  const producto = catalogo.find(p => p.nombre.toLowerCase().includes(entrada));

  if (producto) {
    productoSeleccionado = producto;
    resultado.innerHTML = `
      <p style="color:green;">Producto encontrado: <strong>${producto.nombre}</strong></p>
      <p>Precio: <strong>S/ ${producto.precio.toFixed(2)}</strong></p>
      <p>Ahora completa tus datos para calcular la talla 👇</p>
    `;
    seccionTalla.style.display = "block";
  } else {
    resultado.innerHTML = `<p style='color:red;'>El producto "<strong>${entrada}</strong>" no está en el catálogo.</p>`;
  }
}

function calcularTalla() {
  const sexo = document.getElementById('sexo').value;
  const estatura = parseInt(document.getElementById('estatura').value);
  const peso = parseInt(document.getElementById('peso').value);
  const resultado = document.getElementById('resultado');

  if (!productoSeleccionado) {
    resultado.innerHTML = "<p style='color:red;'>Primero busca un producto válido.</p>";
    return;
  }

  if (!sexo || isNaN(estatura) || isNaN(peso)) {
    resultado.innerHTML = "<p style='color:red;'>Completa todos los campos correctamente.</p>";
    return;
  }

  const talla = obtenerTalla(sexo, estatura, peso);
  const imc = (peso / ((estatura / 100) ** 2)).toFixed(1);

  resultado.innerHTML = `
    <p style="color:green;">Talla recomendada: <strong>${talla}</strong> (IMC: ${imc})</p>
  `;
}

function obtenerTalla(sexo, estatura, peso) {
  if (sexo === "hombre") {
    if (estatura < 160 || peso < 60) return "S";
    if (estatura <= 170 || peso <= 75) return "M";
    if (estatura <= 180 || peso <= 90) return "L";
    return "XL";
  } else {
    if (estatura < 155 || peso < 50) return "S";
    if (estatura <= 165 || peso <= 65) return "M";
    if (estatura <= 175 || peso <= 80) return "L";
    return "XL";
  }
}

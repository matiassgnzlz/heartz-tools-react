// src/utils/persistencia.js
// Concentra en un solo lugar la lectura/escritura en localStorage,
// así App la usa y las pruebas pueden observarla con un espía.
const CLAVE = 'carrito';

export function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE, JSON.stringify(carrito));
}

export function cargarCarrito() {
  try {
    const texto = localStorage.getItem(CLAVE);
    return texto ? JSON.parse(texto) : [];
  } catch {
    // Contenido dañado o localStorage no disponible: se parte con carrito vacío
    return [];
  }
}

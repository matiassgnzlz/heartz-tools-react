// src/utils/precio.js
// Función pura: recibe un número y devuelve el texto que se muestra en pantalla.
export function formatearPrecio(valor) {
  if (valor === 0) return 'Gratis';
  return `$${valor.toLocaleString('es-CL')}`;
}

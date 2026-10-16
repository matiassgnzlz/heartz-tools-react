// src/utils/validarProducto.js
// Lógica de validación del formulario de productos.
// Es una función pura (no usa React ni el DOM), por eso es fácil de probar.

export const esUrlValida = (texto) => {
  try {
    const url = new URL(texto);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Valida los campos del formulario de producto.
 * @param {object} valores  { nombre, categoria, precio, descripcion, imagen }
 * @param {Array}  existentes productos ya registrados (para detectar nombres repetidos)
 * @returns {object} errores por campo. Si está vacío, el formulario es válido.
 */
export const validarProducto = (valores, existentes = []) => {
  const errores = {};
  const nombre = (valores.nombre ?? '').trim();
  const categoria = (valores.categoria ?? '').trim();
  const descripcion = (valores.descripcion ?? '').trim();
  const imagen = (valores.imagen ?? '').trim();
  const precio = Number(valores.precio);

  if (nombre.length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres';
  } else if (nombre.length > 60) {
    errores.nombre = 'El nombre no puede superar los 60 caracteres';
  } else if (existentes.some((p) => p.nombre.trim().toLowerCase() === nombre.toLowerCase())) {
    errores.nombre = 'Ya existe un producto con ese nombre';
  }

  if (categoria.length < 3) {
    errores.categoria = 'Ingresa una categoría (mínimo 3 caracteres)';
  }

  if (valores.precio === '' || valores.precio === null || valores.precio === undefined || Number.isNaN(precio)) {
    errores.precio = 'Ingresa un precio';
  } else if (precio <= 0) {
    errores.precio = 'El precio debe ser mayor a 0';
  } else if (!Number.isInteger(precio)) {
    errores.precio = 'El precio debe ser un número entero (sin decimales)';
  }

  if (descripcion.length < 10) {
    errores.descripcion = 'La descripción debe tener al menos 10 caracteres';
  } else if (descripcion.length > 200) {
    errores.descripcion = 'La descripción no puede superar los 200 caracteres';
  }

  // La imagen es opcional, pero si se escribe debe ser una URL válida
  if (imagen !== '' && !esUrlValida(imagen)) {
    errores.imagen = 'Ingresa una URL válida (debe comenzar con http:// o https://)';
  }

  return errores;
};

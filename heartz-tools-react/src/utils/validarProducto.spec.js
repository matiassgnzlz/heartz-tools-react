import { validarProducto, esUrlValida } from './validarProducto';

describe('validarProducto', () => {
  // Datos de prueba claros: un producto válido que se modifica caso a caso
  const productoValido = {
    nombre: 'Bajo Eléctrico',
    categoria: 'Bajos',
    precio: '250000',
    descripcion: 'Bajo de 4 cuerdas con acabado negro',
    imagen: '',
  };

  it('debería devolver un objeto vacío cuando todos los datos son válidos', () => {
    expect(validarProducto(productoValido)).toEqual({});
  });

  it('debería rechazar un nombre demasiado corto o formado solo por espacios', () => {
    expect(validarProducto({ ...productoValido, nombre: 'ab' }).nombre).toContain('al menos 3');
    expect(validarProducto({ ...productoValido, nombre: '     ' }).nombre).toContain('al menos 3');
  });

  it('debería rechazar precios vacíos, cero, negativos o con decimales', () => {
    expect(validarProducto({ ...productoValido, precio: '' }).precio).toBe('Ingresa un precio');
    expect(validarProducto({ ...productoValido, precio: '0' }).precio).toContain('mayor a 0');
    expect(validarProducto({ ...productoValido, precio: '-5000' }).precio).toContain('mayor a 0');
    expect(validarProducto({ ...productoValido, precio: '99.5' }).precio).toContain('entero');
  });

  it('debería rechazar una descripción de menos de 10 caracteres', () => {
    expect(validarProducto({ ...productoValido, descripcion: 'corta' }).descripcion).toContain('al menos 10');
  });

  it('debería aceptar la imagen vacía pero rechazar una URL inválida', () => {
    expect(validarProducto({ ...productoValido, imagen: '' }).imagen).toBeUndefined();
    expect(validarProducto({ ...productoValido, imagen: 'holaaa' }).imagen).toContain('URL válida');
    expect(validarProducto({ ...productoValido, imagen: 'https://sitio.cl/foto.png' }).imagen).toBeUndefined();
    expect(esUrlValida('ftp://sitio.cl/foto.png')).toBeFalse();
  });

  it('debería detectar un nombre repetido sin distinguir mayúsculas ni espacios', () => {
    const existentes = [{ nombre: 'Bajo Eléctrico' }];
    expect(validarProducto({ ...productoValido, nombre: '  bajo eléctrico ' }, existentes).nombre).toContain('Ya existe');
  });
});

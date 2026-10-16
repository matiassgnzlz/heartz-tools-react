import {
  obtenerProductos,
  obtenerProductoPorId,
  agregarProducto,
  eliminarProducto,
  actualizarProducto,
} from './productosData';

describe('productosData (CRUD)', () => {
  const productoNuevo = { nombre: 'Teclado', categoria: 'Teclados', precio: 99000, enOferta: false, imagen: '', descripcion: 'Teclado 61 teclas' };
  let idNuevo;

  afterEach(() => {
    // Deja los datos como estaban antes de cada prueba
    if (idNuevo) eliminarProducto(idNuevo);
    idNuevo = undefined;
  });

  it('debería asignar un id nuevo y agregar el producto a la lista', () => {
    const cantidadAntes = obtenerProductos().length;
    const lista = agregarProducto(productoNuevo);
    idNuevo = lista[lista.length - 1].id;

    expect(lista.length).toBe(cantidadAntes + 1);
    expect(obtenerProductoPorId(idNuevo).nombre).toBe('Teclado');
  });

  it('debería quitar el producto de la lista según su id', () => {
    const lista = agregarProducto(productoNuevo);
    const id = lista[lista.length - 1].id;

    const despues = eliminarProducto(id);

    expect(despues.find((p) => p.id === id)).toBeUndefined();
  });

  it('debería modificar solo los campos indicados al actualizar', () => {
    const lista = agregarProducto(productoNuevo);
    idNuevo = lista[lista.length - 1].id;

    actualizarProducto(idNuevo, { precio: 1000 });

    const producto = obtenerProductoPorId(idNuevo);
    expect(producto.precio).toBe(1000);
    expect(producto.nombre).toBe('Teclado');
  });
});

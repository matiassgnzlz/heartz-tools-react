import {
  obtenerProductos,
  obtenerProductoPorId,
  agregarProducto,
  eliminarProducto,
  actualizarProducto,
} from './productosData';

describe('productosData (CRUD)', () => {
  const nuevo = { nombre: 'Teclado', categoria: 'Teclados', precio: 99000, enOferta: false, imagen: '', descripcion: 'Teclado 61 teclas' };
  let idNuevo;

  afterEach(() => {
    // Deja los datos como estaban antes de cada prueba
    if (idNuevo) eliminarProducto(idNuevo);
    idNuevo = undefined;
  });

  it('obtenerProductos devuelve los productos iniciales', () => {
    expect(obtenerProductos().length).toBeGreaterThanOrEqual(4);
  });

  it('agregarProducto asigna un id nuevo y lo agrega a la lista', () => {
    const antes = obtenerProductos().length;
    const lista = agregarProducto(nuevo);
    idNuevo = lista[lista.length - 1].id;
    expect(lista.length).toBe(antes + 1);
    expect(obtenerProductoPorId(idNuevo).nombre).toBe('Teclado');
  });

  it('eliminarProducto quita el producto por id', () => {
    const lista = agregarProducto(nuevo);
    const id = lista[lista.length - 1].id;
    const despues = eliminarProducto(id);
    expect(despues.find((p) => p.id === id)).toBeUndefined();
  });

  it('actualizarProducto modifica solo los campos indicados', () => {
    const lista = agregarProducto(nuevo);
    idNuevo = lista[lista.length - 1].id;
    actualizarProducto(idNuevo, { precio: 1000 });
    const p = obtenerProductoPorId(idNuevo);
    expect(p.precio).toBe(1000);
    expect(p.nombre).toBe('Teclado');
  });

  it('obtenerProductoPorId devuelve undefined si no existe', () => {
    expect(obtenerProductoPorId(99999)).toBeUndefined();
  });
});

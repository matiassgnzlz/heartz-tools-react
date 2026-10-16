import { guardarCarrito, cargarCarrito } from './persistencia';

describe('guardarCarrito', () => {
  it('debería guardar el carrito serializado en localStorage', () => {
    // Espía: observa setItem sin escribir de verdad en el navegador
    const espia = spyOn(Storage.prototype, 'setItem');
    const carrito = [{ id: 1, nombre: 'Guitarra', precio: 180000, cantidad: 2 }];

    guardarCarrito(carrito);

    expect(espia).toHaveBeenCalledWith('carrito', JSON.stringify(carrito));
  });
});

describe('cargarCarrito', () => {
  it('debería devolver el carrito guardado', () => {
    const carrito = [{ id: 2, nombre: 'Batería', precio: 450000, cantidad: 1 }];
    spyOn(Storage.prototype, 'getItem').and.returnValue(JSON.stringify(carrito));

    expect(cargarCarrito()).toEqual(carrito);
  });

  it('debería devolver un arreglo vacío si no hay nada guardado', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue(null);

    expect(cargarCarrito()).toEqual([]);
  });

  it('debería devolver un arreglo vacío si el contenido guardado está dañado', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue('{esto no es json');

    expect(cargarCarrito()).toEqual([]);
  });
});

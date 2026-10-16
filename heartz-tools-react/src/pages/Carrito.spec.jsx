import Carrito from './Carrito';
import { render, click, limpiar } from '../test/utils';

describe('Carrito', () => {
  const items = [
    { id: 1, nombre: 'Guitarra', precio: 100000, cantidad: 2 },
    { id: 2, nombre: 'Micrófono', precio: 50000, cantidad: 1 },
  ];
  afterEach(limpiar);

  it('debería mostrar un mensaje cuando el carrito está vacío', () => {
    const dom = render(<Carrito carrito={[]} onEliminarItem={() => {}} />);
    expect(dom.querySelector('.alert').textContent).toContain('carrito está vacío');
    expect(dom.querySelector('ul')).toBeNull();
  });

  it('debería listar un elemento por cada producto del carrito', () => {
    const dom = render(<Carrito carrito={items} onEliminarItem={() => {}} />);
    expect(dom.querySelectorAll('li.list-group-item').length).toBe(2);
  });

  it('debería calcular el total sumando precio por cantidad', () => {
    const dom = render(<Carrito carrito={items} onEliminarItem={() => {}} />);
    // 100000*2 + 50000*1 = 250000
    expect(dom.querySelector('h4 .text-success').textContent).toBe('$250.000');
  });

  it('debería llamar a onEliminarItem con el id al presionar Eliminar', () => {
    const onEliminarItem = jasmine.createSpy('onEliminarItem');
    const dom = render(<Carrito carrito={items} onEliminarItem={onEliminarItem} />);

    click(dom.querySelector('li button'));

    expect(onEliminarItem).toHaveBeenCalledWith(1);
  });

  it('debería mostrar una alerta de compra al presionar Pagar', () => {
    spyOn(window, 'alert'); // mock de alert para no abrir el diálogo real
    const dom = render(<Carrito carrito={items} onEliminarItem={() => {}} />);
    const pagar = [...dom.querySelectorAll('button')].find((b) => b.textContent.includes('Pagar'));

    click(pagar);

    expect(window.alert).toHaveBeenCalledWith('¡Compra realizada con éxito!');
  });
});

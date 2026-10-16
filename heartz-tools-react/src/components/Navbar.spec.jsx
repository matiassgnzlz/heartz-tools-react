import Navbar from './Navbar';
import { render, limpiar } from '../test/utils';

describe('Navbar', () => {
  afterEach(limpiar);

  it('debería ocultar el contador del carrito cuando está vacío', () => {
    const dom = render(<Navbar totalCarrito={0} />);
    expect(dom.querySelector('.badge')).toBeNull();
  });

  it('debería mostrar la cantidad total de productos en el contador', () => {
    const dom = render(<Navbar totalCarrito={5} />);
    expect(dom.querySelector('.badge').textContent).toBe('5');
  });
});

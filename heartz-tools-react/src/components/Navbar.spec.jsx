import Navbar from './Navbar';
import { render, limpiar } from '../tests/utils';

describe('Navbar', () => {
  afterEach(limpiar);

  it('muestra los enlaces de navegación principales', () => {
    const dom = render(<Navbar totalCarrito={0} />);
    const hrefs = [...dom.querySelectorAll('a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(jasmine.arrayContaining(['/', '/admin', '/carrito']));
  });

  it('no muestra el contador del carrito cuando está vacío', () => {
    const dom = render(<Navbar totalCarrito={0} />);
    expect(dom.querySelector('.badge')).toBeNull();
  });

  it('muestra la cantidad total de productos en el contador', () => {
    const dom = render(<Navbar totalCarrito={5} />);
    expect(dom.querySelector('.badge').textContent).toBe('5');
  });

  it('incluye el botón hamburguesa de Bootstrap para pantallas pequeñas', () => {
    const dom = render(<Navbar totalCarrito={0} />);
    const toggler = dom.querySelector('.navbar-toggler');
    expect(toggler.getAttribute('data-bs-toggle')).toBe('collapse');
  });
});

import ProductCard from './ProductCard';
import { render, click, limpiar } from '../tests/utils';

describe('ProductCard', () => {
  // Datos de prueba (fixture)
  const producto = {
    id: 7,
    nombre: 'Bajo Eléctrico',
    categoria: 'Bajos',
    precio: 250000,
    enOferta: true,
    imagen: '',
    descripcion: 'Bajo de 4 cuerdas',
  };
  let onAgregarCarrito;

  beforeEach(() => {
    // Mock: función espía que registra cómo fue llamada
    onAgregarCarrito = jasmine.createSpy('onAgregarCarrito');
  });
  afterEach(limpiar);

  it('muestra nombre, categoría y descripción del producto', () => {
    const dom = render(<ProductCard prod={producto} onAgregarCarrito={onAgregarCarrito} />);
    expect(dom.querySelector('.card-title').textContent).toContain('Bajo Eléctrico');
    expect(dom.querySelector('.badge.bg-dark').textContent).toBe('Bajos');
    expect(dom.querySelector('.card-text').textContent).toBe('Bajo de 4 cuerdas');
  });

  it('muestra el precio con formato chileno', () => {
    const dom = render(<ProductCard prod={producto} onAgregarCarrito={onAgregarCarrito} />);
    expect(dom.querySelector('.text-success').textContent).toBe('$250.000');
  });

  it('muestra el badge de oferta solo si enOferta es true', () => {
    const conOferta = render(<ProductCard prod={producto} onAgregarCarrito={onAgregarCarrito} />);
    expect(conOferta.querySelector('.badge.bg-danger')).not.toBeNull();

    const sinOferta = render(
      <ProductCard prod={{ ...producto, enOferta: false }} onAgregarCarrito={onAgregarCarrito} />
    );
    expect(sinOferta.querySelector('.badge.bg-danger')).toBeNull();
  });

  it('llama a onAgregarCarrito con el producto al presionar "Añadir al carrito"', () => {
    const dom = render(<ProductCard prod={producto} onAgregarCarrito={onAgregarCarrito} />);
    const boton = [...dom.querySelectorAll('button')].find((b) => b.textContent.includes('Añadir'));
    click(boton);
    expect(onAgregarCarrito).toHaveBeenCalledTimes(1);
    expect(onAgregarCarrito).toHaveBeenCalledWith(producto);
  });

  it('enlaza a la página de detalle del producto', () => {
    const dom = render(<ProductCard prod={producto} onAgregarCarrito={onAgregarCarrito} />);
    const enlaces = [...dom.querySelectorAll('a')].map((a) => a.getAttribute('href'));
    expect(enlaces).toContain('/producto/7');
  });
});

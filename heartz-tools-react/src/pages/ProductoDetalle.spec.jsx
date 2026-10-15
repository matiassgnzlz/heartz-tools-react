import { Routes, Route } from 'react-router-dom';
import ProductoDetalle from './ProductoDetalle';
import { render, click, limpiar } from '../tests/utils';

describe('ProductoDetalle', () => {
  const productos = [
    { id: 1, nombre: 'Guitarra', categoria: 'Guitarras', precio: 180000, enOferta: false, imagen: '', descripcion: 'Una guitarra' },
  ];
  const montar = (ruta, onAgregarCarrito = () => {}) =>
    render(
      <Routes>
        <Route path="/producto/:id" element={<ProductoDetalle productos={productos} onAgregarCarrito={onAgregarCarrito} />} />
      </Routes>,
      { ruta }
    );
  afterEach(limpiar);

  it('muestra la información del producto según el id de la URL', () => {
    const dom = montar('/producto/1');
    expect(dom.querySelector('h1').textContent).toBe('Guitarra');
    expect(dom.textContent).toContain('$180.000');
  });

  it('agrega el producto al carrito desde la página de detalle', () => {
    const spy = jasmine.createSpy('onAgregarCarrito');
    const dom = montar('/producto/1', spy);
    const boton = [...dom.querySelectorAll('button')].find((b) => b.textContent.includes('Añadir'));
    click(boton);
    expect(spy).toHaveBeenCalledWith(productos[0]);
  });

  it('muestra "Producto no encontrado" si el id no existe', () => {
    const dom = montar('/producto/999');
    expect(dom.textContent).toContain('Producto no encontrado');
  });
});

import Admin from './Admin';
import { render, click, limpiar } from '../tests/utils';

describe('Admin', () => {
  const productos = [
    { id: 1, nombre: 'Guitarra', categoria: 'Guitarras', precio: 180000 },
    { id: 2, nombre: 'Batería', categoria: 'Baterías', precio: 450000 },
  ];
  afterEach(limpiar);

  it('muestra una fila en la tabla por cada producto', () => {
    const dom = render(<Admin productos={productos} onAgregarProducto={() => {}} onEliminarProducto={() => {}} />);
    expect(dom.querySelectorAll('tbody tr').length).toBe(2);
  });

  it('el formulario tiene los campos obligatorios', () => {
    const dom = render(<Admin productos={productos} onAgregarProducto={() => {}} onEliminarProducto={() => {}} />);
    ['nombre', 'categoria', 'precio', 'descripcion'].forEach((campo) => {
      expect(dom.querySelector(`[name="${campo}"]`).required).toBeTrue();
    });
  });

  it('llama a onEliminarProducto con el id correcto', () => {
    const onEliminar = jasmine.createSpy('onEliminarProducto');
    const dom = render(<Admin productos={productos} onAgregarProducto={() => {}} onEliminarProducto={onEliminar} />);
    click(dom.querySelectorAll('tbody button')[1]);
    expect(onEliminar).toHaveBeenCalledWith(2);
  });
});

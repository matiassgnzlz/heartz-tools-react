import Admin from './Admin';
import { render, click, escribir, enviar, limpiar } from '../test/utils';

describe('Admin (tabla de productos)', () => {
  const productos = [
    { id: 1, nombre: 'Guitarra', categoria: 'Guitarras', precio: 180000 },
    { id: 2, nombre: 'Batería', categoria: 'Baterías', precio: 450000 },
  ];
  afterEach(limpiar);

  it('debería mostrar una fila en la tabla por cada producto', () => {
    const dom = render(<Admin productos={productos} onAgregarProducto={() => {}} onEliminarProducto={() => {}} />);
    expect(dom.querySelectorAll('tbody tr').length).toBe(2);
  });

  it('debería llamar a onEliminarProducto con el id correcto', () => {
    const onEliminar = jasmine.createSpy('onEliminarProducto');
    const dom = render(<Admin productos={productos} onAgregarProducto={() => {}} onEliminarProducto={onEliminar} />);

    click(dom.querySelectorAll('tbody button')[1]);

    expect(onEliminar).toHaveBeenCalledWith(2);
  });
});

describe('Admin (validación del formulario)', () => {
  const existentes = [{ id: 1, nombre: 'Guitarra', categoria: 'Guitarras', precio: 180000 }];
  let onAgregar;

  const montar = () =>
    render(<Admin productos={existentes} onAgregarProducto={onAgregar} onEliminarProducto={() => {}} />);

  const llenarFormularioValido = (dom) => {
    escribir(dom.querySelector('[name="nombre"]'), '  Teclado Yamaha ');
    escribir(dom.querySelector('[name="categoria"]'), 'Teclados');
    escribir(dom.querySelector('[name="precio"]'), '350000');
    escribir(dom.querySelector('[name="descripcion"]'), 'Teclado de 61 teclas sensibles');
  };

  beforeEach(() => {
    // Mock: si la validación falla, esta función NO debe ser llamada
    onAgregar = jasmine.createSpy('onAgregarProducto');
  });
  afterEach(limpiar);

  it('debería mostrar un error por cada campo obligatorio al enviar vacío y no guardar', () => {
    const dom = montar();
    enviar(dom.querySelector('form'));
    expect(dom.querySelectorAll('.invalid-feedback').length).toBe(4);
    expect(onAgregar).not.toHaveBeenCalled();
  });

  it('debería marcar el campo inválido con la clase is-invalid de Bootstrap', () => {
    const dom = montar();
    enviar(dom.querySelector('form'));
    expect(dom.querySelector('[name="nombre"]').classList.contains('is-invalid')).toBeTrue();
  });

  it('debería rechazar un producto con precio negativo', () => {
    const dom = montar();
    llenarFormularioValido(dom);
    escribir(dom.querySelector('[name="precio"]'), '-100');

    enviar(dom.querySelector('form'));

    expect(dom.querySelector('[name="precio"] ~ .invalid-feedback').textContent).toContain('mayor a 0');
    expect(onAgregar).not.toHaveBeenCalled();
  });

  it('debería rechazar un producto cuyo nombre ya existe', () => {
    const dom = montar();
    llenarFormularioValido(dom);
    escribir(dom.querySelector('[name="nombre"]'), 'guitarra');

    enviar(dom.querySelector('form'));

    expect(dom.querySelector('[name="nombre"] ~ .invalid-feedback').textContent).toContain('Ya existe');
    expect(onAgregar).not.toHaveBeenCalled();
  });

  it('debería llamar a onAgregarProducto con datos limpios y el precio como número', () => {
    const dom = montar();
    llenarFormularioValido(dom);

    enviar(dom.querySelector('form'));

    expect(onAgregar).toHaveBeenCalledTimes(1);
    expect(onAgregar).toHaveBeenCalledWith({
      nombre: 'Teclado Yamaha',
      categoria: 'Teclados',
      precio: 350000,
      enOferta: false,
      imagen: '',
      descripcion: 'Teclado de 61 teclas sensibles',
    });
  });

  it('debería vaciar el formulario y mostrar el mensaje de éxito tras guardar', () => {
    const dom = montar();
    llenarFormularioValido(dom);

    enviar(dom.querySelector('form'));

    expect(dom.querySelector('.alert-success').textContent).toContain('agregado con éxito');
    expect(dom.querySelector('[name="nombre"]').value).toBe('');
  });

  it('debería quitar el mensaje de error de un campo al corregirlo', () => {
    const dom = montar();
    enviar(dom.querySelector('form'));
    expect(dom.querySelector('[name="nombre"]').classList.contains('is-invalid')).toBeTrue();

    escribir(dom.querySelector('[name="nombre"]'), 'Bajo');

    expect(dom.querySelector('[name="nombre"]').classList.contains('is-invalid')).toBeFalse();
  });
});

// src/pages/Admin.jsx
import { useState } from 'react';
import { validarProducto } from '../utils/validarProducto';
import { formatearPrecio } from '../utils/precio';

const FORM_INICIAL = {
  nombre: '',
  categoria: '',
  precio: '',
  enOferta: false,
  descripcion: '',
  imagen: '',
};

const Admin = ({ productos, onAgregarProducto, onEliminarProducto }) => {
  // Estado controlado: valores del formulario, errores por campo y mensaje de éxito
  const [valores, setValores] = useState(FORM_INICIAL);
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValores({ ...valores, [name]: type === 'checkbox' ? checked : value });
    // Al corregir un campo, se limpia su error
    if (errores[name]) setErrores({ ...errores, [name]: undefined });
    setExito(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validarProducto(valores, productos);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setExito(false);
      return;
    }
    onAgregarProducto({
      nombre: valores.nombre.trim(),
      categoria: valores.categoria.trim(),
      precio: Number(valores.precio),
      enOferta: valores.enOferta,
      imagen: valores.imagen.trim(),
      descripcion: valores.descripcion.trim(),
    });
    setValores(FORM_INICIAL);
    setErrores({});
    setExito(true);
  };

  // Devuelve la clase de Bootstrap según si el campo tiene error
  const clase = (campo) => `form-control${errores[campo] ? ' is-invalid' : ''}`;

  return (
    <div className="container py-3">
      <h2 className="mb-4 fw-bold text-dark"> Panel de Administración</h2>

      {/* Formulario para agregar producto */}
      <div className="card p-4 shadow-sm border border-secondary-subtle mb-4 bg-white">
        <h5 className="fw-bold mb-3 text-dark">Agregar Nuevo Producto</h5>

        {exito && (
          <div className="alert alert-success" role="status">¡Producto agregado con éxito!</div>
        )}

        <form onSubmit={handleSubmit} noValidate className="row g-3">
          <div className="col-12 col-md-4">
            <input type="text" name="nombre" className={clase('nombre')} placeholder="Nombre del producto"
              value={valores.nombre} onChange={handleChange} />
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>
          <div className="col-12 col-md-3">
            <input type="text" name="categoria" className={clase('categoria')} placeholder="Categoría"
              value={valores.categoria} onChange={handleChange} />
            {errores.categoria && <div className="invalid-feedback">{errores.categoria}</div>}
          </div>
          <div className="col-12 col-md-3">
            <input type="number" name="precio" className={clase('precio')} placeholder="Precio"
              value={valores.precio} onChange={handleChange} />
            {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
          </div>
          <div className="col-12 col-md-2 d-flex align-items-center">
            <div className="form-check">
              <input type="checkbox" name="enOferta" className="form-check-input" id="ofertaCheck"
                checked={valores.enOferta} onChange={handleChange} />
              <label className="form-check-label text-dark fw-semibold" htmlFor="ofertaCheck">Oferta</label>
            </div>
          </div>
          <div className="col-12">
            <textarea name="descripcion" className={clase('descripcion')} placeholder="Descripción" rows="2"
              value={valores.descripcion} onChange={handleChange}></textarea>
            {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
          </div>
          <div className="col-12">
            <input type="text" name="imagen" className={clase('imagen')} placeholder="URL de imagen (opcional)"
              value={valores.imagen} onChange={handleChange} />
            {errores.imagen && <div className="invalid-feedback">{errores.imagen}</div>}
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-dark fw-semibold px-4">Guardar Producto</button>
          </div>
        </form>
      </div>

      {/* Tabla de Productos */}
      <div className="card p-4 shadow-sm border border-secondary-subtle bg-white">
        <h5 className="fw-bold mb-3 text-dark">Lista de Productos Registrados</h5>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td className="fw-semibold">{p.id}</td>
                  <td className="fw-bold text-dark">{p.nombre}</td>
                  <td><span className="badge bg-secondary">{p.categoria}</span></td>
                  <td className="text-success fw-bold">{formatearPrecio(p.precio)}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger fw-semibold" onClick={() => onEliminarProducto(p.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
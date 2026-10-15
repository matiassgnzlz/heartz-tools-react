// src/pages/Admin.jsx
import React from 'react';

const Admin = ({ productos, onAgregarProducto, onEliminarProducto }) => {
  return (
    <div className="container py-3">
      <h2 className="mb-4 fw-bold text-dark"> Panel de Administración</h2>
      
      {/* Formulario para agregar producto */}
      <div className="card p-4 shadow-sm border border-secondary-subtle mb-4 bg-white">
        <h5 className="fw-bold mb-3 text-dark">Agregar Nuevo Producto</h5>
        <form onSubmit={onAgregarProducto} className="row g-3">
          <div className="col-md-4">
            <input type="text" name="nombre" className="form-control" placeholder="Nombre del producto" required />
          </div>
          <div className="col-md-3">
            <input type="text" name="categoria" className="form-control" placeholder="Categoría" required />
          </div>
          <div className="col-md-3">
            <input type="number" name="precio" className="form-control" placeholder="Precio" required />
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <div className="form-check">
              <input type="checkbox" name="enOferta" className="form-check-input" id="ofertaCheck" />
              <label className="form-check-label text-dark fw-semibold" htmlFor="ofertaCheck">Oferta</label>
            </div>
          </div>
          <div className="col-md-12">
            <textarea name="descripcion" className="form-control" placeholder="Descripción" rows="2" required></textarea>
          </div>
          <div className="col-md-12">
            <input type="text" name="imagen" className="form-control" placeholder="URL de imagen (opcional)" />
          </div>
          <div className="col-md-12 text-end">
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
                  <td className="text-success fw-bold">${p.precio.toLocaleString('es-CL')}</td>
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
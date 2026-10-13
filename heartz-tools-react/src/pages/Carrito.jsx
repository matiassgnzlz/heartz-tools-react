// src/pages/Carrito.jsx
import React from 'react';

const Carrito = ({ carrito, onEliminarItem }) => {
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <div className="container py-3">
      <h2 className="mb-4 fw-bold text-dark"> Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <div className="alert alert-secondary text-center py-4 text-dark">
          Tu carrito está vacío. ¡Explora el catálogo y añade productos!
        </div>
      ) : (
        <div>
          <ul className="list-group mb-4 shadow-sm">
            {carrito.map((item) => (
              <li className="list-group-item d-flex justify-content-between align-items-center py-3 bg-white" key={item.id}>
                <div>
                  <h6 className="mb-0 fw-bold text-dark">{item.nombre}</h6>
                  <small className="text-muted">Cantidad: {item.cantidad}</small>
                </div>
                <div className="text-end">
                  <span className="fw-bold text-success d-block">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                  <button className="btn btn-sm btn-outline-danger mt-1" onClick={() => onEliminarItem(item.id)}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="card p-4 shadow-sm border border-secondary-subtle bg-white text-end">
            <h4 className="text-dark">Total a Pagar: <span className="text-success fw-bold">${total.toLocaleString('es-CL')}</span></h4>
            <button className="btn btn-success btn-lg mt-3 w-25 ms-auto fw-semibold" onClick={() => alert('¡Compra realizada con éxito!')}>
              Pagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
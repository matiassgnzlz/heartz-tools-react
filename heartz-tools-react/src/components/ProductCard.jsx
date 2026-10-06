import React from 'react';

function ProductCard({ producto, onAgregarAlCarrito }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        {/* Contenedor visual para la imagen del producto */}
        <div className="bg-light text-dark d-flex align-items-center justify-content-center p-4 border-bottom" style={{ height: '180px' }}>
          <i className="fas fa-guitar fa-3x text-secondary"></i>
        </div>
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold">{producto.nombre}</h5>
          <span className="badge bg-secondary mb-2 align-self-start">{producto.categoria}</span>
          <p className="card-text text-muted small">{producto.descripcion}</p>
          
          <div className="mt-auto">
            <p className="fw-bold fs-5 text-dark mb-3">${producto.precio.toLocaleString()}</p>
            <button 
              className="btn btn-dark w-100"
              onClick={() => onAgregarAlCarrito && onAgregarAlCarrito(producto)}
            >
              <i className="fas fa-shopping-cart me-2"></i> Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
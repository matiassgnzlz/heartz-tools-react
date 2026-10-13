// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ prod, onAgregarCarrito }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm border border-secondary-subtle position-relative bg-white">
        {prod.enOferta && <span className="badge bg-danger position-absolute m-2 z-1">¡En Oferta!</span>}
        
        {/* Cuerpo de la tarjeta sin imágenes ni cuadros */}
        <div className="card-body d-flex flex-column pt-4">
          <span className="badge bg-dark mb-2 align-self-start">{prod.categoria}</span>
          <h5 className="card-title fw-bold text-dark">{prod.nombre}</h5>
          <p className="card-text text-secondary small">{prod.descripcion}</p>
          <p className="fw-bold text-success fs-5 mt-auto">${prod.precio.toLocaleString('es-CL')}</p>
          <button 
            className="btn btn-dark w-100 mt-2 fw-semibold"
            onClick={() => onAgregarCarrito(prod)}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
import React, { useState } from 'react';
import { obtenerProductos } from '../data/productosData';
import ProductCard from '../components/ProductCard';

function Catalogo() {
  const [productos] = useState(obtenerProductos());

  const manejarAgregarCarrito = (producto) => {
    alert(`¡"${producto.nombre}" fue agregado al carrito con éxito!`);
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">NUESTRO CATÁLOGO</h2>
        <p className="text-muted">Explora los mejores instrumentos y equipos musicales</p>
      </div>

      <div className="row">
        {productos.map((prod) => (
          <ProductCard 
            key={prod.id} 
            producto={prod} 
            onAgregarAlCarrito={manejarAgregarCarrito} 
          />
        ))}
      </div>
    </div>
  );
}

export default Catalogo;
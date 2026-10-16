// src/pages/Catalogo.jsx
import ProductCard from '../components/ProductCard';

const Catalogo = ({ productos, onAgregarCarrito }) => {
  return (
    <div>
      <h1 className="mb-4 text-center fw-bold text-dark">Catálogo de Productos</h1>
      <div className="row">
        {productos.map((prod) => (
          <ProductCard key={prod.id} prod={prod} onAgregarCarrito={onAgregarCarrito} />
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
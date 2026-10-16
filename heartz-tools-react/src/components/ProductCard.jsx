// src/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import { formatearPrecio } from '../utils/precio';

const ProductCard = ({ prod, onAgregarCarrito }) => {
  return (
    <div className="col-12 col-sm-6 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm border border-secondary-subtle position-relative bg-white">
        {prod.enOferta && <span className="badge bg-danger position-absolute m-2 z-1">¡En Oferta!</span>}

        <Link to={`/producto/${prod.id}`} className="d-block p-3 border-bottom">
          <ProductImage src={prod.imagen} alt={prod.nombre} />
        </Link>

        <div className="card-body d-flex flex-column">
          <span className="badge bg-dark mb-2 align-self-start">{prod.categoria}</span>
          <h5 className="card-title fw-bold">
            <Link to={`/producto/${prod.id}`} className="text-dark text-decoration-none">
              {prod.nombre}
            </Link>
          </h5>
          <p className="card-text text-secondary small">{prod.descripcion}</p>
          <p className="fw-bold text-success fs-5 mt-auto">{formatearPrecio(prod.precio)}</p>
          <div className="d-grid gap-2">
            <Link to={`/producto/${prod.id}`} className="btn btn-outline-dark fw-semibold">
              Ver detalle
            </Link>
            <button className="btn btn-dark fw-semibold" onClick={() => onAgregarCarrito(prod)}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

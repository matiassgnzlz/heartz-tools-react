// src/pages/ProductoDetalle.jsx
import { Link, useParams, useNavigate } from 'react-router-dom';
import ProductImage from '../components/ProductImage';

const ProductoDetalle = ({ productos, onAgregarCarrito }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const prod = productos.find((p) => p.id === Number(id));

  if (!prod) {
    return (
      <div className="text-center py-5">
        <h2 className="fw-bold text-dark">Producto no encontrado</h2>
        <p className="text-muted">El producto que buscas no existe o fue eliminado.</p>
        <Link to="/" className="btn btn-dark">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Catálogo</Link></li>
          <li className="breadcrumb-item">{prod.categoria}</li>
          <li className="breadcrumb-item active" aria-current="page">{prod.nombre}</li>
        </ol>
      </nav>

      <div className="card shadow-sm border border-secondary-subtle bg-white p-3 p-md-4">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-6 position-relative">
            {prod.enOferta && <span className="badge bg-danger position-absolute m-2 z-1">¡En Oferta!</span>}
            <ProductImage src={prod.imagen} alt={prod.nombre} height={420} />
          </div>

          <div className="col-12 col-md-6 text-start">
            <span className="badge bg-dark mb-2">{prod.categoria}</span>
            <h1 className="fw-bold text-dark h2">{prod.nombre}</h1>
            <p className="text-secondary">{prod.descripcion}</p>
            <p className="fw-bold text-success display-6 my-4">${prod.precio.toLocaleString('es-CL')}</p>

            <div className="d-grid d-sm-flex gap-2">
              <button className="btn btn-dark btn-lg fw-semibold" onClick={() => onAgregarCarrito(prod)}>
                Añadir al carrito
              </button>
              <button className="btn btn-outline-dark btn-lg" onClick={() => navigate(-1)}>
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;

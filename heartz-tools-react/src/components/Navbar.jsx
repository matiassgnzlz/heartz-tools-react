// src/components/Navbar.jsx
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ totalCarrito }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <Link className="navbar-brand fw-bold text-light" to="/" style={{ letterSpacing: '0.5px' }}>
        Heartz Tools
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav align-items-lg-center">
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/" end>Catálogo</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/admin">Administración</NavLink>
          </li>
          <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
            <Link className="btn btn-outline-light position-relative" to="/carrito">
              Carrito
              {totalCarrito > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                  {totalCarrito}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

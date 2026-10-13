// src/components/Navbar.jsx
import React from 'react';

const Navbar = ({ totalCarrito, cambiarVista }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <a 
        className="navbar-brand fw-bold text-light" 
        href="#catalogo" 
        onClick={() => cambiarVista('catalogo')}
        style={{ letterSpacing: '0.5px' }}
      >
         Heartz Tools
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav align-items-center">
          <li className="nav-item">
            <button className="btn btn-link nav-link text-white text-decoration-none" onClick={() => cambiarVista('catalogo')}>
              Catálogo
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-link nav-link text-white text-decoration-none" onClick={() => cambiarVista('admin')}>
              Administración
            </button>
          </li>
          <li className="nav-item ms-3">
            <button className="btn btn-outline-light position-relative" onClick={() => cambiarVista('carrito')}>
               Carrito
              {totalCarrito > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                  {totalCarrito}
                </span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
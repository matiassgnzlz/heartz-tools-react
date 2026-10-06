import React from 'react';

function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <div className="container-fluid">
          {/* Logo con enlace al inicio */}
          <a className="navbar-brand fw-bold" href="#">
            HEARTZ TOOLS
          </a>

          {/* Botón hamburguesa para móviles */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Enlaces de navegación */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <a className="nav-link active" href="#">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Catálogo</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Categorías</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Nosotros</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contacto</a>
              </li>
              <li className="nav-item ms-lg-3">
                <a className="btn btn-outline-light btn-sm" href="#">
                  <i className="fas fa-shopping-cart"></i> Carrito
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
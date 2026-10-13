// src/App.jsx
import { useState } from 'react';
import { obtenerProductos, agregarProducto, eliminarProducto, actualizarProducto } from './data/productosData';

function App() {
  const [productos, setProductos] = useState(obtenerProductos());
  const [carrito, setCarrito] = useState([]);
  const [vista, setVista] = useState('catalogo'); // 'catalogo', 'carrito', 'admin'

  // Función para agregar al carrito
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // Función para eliminar del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  // Crear producto usando tu función CRUD
  const handleAgregarProducto = (e) => {
    e.preventDefault();
    const nuevo = {
      nombre: e.target.nombre.value,
      categoria: e.target.categoria.value,
      precio: Number(e.target.precio.value),
      enOferta: e.target.enOferta.checked,
      imagen: e.target.imagen.value || "assets/img/guitarra-negra.jpg",
      descripcion: e.target.descripcion.value
    };
    const actualizados = agregarProducto(nuevo);
    setProductos([...actualizados]);
    e.target.reset();
    alert('¡Producto agregado con éxito!');
  };

  // Eliminar producto usando tu función CRUD
  const handleEliminar = (id) => {
    const actualizados = eliminarProducto(id);
    setProductos([...actualizados]);
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Barra de Navegación con el nombre Heartz Tools */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
        <a className="navbar-brand fw-bold text-danger" href="#catalogo" onClick={() => setVista('catalogo')}>
           Heartz Tools
        </a>
        <div className="ms-auto">
          <button className="btn btn-link text-white text-decoration-none" onClick={() => setVista('catalogo')}>Catálogo</button>
          <button className="btn btn-link text-white text-decoration-none" onClick={() => setVista('admin')}>Administración</button>
          <button className="btn btn-outline-light ms-2" onClick={() => setVista('carrito')}>
              Carrito ({carrito.reduce((acc, item) => acc + item.cantidad, 0)})
          </button>
        </div>
      </nav>

      <main className="container py-5">
        {/* VISTA 1: CATÁLOGO */}
        {vista === 'catalogo' && (
          <div>
            <h1 className="mb-4 text-center fw-bold">Catálogo de Productos</h1>
            <div className="row">
              {productos.map((prod) => (
                <div className="col-md-3 mb-4" key={prod.id}>
                  <div className="card h-100 shadow-sm border-0">
                    {prod.enOferta && <span className="badge bg-danger position-absolute m-2">¡En Oferta!</span>}
                    <div style={{ height: '180px', backgroundColor: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="text-muted small">[Imagen: {prod.imagen}]</span>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <span className="badge bg-secondary mb-2 align-self-start">{prod.categoria}</span>
                      <h5 className="card-title fw-bold">{prod.nombre}</h5>
                      <p className="card-text text-muted small">{prod.descripcion}</p>
                      <p className="fw-bold text-success fs-5 mt-auto">${prod.precio.toLocaleString('es-CL')}</p>
                      <button 
                        className="btn btn-dark w-100 mt-2"
                        onClick={() => agregarAlCarrito(prod)}
                      >
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VISTA 2: CARRITO */}
        {vista === 'carrito' && (
          <div>
            <h2 className="mb-4 fw-bold">Carrito de Compras</h2>
            {carrito.length === 0 ? (
              <div className="alert alert-info text-center py-4">Tu carrito está vacío.</div>
            ) : (
              <div>
                <ul className="list-group mb-4 shadow-sm">
                  {carrito.map((item) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center py-3" key={item.id}>
                      <div>
                        <h6 className="mb-0 fw-bold">{item.nombre}</h6>
                        <small className="text-muted">Cantidad: {item.cantidad}</small>
                      </div>
                      <div className="text-end">
                        <span className="fw-bold text-success d-block">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                        <button className="btn btn-sm btn-outline-danger mt-1" onClick={() => eliminarDelCarrito(item.id)}>
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="card p-4 shadow-sm border-0 bg-white text-end">
                  <h4>Total: <span className="text-success fw-bold">${carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toLocaleString('es-CL')}</span></h4>
                  <button className="btn btn-success btn-lg mt-3 w-25 ms-auto" onClick={() => alert('¡Compra realizada con éxito!')}>
                    Pagar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VISTA 3: ADMINISTRACIÓN (CRUD) */}
        {vista === 'admin' && (
          <div>
            <h2 className="mb-4 fw-bold"> Panel de Administración</h2>
            
            {/* Formulario para agregar */}
            <div className="card p-4 shadow-sm border-0 mb-4">
              <h5 className="fw-bold mb-3">Agregar Nuevo Producto</h5>
              <form onSubmit={handleAgregarProducto} className="row g-3">
                <div className="col-md-4">
                  <input type="text" name="nombre" className="form-control" placeholder="Nombre del producto" required />
                </div>
                <div className="col-md-3">
                  <input type="text" name="categoria" className="form-control" placeholder="Categoría" required />
                </div>
                <div className="col-md-3">
                  <input type="number" name="precio" className="form-control" placeholder="Precio" required />
                </div>
                <div className="col-md-2 d-flex align-items-center">
                  <div className="form-check">
                    <input type="checkbox" name="enOferta" className="form-check-input" id="ofertaCheck" />
                    <label className="form-check-label" htmlFor="ofertaCheck">Oferta</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <textarea name="descripcion" className="form-control" placeholder="Descripción" rows="2" required></textarea>
                </div>
                <div className="col-md-12">
                  <input type="text" name="imagen" className="form-control" placeholder="Ruta de imagen (ej: assets/img/guitarra.jpg)" />
                </div>
                <div className="col-md-12 text-end">
                  <button type="submit" className="btn btn-dark">Guardar Producto</button>
                </div>
              </form>
            </div>

            {/* Tabla de Productos */}
            <div className="card p-4 shadow-sm border-0">
              <h5 className="fw-bold mb-3">Lista de Productos Registrados</h5>
              <div className="table-responsive">
                <table className="table table-striped align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.nombre}</td>
                        <td>{p.categoria}</td>
                        <td>${p.precio.toLocaleString('es-CL')}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(p.id)}>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
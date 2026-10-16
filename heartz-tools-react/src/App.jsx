// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { obtenerProductos, agregarProducto, eliminarProducto } from './data/productosData';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import Admin from './pages/Admin';
import ProductoDetalle from './pages/ProductoDetalle';
import { guardarCarrito, cargarCarrito } from './utils/persistencia';

function App() {
  const [productos, setProductos] = useState(obtenerProductos());
  const [carrito, setCarrito] = useState(cargarCarrito);

  // Cada vez que cambia el carrito se guarda, para no perderlo al recargar
  useEffect(() => {
    guardarCarrito(carrito);
  }, [carrito]);

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

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  // Recibe el producto ya validado desde el formulario de Admin
  const handleAgregarProducto = (nuevo) => {
    const actualizados = agregarProducto(nuevo);
    setProductos([...actualizados]);
  };

  const handleEliminarProducto = (id) => {
    const actualizados = eliminarProducto(id);
    setProductos([...actualizados]);
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Barra de Navegación */}
      <Navbar 
        totalCarrito={carrito.reduce((acc, item) => acc + item.cantidad, 0)} 
      />

      {/* Contenido Principal */}
      <main className="container py-5 flex-grow-1">
        <Routes>
          <Route path="/" element={<Catalogo productos={productos} onAgregarCarrito={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<ProductoDetalle productos={productos} onAgregarCarrito={agregarAlCarrito} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} onEliminarItem={eliminarDelCarrito} />} />
          <Route
            path="/admin"
            element={
              <Admin
                productos={productos}
                onAgregarProducto={handleAgregarProducto}
                onEliminarProducto={handleEliminarProducto}
              />
            }
          />
        </Routes>
      </main>

      {/* Pie de Página */}
      <Footer />
    </div>
  );
}

export default App;
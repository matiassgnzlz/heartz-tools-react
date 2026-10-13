// src/App.jsx
import { useState } from 'react';
import { obtenerProductos, agregarProducto, eliminarProducto } from './data/productosData';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import Admin from './pages/Admin';

function App() {
  const [productos, setProductos] = useState(obtenerProductos());
  const [carrito, setCarrito] = useState([]);
  const [vista, setVista] = useState('catalogo'); // 'catalogo', 'carrito', 'admin'

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

  const handleEliminarProducto = (id) => {
    const actualizados = eliminarProducto(id);
    setProductos([...actualizados]);
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Barra de Navegación */}
      <Navbar 
        totalCarrito={carrito.reduce((acc, item) => acc + item.cantidad, 0)} 
        cambiarVista={setVista} 
      />

      {/* Contenido Principal */}
      <main className="container py-5 flex-grow-1">
        {vista === 'catalogo' && (
          <Catalogo productos={productos} onAgregarCarrito={agregarAlCarrito} />
        )}

        {vista === 'carrito' && (
          <Carrito carrito={carrito} onEliminarItem={eliminarDelCarrito} />
        )}

        {vista === 'admin' && (
          <Admin 
            productos={productos} 
            onAgregarProducto={handleAgregarProducto} 
            onEliminarProducto={handleEliminarProducto} 
          />
        )}
      </main>

      {/* Pie de Página */}
      <Footer />
    </div>
  );
}

export default App;
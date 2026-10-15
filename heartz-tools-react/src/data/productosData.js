// src/data/productosData.js
import imgGuitarra from '../assets/productos/guitarra.png';
import imgBateria from '../assets/productos/bateria.jpg';
import imgAuriculares from '../assets/productos/auriculares.png';
import imgMicrofono from '../assets/productos/microfono.png';

export let productosIniciales = [
  {
    id: 1,
    nombre: "Guitarra Eléctrica Negra",
    categoria: "Guitarras",
    precio: 180000,
    enOferta: true,
    imagen: imgGuitarra,
    descripcion: "Guitarra eléctrica de alta gama con acabado negro mate y pastillas humbucker."
  },
  {
    id: 2,
    nombre: "Batería Acústica Profesional",
    categoria: "Baterías",
    precio: 450000,
    enOferta: false,
    imagen: imgBateria,
    descripcion: "Set completo de batería acústica de 5 piezas con herrajes reforzados."
  },
  {
    id: 3,
    nombre: "Auriculares de Estudio",
    categoria: "Accesorios",
    precio: 35000,
    enOferta: true,
    imagen: imgAuriculares,
    descripcion: "Auriculares circumaurales cerrados ideales para monitoreo y mezcla."
  },
  {
    id: 4,
    nombre: "Micrófono Condensador",
    categoria: "Accesorios",
    precio: 65000,
    enOferta: false,
    imagen: imgMicrofono,
    descripcion: "Micrófono de estudio profesional para voces e instrumentos."
  }
];

// Funciones CRUD simuladas para cumplir con la rúbrica

// Leer todos los productos
export const obtenerProductos = () => {
  return productosIniciales;
};

// Crear un nuevo producto
export const agregarProducto = (nuevoProducto) => {
  const id = productosIniciales.length > 0 ? productosIniciales[productosIniciales.length - 1].id + 1 : 1;
  const productoConId = { id, ...nuevoProducto };
  productosIniciales.push(productoConId);
  return productosIniciales;
};

// Eliminar un producto por ID
export const eliminarProducto = (id) => {
  productosIniciales = productosIniciales.filter(p => p.id !== id);
  return productosIniciales;
};

// Actualizar un producto existente
export const actualizarProducto = (id, datosActualizados) => {
  productosIniciales = productosIniciales.map(p => 
    p.id === id ? { ...p, ...datosActualizados } : p
  );
  return productosIniciales;
};

// Buscar un producto por ID (para la página de detalle)
export const obtenerProductoPorId = (id) => {
  return productosIniciales.find((p) => p.id === Number(id));
};

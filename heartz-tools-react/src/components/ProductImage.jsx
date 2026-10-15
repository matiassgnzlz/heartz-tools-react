// src/components/ProductImage.jsx
import { useState } from 'react';

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='#e9ecef'/><text x='50%' y='50%' fill='#6c757d' font-family='sans-serif' font-size='20' text-anchor='middle' dominant-baseline='middle'>Sin imagen</text></svg>`
  );

// Imagen con alto fijo y "contain" para que todas las fotos se vean completas.
const ProductImage = ({ src, alt, height = 220, className = '' }) => {
  const [fallo, setFallo] = useState(false);
  return (
    <div className={`bg-white d-flex align-items-center justify-content-center ${className}`} style={{ height }}>
      <img
        src={fallo || !src ? PLACEHOLDER : src}
        alt={alt}
        onError={() => setFallo(true)}
        className="mw-100 mh-100"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
};

export default ProductImage;

# Heartz Tools (React + Bootstrap)

Tienda online de instrumentos hecha con **React**, **React Router** y **Bootstrap**.
Pruebas unitarias con **Jasmine** y **Karma** (Chrome headless), compiladas con webpack y Babel.

## Instalar y ejecutar

```bash
npm install
npm run dev        # servidor de desarrollo (Vite)
```

## Pruebas unitarias

```bash
npm test           # ejecuta todas las pruebas una vez y genera cobertura
npm run test:watch # vuelve a ejecutar al detectar cambios
```

Karma necesita un navegador Chromium (Chrome, Brave o Edge). Si no lo encuentra,
define la variable `CHROME_BIN` con la ruta del ejecutable.

- Las pruebas están junto al código que prueban (`*.spec.js` / `*.spec.jsx`).
- Los ayudantes para montar componentes están en `src/test/utils.jsx`.
- El informe de cobertura se genera en `coverage/index.html`.

## Estructura

```
src/
  components/  Navbar, ProductCard, ProductImage, Footer
  pages/       Catalogo, ProductoDetalle, Carrito, Admin
  data/        productosData.js (CRUD de productos)
  utils/       precio.js, validarProducto.js, persistencia.js
  test/        index.js (entrada de Karma) y utils.jsx
```

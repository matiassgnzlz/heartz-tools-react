// Carga automáticamente todos los archivos *.spec.jsx de src/
const context = require.context('../', true, /\.spec\.jsx?$/);
context.keys().forEach(context);

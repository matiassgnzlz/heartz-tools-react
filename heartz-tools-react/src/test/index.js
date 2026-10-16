// Carga automáticamente todos los archivos *.spec.js / *.spec.jsx de src/
// (el proyecto es ESM por "type": "module", por eso se usa import.meta.webpackContext
//  en vez de require.context)
const context = import.meta.webpackContext('../', { recursive: true, regExp: /\.spec\.jsx?$/ });
context.keys().forEach(context);

// karma.conf.cjs
// Karma ejecuta las pruebas dentro de un navegador real (Chrome headless),
// Jasmine es el framework que define describe/it/expect/spies,
// y webpack + Babel compilan el JSX antes de correrlo.
process.env.NODE_ENV = 'test';

const fs = require('fs');

// Karma necesita un navegador basado en Chromium. Orden de búsqueda:
//   1) la variable de entorno CHROME_BIN (si la defines tú)
//   2) el Chrome que descarga "puppeteer" (opcional: npm install -D puppeteer)
//   3) Chrome, Brave o Edge instalados en las rutas habituales
if (!process.env.CHROME_BIN) {
  try {
    const ruta = require('puppeteer').executablePath();
    if (ruta && fs.existsSync(ruta)) process.env.CHROME_BIN = ruta;
  } catch {
    // puppeteer no está instalado: se sigue con los navegadores del sistema
  }
}

if (!process.env.CHROME_BIN) {
  const local = process.env.LOCALAPPDATA || '';
  const candidatos = [
    // Windows: Chrome
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    local + '\\Google\\Chrome\\Application\\chrome.exe',
    // Windows: Brave
    'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    'C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    local + '\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    // Windows: Edge (viene instalado con Windows 10/11)
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    // Linux
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/brave-browser',
    // macOS
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  ];
  const encontrado = candidatos.find((ruta) => fs.existsSync(ruta));
  if (encontrado) process.env.CHROME_BIN = encontrado;
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],

    // Un único punto de entrada que carga todos los *.spec.js / *.spec.jsx
    files: [{ pattern: 'src/test/index.js', watched: false }],
    preprocessors: { 'src/test/index.js': ['webpack'] },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          // El proyecto es ESM ("type": "module"): permite importar sin escribir la extensión
          { test: /\.m?jsx?$/, resolve: { fullySpecified: false } },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                // Instrumenta el código fuente (no los specs) para medir cobertura
                plugins: [
                  ['istanbul', { exclude: ['**/*.spec.js', '**/*.spec.jsx', 'src/test/**'] }],
                ],
              },
            },
          },
          { test: /\.(png|jpe?g|svg|gif)$/i, type: 'asset/inline' },
        ],
      },
    },

    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'lcovonly' }],
    },

    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: { base: 'ChromeHeadless', flags: ['--no-sandbox'] },
    },
    singleRun: true,
  });
};

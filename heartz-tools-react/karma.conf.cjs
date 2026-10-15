// karma.conf.cjs
// Karma ejecuta las pruebas dentro de un navegador real (Chrome headless),
// Jasmine es el framework que define describe/it/expect/spies,
// y webpack + Babel compilan el JSX antes de correrlo.
process.env.NODE_ENV = 'test';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],

    // Un único punto de entrada que carga todos los *.spec.jsx
    files: [{ pattern: 'src/tests/index.js', watched: false }],
    preprocessors: { 'src/tests/index.js': ['webpack'] },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
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
                  ['istanbul', { exclude: ['**/*.spec.jsx', 'src/tests/**'] }],
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

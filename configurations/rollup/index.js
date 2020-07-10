const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require('rollup-plugin-terser');

module.exports = {
  input: './lib/index.js',
  output: {
    file: 'lib/navigator.min.js',
    format: 'umd',
    name: 'navigator',
    sourcemap: true,
  },
  plugins: [
    resolve({
      mainFields: ['module', 'main'],
    }),
    commonjs(),
    terser(),
  ],
};

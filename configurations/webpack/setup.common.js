const path = require('path');
const app = require('../../package.json');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const appSource = 'demo';

module.exports = {
  entry: {
    app: ['core-js/stable', 'react-hot-loader/patch', `./${appSource}/application.tsx`],
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json'],
    modules: [path.resolve(__dirname, '../../', appSource), 'node_modules'],
    alias: {
      '@cookbook/dot-notation': path.resolve(__dirname, '../../src'),
    },
  },
  target: 'web',
  optimization: {
    emitOnErrors: false,
    removeAvailableModules: false,
    runtimeChunk: true,
    minimizer: [
      new TerserJSPlugin({
        parallel: true,
        terserOptions: {
          warnings: false,
          compress: {
            toplevel: true,
          },
          mangle: {
            toplevel: true,
          },
          output: {
            beautify: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: `./demo/assets/favicon/*`, to: '[name][ext]' },
        { from: `./demo/assets/css/*`, to: 'css/[name][ext]' },
      ],
      options: { concurrency: 100 },
    }),
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      title: app.name,
      inject: true,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: false,
      },
    }),
  ],
};

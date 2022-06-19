const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const rules = require('./rules');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '3300';

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../../public'),
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk.js',
  },
  module: {
    rules,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../../public'),
      watch: true,
    },
    compress: false,
    liveReload: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    port: PORT,
    host: HOST,
  },
  performance: {
    hints: false,
    maxAssetSize: 512000,
    maxEntrypointSize: 8500000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    },
  },
  optimization: {
    nodeEnv: 'development',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"development"' },
    }),
    new BundleAnalyzerPlugin({
      analyzerHost: HOST,
      openAnalyzer: process.env.NODE_ENV === 'development',
    }),
  ],
};

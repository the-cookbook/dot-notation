const webpack = require('@cypress/webpack-preprocessor');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const webpackOptions = require('../../webpack.config');

/**
 * Plugin's blacklist.
 * All plugins instance placed bellow will be removed
 * from Webpack config
 * @type {Class[]}
 */
const pluginsToBeRemoved = [BundleAnalyzerPlugin];

webpackOptions.plugins = webpackOptions.plugins.filter(loadedPlugin => !pluginsToBeRemoved.some((plugin) => (loadedPlugin instanceof plugin)));


module.exports = (on, config) => {
  const options = {
    // send in the options from your webpack.config.js, so it works the same
    // as your app's code
    webpackOptions,
    watchOptions: {},
  };

  on('file:preprocessor', webpack(options));
};

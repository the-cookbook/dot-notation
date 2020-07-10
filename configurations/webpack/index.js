const merge = require('webpack-merge');

module.exports = merge([require('./setup.dev'), require('./setup.common')]);

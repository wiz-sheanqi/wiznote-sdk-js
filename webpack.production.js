const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

console.log('webpack.production.js');

module.exports = merge(common, {
  mode: 'production',
  // optimization: {
  //   runtimeChunk: 'single',
  //   namedModules: true,
  //   namedChunks: true
  // },
});
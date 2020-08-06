const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

console.log('webpack.dev.js');


module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',  
});

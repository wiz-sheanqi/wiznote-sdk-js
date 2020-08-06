const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


console.log('webpack.common.js');

let libsDist = 'dist';
module.exports = {
  entry: {
    wizNoteSdk: './src/index.js',
  },
  plugins: [
    new CleanWebpackPlugin([libsDist], {
      root: path.resolve(__dirname, './'),
      verbose: true,
      dry: false
    }),    
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, `./${libsDist}`),
    libraryTarget: 'umd',
    library: 'lib',
    globalObject: "this"
  }
};
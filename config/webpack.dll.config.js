/*eslint-disable*/
var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

const vendors = [
  'react',
  'react-dom',
  'prop-types',
  'dva',
  'dva-loading',
  'classnames',
];

var config = {
  entry: {
    vendors: vendors,
  },

  output: {
    path: path.resolve(__dirname, '../vendor'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../vendor', 'manifest.json'),
      name: '[name]_library',
      context: __dirname,
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      compress: { warnings: false }
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  ]
}

module.exports = config;

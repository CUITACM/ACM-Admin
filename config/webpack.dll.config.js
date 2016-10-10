/*eslint-disable*/
var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

require('shelljs/global');
rm('-rf', 'dist');
mkdir('dist');

module.exports = {
  entry: {
    vendor: [
      'react', 'react-dom', 'isomorphic-fetch', 'babel-polyfill',
      'redux', 'react-redux', 'react-router', 'react-router-redux',
      'redux-thunk', 'redux-api-middleware'
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '',
    filename: '[name].bundle.js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]_library_[hash:7]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_library_[hash:7]',
      path: path.join(__dirname, '../dist', '[name]_manifest.json'),
      context: path.join(__dirname, '../')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
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
    })
  ]
};
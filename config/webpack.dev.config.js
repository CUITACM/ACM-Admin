/*eslint-disable*/
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var baseConfig = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

Object.keys(baseConfig.entry).forEach(function (name) {
  baseConfig.entry[name].unshift(
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:' + baseConfig.devPort,
    'webpack/hot/only-dev-server'
  );
});

module.exports = webpackMerge(baseConfig, {
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
      filename: 'index.html'
    })
  ]
});
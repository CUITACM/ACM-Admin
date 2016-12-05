/*eslint-disable*/
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var baseConfig = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

process.env.NODE_ENV = 'development';

Object.keys(baseConfig.entry).forEach(function (name) {
  baseConfig.entry[name].unshift(
    'webpack-dev-server/client?http://localhost:' + baseConfig.devPort,
    'webpack/hot/dev-server'
  );
});

module.exports = webpackMerge(baseConfig, {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'postcss', 'less']
      }
    ]
  },
  plugins: [
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
      filename: 'index.html'
    })
  ]
});
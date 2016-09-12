/*eslint-disable*/
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var baseConfig = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = webpackMerge(baseConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      compress: { warnings: false }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
});
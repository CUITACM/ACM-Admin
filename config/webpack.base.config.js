/*eslint-disable*/
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    app: ['./src/main.jsx']
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less', 'postcss']
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=10000&name=[path][name].[ext]'
      }
    ]
  },

  devPort: 3001,

  postcss: function () {
    return [autoprefixer({ browsers: ['last 10 versions'] })];
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  }
};

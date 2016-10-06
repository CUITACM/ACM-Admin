/*eslint-disable*/
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');

new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  hot: true,
  inline: true,
  host: '0.0.0.0',
  historyApiFallback: true,
  stats: {
    colors: true,
    chunks: false,
    children: false,
    errorDetails: true,
    assetsSort: 'name'
  }
}).listen(config.devPort, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log('==> 🌎  Listening at http://localhost:' + config.devPort);
});
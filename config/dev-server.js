var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  hot: true,
  inline: true,
  host: '0.0.0.0',
  historyApiFallback: false,
  stats: {
    colors: true,
    chunks: false,
    errorDetails: true
  }
}).listen(config.devPort, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http://localhost:' + config.devPort);
});
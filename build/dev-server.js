const config        = require('./config');
const webpackConfig = require('./webpack.dev.conf');
const webpack       = require('webpack');
const express       = require('express');

const compiler      = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  logLevel: 'warn'
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false
});

const app = express();

app.use(require('connect-history-api-fallback')());
app.use(devMiddleware);
app.use(hotMiddleware);

app.use('/static/', express.static('./static'));

const port = config.dev.port;

app.listen(port, error => {
  if (error) {
    console.log(error);
    return;
  }
});

const config         = require('./config');
const webpackConfig  = require('./webpack.prod.conf');
const webpack        = require('webpack');
const rimraf         = require('rimraf');

rimraf(config.build.assetsRoot, error => {
  if (error) throw error;

  const compiler = webpack(webpackConfig);

  compiler.run((error, stats) => {
    if (error) throw error;

    console.log(stats.toString({
      colors: true,
      chunks: false,
      chunkModules: false,
      children: false,
      modules: false
    }));
  });
});

const config               = require('./config');
const utils                = require('./utils');
const webpackBaseConfig    = require('./webpack.base.conf');
const webpack              = require('webpack');
const webpackMerge         = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');

Object.keys(webpackBaseConfig.entry).forEach(name => {
  webpackBaseConfig.entry[name] = ['./build/dev-client'].concat(webpackBaseConfig.entry[name])
});

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  output: {
    publicPath: config.dev.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: utils.styleLoaders(config.dev.env)
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://localhost:${config.dev.port}`]
      },
      clearConsole: false
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      favicon: 'favicon.ico',
      inject: true,
      templateParameters: {
        BASE_URL: utils.assetsPath('')
      }
    })
  ]
});

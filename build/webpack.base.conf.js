const config          = require('./config');
const utils           = require('./utils');
const path            = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack         = require('webpack');

module.exports = {
  entry: {
    app: ['./src/main.js']
  },
  output: {
    path: config.build.assetsRoot
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'config': path.resolve(__dirname, '../config'),
      'images': path.resolve(__dirname, '../src/assets/images'),
      'styles': path.resolve(__dirname, '../src/assets/styles')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}

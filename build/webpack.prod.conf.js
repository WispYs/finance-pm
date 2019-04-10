const config                  = require('./config');
const utils                   = require('./utils');
const path                    = require('path');
const webpackBaseConfig       = require('./webpack.base.conf');
const webpack                 = require('webpack');
const webpackMerge            = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const UglifyJsPlugin          = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const CopyWebpackPlugin       = require('copy-webpack-plugin');
const ProgressBarPlugin       = require('progress-bar-webpack-plugin');

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  output: {
    publicPath: config.build.assetsPublicPath,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js'),
    jsonpFunction: 'finance__webpackJsonp'
  },
  devtool: false,
  module: {
    rules: utils.styleLoaders(config.build.env)
  },
  plugins: [
    new ProgressBarPlugin(),

    // extracts css into separate files
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash].css')
    }),

    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'src/index.html',
      favicon: 'favicon.ico',
      inject: true,
      chunksSortMode: 'dependency',
      templateParameters: {
        BASE_URL: utils.assetsPath(''),
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        elementUI: {
          name: 'element-ui',
          test: /[\\/]node_modules[\\/]element-ui[\\/]/
        }
      }
    },
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        cache: true,
        parallel: true,
        extractComments: false,
        uglifyOptions: {
          compress: {
            unused: true,
            warnings: false,
            drop_debugger: true,
            drop_console: true
          },
          output: {
            comments: false
          }
        }
      }),
      // minimize css and optimize duplicated css
      new OptimizeCSSAssetsPlugin()
    ]
  }
});

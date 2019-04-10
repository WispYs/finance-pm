const config               = require('./config');
const path                 = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.assetsPath = _path => {
  const assetsSubDirectory = config.build.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

exports.styleLoaders = env => {
  if (env === config.dev.env) {
    return [
      { test: /\.css$/,  use: ['style-loader', 'css-loader', 'postcss-loader']},
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']},
      { test: /\.vue$/,  use: ['vue-loader']}
    ];
  }
  else {
    return [
      { test: /\.css$/,  use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']},
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']},
      { test: /\.vue$/,  use: ['vue-loader']}
    ];
  }
};

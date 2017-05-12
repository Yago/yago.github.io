/* globals require, module, __dirname */

const webpack = require('webpack');
const path = require('path');
const config = require('./gulp_config.json');

module.exports = {
  entry: {
    app: `./${config.assets}js/index.js`,
  },
  output: {
    path: path.join(__dirname, `./${config.build}js`),
    filename: '[name].bundle.js',
  },
  externals: {
    'jquery': 'jQuery',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-es2015-spread', 'transform-object-rest-spread'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(`./${config.assets}js`),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: 2,
      filename: 'vendors.bundle.js',
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ]
};

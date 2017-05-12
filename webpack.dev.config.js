/* globals require, module, __dirname */

const webpack = require('webpack');
const path = require('path');
const config = require('./gulp_config.json');

module.exports = {
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      `./${config.assets}js/index.js`,
    ]
  },
  output: {
    path: path.join(__dirname, `./${config.app.basedir}/${config.build}js`),
    filename: '[name].bundle.js',
  },
  externals: {
    'jquery': 'jQuery',
  },
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'babel-loader?presets[]=es2015,plugins[]=transform-object-rest-spread,plugins[]=transform-es2015-spread',
          'webpack-module-hot-accept',
        ]
      },
      {
        test: /\.json$/,
        loader: 'json',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
};

path = require('path');
precss = require('precss');
ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname + '/app',
  entry: {
    javascript: './index',
    html: './index.html'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist/'),
    publicPath: '/dist/'
  },
  devServer: {
      contentBase: 'dist'
  },
  module: {
      loaders: [
        { test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader?modules!postcss-loader'},
        { test: /\.html$/, loader: 'file?name=[name].[ext]'},
        { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot','babel-loader']}
      ]
  },
  postcss: function () {
      return [precss];
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
  ]
}
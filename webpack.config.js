var webpack = require('webpack');
var path = require('path');
var readFileSync = require('fs').readFileSync;
var libraryName = JSON.parse(readFileSync(__dirname + '/package.json')).name;


module.exports = function(options) {
  var plugins = [], outputFile;

  if (options === 'build') {
    plugins = plugins.concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
          warnings: false,
          'screw_ie8': true
        },
        output: {
          comments: false
        },
        sourceMap: false
      }),
      new webpack.optimize.OccurrenceOrderPlugin()
    ]);
    outputFile = libraryName + '.min.js';
  } else {
    outputFile = libraryName + '.js';
  }

  return {
    entry: __dirname + '/src/index.js',
    devtool: 'source-map',
    output: {
      path: __dirname + '/lib',
      filename: outputFile,
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: {
      rules: [
        {
          test: /(\.jsx|\.js)$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /(\.jsx|\.js)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.js']
    },
    plugins: plugins
  };
}

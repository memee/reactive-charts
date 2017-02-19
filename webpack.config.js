var webpack = require('webpack');
var path = require('path');
var readFileSync = require('fs').readFileSync;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var libraryName = JSON.parse(readFileSync(__dirname + '/package.json')).name;


module.exports = function(options) {
  var plugins = [], outputFile, entry, output;
  var libSource = __dirname + '/src/index.js';

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
      })
    ]);

    entry = libSource;
    outputFile = libraryName + '.min.js';
    output = {
      path: __dirname + '/lib',
      filename: outputFile,
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true
    };

  } else {

    plugins = plugins.concat([

      new HtmlWebpackPlugin({
        template: path.join(__dirname, '/examples/index.html'),
        filename: 'index.html',
        inject: 'body',
        chunks: []
      }),

      // TODO: remember to provide offline build of examples (here's dynamic)
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '/examples/single.html'),
        filename: 'multibar-line/index.html',
        chunks: ['reactiveCharts', 'multibarLine']
      })
    ]);

    entry = {
      'reactiveCharts': libSource,
      // examples
      'multibarLine': path.join(__dirname, '/examples/multibar-line/index.js')
    };
    outputFile = libraryName + '.js';
    output = {
      filename: '[name].js',
      path: path.join(__dirname, '/build/'),
      library: ['[name]'],
      libraryTarget: 'var'
    };
  }

  return {
    devServer: {
      contentBase: [
        path.join(__dirname, 'examples'),
        path.join(__dirname, 'node_modules/d3/build')
      ],
      compress: true,
      port: 8080
    },
    devtool: 'source-map',
    entry: entry,
    externals: {
      'd3': 'd3'
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
    output: output,
    plugins: plugins,
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.js']
    }
  };
};

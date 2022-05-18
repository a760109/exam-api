let webpack = require('webpack');
let path = require('path');
let fs = require('fs');

var externals = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    externals[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: {
    bundle: './server.js',
    'bundle.min': './server.js',
  },
  target: 'node',
  node: {
    __dirname: true,
    __filename: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  externals,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.mjs$/,
        type: 'javascript/auto',
      },
    ],
  },
  mode: 'production',
};

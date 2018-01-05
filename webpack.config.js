const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackStrip = require('strip-loader');
const path = require('path');

const config = {
  entry: './app/javascripts/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './app/index.html', to: 'index.html' },
      { from: './app/javascripts/web3.min.js', to: 'javascripts/web3.min.js' },
      { from: './app/stylesheets/app.css', to: 'stylesheets/app.css' }
    ])
  ]
};

module.exports = config;

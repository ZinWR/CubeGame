const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  /* Environment Variables
  Set cross-env NODE_ENV=production + command
  Set cross-env NODE_ENV=development + command
  */
  mode: process.env.NODE_ENV, // default to production
  // concurrently run different scripts together
  entry: './public/main.js', // where to begin creating dependency graph
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      /* For REACT
      npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react 
      */
      {
        test: /\.jsx?/, // ? will pick up jsx or js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // babel-loader allows webpack to bundel babel presets and plugins
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      /* For STYLE css/sass
      npm install -D sass-loader sass webpack --save-dev style-loader css-loader 
      */
      {
        test: /\.s?css/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'], // read from right to left
        // css-loader requires for css with imported URL
      },
    ],
  },
  /* Webpack Dev Server */
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/public/index.html'), // generate HTML file
    }),
  ],
  /* Versions that work
    "webpack": "^5.64.1",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.5.0",
    "webpack-hot-middleware": "^2.24.3" */
  devServer: {
    host: 'localhost',
    port: 8080,
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/',
    },
    hot: true, // reload without a refresh
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },

    /* Proxy */
    proxy: {
      '/leaderboard': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

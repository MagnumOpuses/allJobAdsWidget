const path = require('path');
const Dotenv = require('dotenv-webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = 
{
  entry: './src/index.js',
  output: {
    filename: './script/afPbWidget.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        title: 'Jobtech widget',
        MyPageHeader: 'Jobtech widget',
        template: './src/index.html',
        filename: 'index.html' //relative to root of the application
    }),
    new Dotenv()
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
      }
    ]
  }
};

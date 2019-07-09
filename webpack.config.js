const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = 
{
  entry: './src/index.js',
  output: {
    filename: 'script/AfPbWidget.js',
    path: path.resolve(__dirname, 'public')
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        title: 'Jobtech widget',
        MyPageHeader: 'Jobtech widget',
        template: './src/index.html',
        filename: 'index.html' //relative to root of the application
    }),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: 'css/AfPbWidget.css',
      chunkFilename: 'css/AfPbWidget.css',
    }),
  ],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /.(jpg|jpeg|png|svg)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                useRelativePath: true,
                outputPath: '/images/'
            }
        }      
      },
    ]
  }
};

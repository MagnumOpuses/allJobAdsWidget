const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'afPbWidget.js',
      path: path.resolve(__dirname, 'public/script')
    },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};

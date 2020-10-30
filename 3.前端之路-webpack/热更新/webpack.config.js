let path = require('path') //这个模块是node的自有模块，直接引用即可，它是用来解析路径的
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'index.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, 'src')
      }
    ]
  }
};
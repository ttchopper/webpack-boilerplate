const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer')({ grid: true, browsers: ['>1%'] });

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.min.css"
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new OptimizeCssAssetsPlugin()
  ],
  devServer: {
    watchContentBase: true,
    hot: true,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : 'style-loader' },
          { loader: 'css-loader' },
          { loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer
              ]
            }
          },
          { loader: "sass-loader" },
        ]
      }
    ]
  }
};
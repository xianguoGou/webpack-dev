const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  mode: "development",
  module: {
    rules: [
      { test: /.js$/, use: "babel-loader" },
      { test: /.css$/, use: ["style-loader", "css-loader"] },
      { test: /.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      {
        test: /.(png|gif|jpg|jpeg|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240, // 如果图片小于10k，则自动转换成base64格式
            },
          },
        ],
      },
      { test: /.(woff|woff2|eot|ttf)$/, use: "file-loader" },
    ],
  },
  devServer: {
    static: './dist',
    hot: true
  }
};
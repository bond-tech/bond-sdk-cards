var webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "bond-sdk-cards": [
      path.resolve(__dirname, "./src/show.js"),
      path.resolve(__dirname, "./src/collect.js"),
      path.resolve(__dirname, "./src/bond-sdk-cards.js"),
    ],
    index: path.resolve(__dirname, "./src/sample-card-show.js"),
    multiple: path.resolve(__dirname, "./src/sample-card-show-multiple.js"),
    pin: path.resolve(__dirname, "./src/sample-pin-setting.js"),
    copy: path.resolve(__dirname, "./src/sample-card-copy.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    publicPath: "./",
    library: "BondCards",
    libraryTarget: "umd",
    globalObject: "this",
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "development",
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  plugins: [
    new CleanWebpackPlugin(),
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/sample_card_show.html"),
      inject: true,
      chunks: ["bond-sdk-cards", "index"],
      filename: "index.html", // output file
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/sample_card_show_multiple.html"),
      inject: true,
      chunks: ["bond-sdk-cards", "multiple"],
      filename: "sample_card_show_multiple.html", // output file
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/sample_pin_setting.html"),
      inject: true,
      chunks: ["bond-sdk-cards", "pin"],
      filename: "sample_pin_setting.html", // output file
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/sample_card_copy.html"),
      inject: true,
      chunks: ["bond-sdk-cards", "copy"],
      filename: "sample_card_copy.html", // output file
    }),
  ],
};

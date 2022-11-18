const path = require("path")
const HtmlWebpackPlugins = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugins({
      title: "Caching",
    }),
  ],
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/i,
  //       use: ["style-loader", "css-loader"],
  //     },
  //     {
  //       test: /\.(png|svg|jpg|jpeg|gif)$/i,
  //       type: "asset/resource",
  //     },
  //     {
  //       test: /\.(woff|woff2|eot|ttf|otf)$/i,
  //       type: "asset/resource",
  //     },
  //     {
  //       test: /\.(csv|tsv)$/i,
  //       use: ["csv-loader"],
  //     },
  //     {
  //       test: /\.xml$/i,
  //       use: ["xml-loader"],
  //     },
  //     {
  //       test: /\.toml$/i,
  //       type: "json",
  //       parser: {
  //         parse: toml.parse,
  //       },
  //     },
  //     {
  //       test: /\.yaml$/i,
  //       type: "json",
  //       parser: {
  //         parse: yaml.parse,
  //       },
  //     },
  //     {
  //       test: /\.json5$/i,
  //       type: "json",
  //       parser: {
  //         parse: json5.parse,
  //       },
  //     },
  //   ],
  // },
  devServer: {
    static: "./dist",
    hot: true,
  },
  optimization: {
    usedExports: true,
  },
}

const path = require("path")
const HtmlWebpackPlugins = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  entry: {
    index: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugins({
      title: '管理输出'
    })
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
}

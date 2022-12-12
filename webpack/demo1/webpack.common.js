const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const ASSET_PATH = process.env.ASSET_PATH || "/"

module.exports = {
  entry: {
    app: "./src/index.ts",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Production",
    }),
    // 这可以帮助我们在代码中安全地使用环境变量
    new webpack.DefinePlugin({
      "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH),
    }),
  ],
  devtool: "inline-source-map",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
}

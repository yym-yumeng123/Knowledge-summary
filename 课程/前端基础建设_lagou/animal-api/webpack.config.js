const path = require("path");

module.exports = {
  mode: "development",
  entry: "./index.js",

  output: {
    path: path.resolve(__dirname, "lib"),

    filename: "animal-api.js",

    library: "AnimalApi",

    libraryTarget: "var",
  },
};

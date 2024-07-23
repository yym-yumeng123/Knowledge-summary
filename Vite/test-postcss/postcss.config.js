const postcssPresetEnv = require('postcss-preset-env')
module.exports = {
  plugins: [
    // 预设环境
    postcssPresetEnv({
      browsers: 'last 2 versions'
    })
  ]
}
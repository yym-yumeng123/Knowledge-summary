1. 安装

```
npm install postcss-cli postcss -D
```

2. 创建 index.css

3. 执行

```
# postcss-cli 使用
npx postcss index.css -o result.css
```

4. 创建 postcss.config.js

```js
const postcssPresetEnv = require('postcss-preset-env')
module.exports = {
  plugins: [
    // 预设环境
    postcssPresetEnv({
      browsers: 'last 2 versions'
    })
  ]
}
```
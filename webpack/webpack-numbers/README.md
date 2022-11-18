1. 更新到最新版本
2. 将 Node.js 更新到最新版本

3. loader

将 loader 应用于最少数量的必要模块

```js
const path = require("path")

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
      },
    ],
  },
}
```

4. 引导

   - 每个额外的 loader/plugin 都有其启动时间。尽量少地使用工具。

### require.context

通过 `require.context()` 函数来创建自己的 context

给这个函数传入三个参数：一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式

```js
require.context(
  directory,
  (useSubdirectories = true),
  (regExp = /^\.\/.*$/),
  (mode = "sync")
)

require.context("./test", false, /\.test\.js$/)
//（创建出）一个 context，其中文件来自 test 目录，request 以 `.test.js` 结尾。

require.context("../", true, /\.stories\.js$/)
// （创建出）一个 context，其中所有文件都来自父文件夹及其所有子级文件夹，request 以 `.stories.js` 结尾。
```

### context module API

一个 context module 会导出一个（require）函数，此函数可以接收一个参数：request

- resolve 是一个函数，它返回 request 被解析后得到的模块 id。
- keys 也是一个函数，它返回一个数组，由所有可能被此 context module 处理的请求（译者注：参考下面第二段代码中的 key）组成。

如果想引入一个文件夹下面的所有文件，或者引入能匹配一个正则表达式的所有文件，这个功能就会很有帮助

```js
function importAll(r) {
  r.keys().forEach(r)
}

importAll(require.context("../components/", true, /\.js$/))
```

```js
const cache = {}

function importAll(r) {
  r.keys().forEach((key) => (cache[key] = r(key)))
}

importAll(require.context("../components/", true, /\.js$/))
// 在构建时(build-time)，所有被 require 的模块都会被填充到 cache 对象中。
```

> 预设: 开箱即用, 提前配置好的一些配置

### 什么是构建工具？

构建工具是一种用于自动化构建项目的工具，它可以帮助我们完成一些重复性的工作，比如代码转换、文件压缩、代码校验等。构建工具可以帮助我们提高开发效率，减少重复劳动，提高代码质量。

浏览器只能识别 HTML、CSS 和 JavaScript 代码，但是我们在开发过程中，可能会使用到一些浏览器无法识别的代码，比如： `typescript、less、sass、jsx` 等。这时候我们就需要构建工具来帮助我们将这些代码转换成浏览器可以识别的代码。

语法降级: 将高版本的语法转换成低版本的语法，比如：将 ES6 语法转换成 ES5 语法。 使用 babel 来转换。
体积优化: 将代码压缩，减少代码体积，提高页面加载速度。 使用 uglifyjs 来压缩代码。
打包: 将多个文件打包成一个文件，减少网络请求，提高页面加载速度。 使用 webpack/vite 来打包。
开发服务器: 提供一个开发服务器，实时编译代码，实时刷新页面。 使用 webpack-dev-server/vite 来提供开发服务器。

### vite 优势

vite 是一个由原生 ESM 驱动的 Web 开发构建工具。vite 采用了一种全新的开发模式，它不需要打包，可以实时编译，实时刷新，提高开发效率。

### vite脚手架 与 vite

- vite 脚手架: 通过脚手架工具创建一个 vite 项目
- vite: 一个构建工具

```bash
# 1. 全局安装 vite 脚手架
# 2. 直接运行 create-vite bin 目录下的一个执行配置文件
# 3. create-vite 给了很多预设, 很多模板
yarn create vite
```

### 启动项目

vite 如果看到非绝对路径, 会默认去 node_modules 中找, 如果找不到, 会去 public 中找, 默认开启路径补全
`import __vite__cjsImport0_lodash from "/node_modules/.vite/deps/lodash.js?v=3c9b85b2";`

```bash
yarn add vite -D # 安装 vite
```

### 依赖预构建

vite 会自动预构建依赖，当我们第一次启动项目时，vite 会自动将依赖构建成一个文件，这样可以提高项目的启动速度。 vite会找到对应的依赖, 然后调用 esbuild 进行构建, 将其它规范的代码转换成 esmodule 规范的代码, 然后放到 .vite/deps 目录下

解决了三个问题: 

1. 不同的第三方库，可能会有不同的构建规范，比如：commonjs、esmodule、umd 等。vite 会将不同规范的代码转换成 esmodule 规范的代码，这样可以提高项目的启动速度。
2. 对路径的出处理上可以直接使用 .vite/deps 中的文件, 方便路径重写
3. 网络多包传输性能问题 (有了依赖预构建, 无论有多少额外的 export, import vite都会将它们进行集成只生成一个或几个模块)

`vite.config.js` ==> `webpack.config.js`

### vite 配置文件


- 智能提示:  `@type {import('vite').UserConfig}`

```js
// vite.config.js 语法提示
import { defineConfig } from 'vite'
export default defineConfig({
  // 配置选项
})
```

环境处理

```js
const envResolver = {
  // 开发环境
  serve: () => {
    console.log('serve')
    return Object.assign({}, viteBaseConfig, viteDevConfig)
  },
  // 生产环境
  build: () => {
    console.log('build')
    return Object.assign({}, viteBaseConfig, viteProdConfig)
  }
}
export default defineConfig(({ command }) => {
  console.log(command, 'command')
  // 根据不同的环境返回不同的配置
  return envResolver[command]()
})

vite dev
vite build
```

### vite 环境变量

会根据当前代码运行的环境产生值的变化的变量叫做环境变量

1. 开发环境: 代码运行在本地开发环境中
2. 生产环境: 代码运行在线上环境中
3. 测试环境: 代码运行在测试环境中
4. ...

使用 `dotenv` 来管理环境变量: `dotenv` 会自动读取项目根目录下的 `.env` 文件，然后将文件中定义的环境变量注入到 `process.env` 中。

- 安装 `dotenv` 包
- 在项目根目录下创建 `.env` 文件
- 在 `.env` 文件中定义环境变量
- 在代码中使用环境变量
- 在 vite.config.js 中使用环境变量
- 在 package.json 中定义环境变量
- 在代码中使用环境变量

vite 内置了 `dotenv` 包, 可以直接使用环境变量, 注入到 `process.env` 中 (但 vite 考虑到安全问题, 只能使用 `VITE_` 开头的环境变量)

- `root`: 项目的根目录
- `envDir`: 用来配置当前环境变量文件的目录
- `process.cwd()`: 当前执行 node 命令时的文件夹地址(工作目录, 在那个文件夹下执行命令, 就是那个文件夹)
- `.env` 所有环境都能用
- `.env.development` 开发环境需要用到的环境(默认情况下, vite 将我们的开发环境取名 `development`, 开发环境会读取 `.env` 和 `.env.development` 文件)
- `.env.production` 生产环境需要用到的环境(默认情况下, vite 将我们的生产环境取名 `production`, 生产环境会读取 `.env` 和 `.env.production` 文件)

```bash
yarn dev --mode development # 开发环境 会将 mode 设置为 development 传递给 vite.config.js
yarn build --mode production # 生产环境 会将 mode 设置为 production 传递给 vite.config.js
# "test": "vite --mode test"
yarn test # vite --mode test 测试环境 会将 mode 设置为 test 传递给 vite.config.js
```

```js
// process.cwd() 当前执行 node 命令时的文件夹地址
// C:\Users\v_yymyyang\Desktop\yym_github\Knowledge-summary\Vite\test-vite

```

### vite 处理 css 以及 css 模块化

vite 默认支持对 css 文件的处理

1. vite 读取 main.js 中引用了 index.css; 直接使用 fs 读取 index.css 文件内容
2. 创建 style 标签, 将 index.css 的内容放到 style 标签中
3. 将 style 标签插入到 index.html 的 head 中

cssmodule

```js
// index.module.css style.module.css
import styles from './index.module.css'
console.log(styles)
// calss: styles.footer
```

1. .module.css 是一种结尾约定的 css 模块化文件
2. vite 会将 .module.css 文件转换为 css 模块化文件, 将类名转换为随机的类名, 将类名放到一个对象中, 将对象导出
3. 创建一个映射对象, 将类名映射到对应的类名, 放入 style 标签中

css module 配置

```js
import { defineConfig } from 'vite'
export default defineConfig({
  css: { // 对 css 的行为进行配置
    // 配置 CSS modules 的行为。选项将被传递给 postcss-modules。
    modules: { // 配置 css 模块化, 对 css 模块化默认行为进行覆盖
      localsConvention: 'camelCase', // 'camelCase' | 'camelCaseOnly' | 'dashes' 中划线 | 'dashesOnly'  修改生成配置对象的key的展示形式
      scopeBehaviour: 'local', // 'local' | 'global'  配置当前模块化行为是模块化还是全局化 local 默认代表开启模块化
      generateScopedName: '[name]__[local]___[hash:base64:5]', // 生成的类名名字规则
      hashPrefix: 'yym', // 希望生成的hash更加独特, 参与生成 hash
      globalModulePaths: ['./src/assets/css/base.css'] // 配置全局 css 文件, 这些文件不会被模块化, 不想参与 css 模块化的路径
    }
  }
})
```

css 配置流程 (preProcessorOptions) 指定传递给 CSS 预处理器的选项

配置 css 预处理器 (less/scss/stylus) 的一些全局参数

```js
export default defineConfig({
  css: { // 对 css 的行为进行配置
    preprocessorOptions: { // 配置 css 预处理器 (less/scss/stylus) 的一些全局参数
      less: {
        modifyVars: { // 配置 less 变量
          'primary-color': '#f00'
        },
        javascriptEnabled: true // 配置 less 启用 js 语法
      }
    }
  }
})
```

postcss(后处理器): vite 默认使用 postcss 处理 css, 可以配置 postcss 的一些选项

- 保证 css 执行起来万无一失, 在不同浏览器中执行效果一致, 对 css 进行兼容性处理
- 前缀补全
- 使用 postcss => `test-postcss` 文件夹


### vite 对静态资源的处理

什么是静态资源: 静态资源是服务器直接返回给客户端的资源, 比如图片, 音频, 视频, 文本, css, js 等等

vite 对静态资源基本开箱即用


### vite 在生产环境对静态资源的处理 dist/

1. 打包后有 hash 值, 浏览器有缓存, 静态资源名字不改变, 就会缓存, 浏览器不会重新请求

```js
export default defineConfig({
  build: {
    outDir: 'test', // 配置输出目录
    rollupOptions: { // 配置 rollup 的构建策略
      output: {
        entryFileNames: '[name].js', // 配置入口文件名
        chunkFileNames: '[name].js', // 配置分割文件名
        assetFileNames: '[hash].[name].[ext]' // 配置静态资源文件名
      }
    },
    assetsInlineLimit: 4096000, // 配置静态资源打包大小限制, 低于 4M 的静态资源会被打包成 base64
  },
})
```
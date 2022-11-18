### 本地安装

```js
npm install --save-dev webpack
# 或指定版本
npm install --save-dev webpack@<version>
```

如果你使用 webpack v4+ 版本，并且想要在命令行中调用 webpack，你还需要安装 CLI

```bash
npm install --save-dev webpack-cli
```

```js
"scripts": {
  "build": "webpack --config webpack.config.js"
}
```

### 全局安装

```js
npm install --global webpack
```

### 生产环境

development(开发环境) 和 production(生产环境) 这两个环境下的构建目标存在着巨大差异。在开发环境中，我们需要：强大的 source map 和一个有着 live reloading(实时重新加载) 或 hot module replacement(热模块替换) 能力的 localhost server。而生产环境目标则转移至其他方面，关注点在于压缩 bundle、更轻量的 source map、资源优化等，通过这些优化方式改善加载时间

由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置

### ECMAScript 模块

Node.js 通过设置 package.json 中的属性来显式设置文件模块类型。 在 package.json 中设置 "type": "module" 会强制 package.json 下的所有文件使用 ECMAScript 模块。 设置 "type": "commonjs" 将会强制使用 CommonJS 模块。

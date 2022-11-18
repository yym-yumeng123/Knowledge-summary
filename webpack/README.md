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
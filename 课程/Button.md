# 如何实现一个 Button 组件

### 1. 搭建环境配置

技术栈: `React + Hook + TS + Vite`

1. 如何使用 vite 创建一个 React + TS 的脚手架

```bash
yarn create vite ProjectName --template react-ts

yarn add sass // 安装css 预处理器
```

```js
// 是否使用 css modules

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 配置 css
  css: {
    modules: {
      generateScopedName: "[local]_[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
      },
    },
  },
});
```

### 2. 写一个自己的 Button 组件

> 看一下几个比较常用的 UI 组件库里是如何写 Button 的

- [antd Button 组件](https://ant.design/components/button-cn/)
- [element Button 组件](https://element.eleme.cn/#/zh-CN/component/button)

> 我们参考的 UI 地址

- [UI 地址](http)

> 在这之前, 我们思考一下, 如何写一个易用的 Button, 当别人使用我们的组件时, 可以直接上手, 我们不需要思考一个大而全的 UI 组件, 我们先完成一个默认的, 再在上面添加我们需要的其它功能

### 环境搭建

- 编辑器: [VSCode](https://code.visualstudio.com/)
- 浏览器: [Chrome](https://www.google.com/chrome/)
- Node.js: [Node.js](https://nodejs.org/en/)
- Vite: [Vite](https://vitejs.dev/)

### 项目初始化

- npm 
- yarn
- pnpm

```bash
npm create vite@latest

# 1. 让你输入项目名称
# 2. 选择前端框架: React/Vue/Svelte/Solid/...
# 3. 选择开发语言, 以 React 为例: JavaScript/TypeScript
```

### 项目入口加载

- index.html: 默认把根目录下的 index.html 文件作为项目入口文件

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- 现代浏览器原生支持了 ES 模块规范，因此原生的 ES 语法也可以直接放到浏览器执行 -->
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- src/main.tsx: 默认把根目录下的 src/main.tsx 文件作为项目入口文件

```tsx
// Vite 会将项目的源代码编译成浏览器可以识别的代码，与此同时，一个 import 语句即代表了一个 HTTP 请求
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

`no-bundle` 理念的真正含义: **利用浏览器原生ES模块的支持, 实现开发阶段的 Dev Server, 进行模块的按需加载, 而不是先整体构建, 再进行加载**


### 初始配置文件

- vite.config.ts: 默认把根目录下的 vite.config.ts 文件作为项目配置文件

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 配置了react 插件, 提供对 react 的支持
  plugins: [react()],
})

```

### 生产环境构建

有人说 Vite 因为其不打包的特性而不能上生产环境，其实这种观点是相当有误的。在开发阶段 Vite 通过 Dev Server 实现了不打包的特性，而在生产环境中，Vite 依然会基于Rollup 进行打包，并采取一系列的打包优化手段。从脚手架项目的 package.json 中就可见一斑


```json
"scripts": {
  "dev": "vite", // 开发阶段
  "build": "tsc -b && vite build", // 生产阶段
  "lint": "eslint .",
  "preview": "vite preview" // 生产环境打包完预览产物
},

{
  "compilerOptions": {
    // 省略其他配置
    // 1. noEmit 表示只做类型检查，而不会输出产物文件
    // 2. 这行配置与 tsc --noEmit 命令等
    "noEmit": true,
    "jsx": "react-jsx",
  },
  "include": ["src"]
}
```
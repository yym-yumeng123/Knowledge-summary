### 样式方案的意义

对初学者来说，谈到开发前端的样式，首先想到的便是直接写原生 CSS。但时间一长，难免会发现原生 CSS 开发的各种问题。那么，如果我们不用任何 CSS 工程方案，又会出现哪些问题呢？

- 开发体验差: 不支持选择期嵌套
- 样式污染: 出现同样的类名, 样式会互相覆盖
- 浏览器兼容性: 为了兼容, 需要对一些属性加上浏览器前缀
- 打包后的样式体积过大: 样式会重复很多次

社区有哪些解决方案呢？

- CSS 预处理器: Sass, Less, Stylus, 这些方案内置了语法、变量、嵌套、运算符、函数等
- CSS Modules: 能够CSS类名处理成哈希值, 避免样式污染
- CSS 后处理器PostCsss, 用来解析和处理CSS代码, 实现功能丰富: 比如px转rem, 浏览器兼容性处理, 压缩css代码, 添加浏览器前缀
- CSS IN JS: 主流包括styled-components, emotion, 顾名思义, 就是把CSS代码写到JS代码中
- CSS 原子化框架: Tailwind CSS, UnoCSS, 


1. CSS 预处理器

Vite 本身对 CSS各种预处理语言(Sass/Scss/Less/Stylus)做了内置支持, 我们只需安装对应的预处理即可

```bash
# less
npm install less -D
```

```js
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        // additionalData 的内容会在每个 less 文件的开头自动注入
        additionalData: `@import "@styles/variables.less";`,
      },
    },
  },
})
```

2. CSS Modules

CSS Modules 在 Vite也是一个开箱即用的能力, 我们只需要在文件名后加上 .module.css 即可


```tsx
// index.tsx
import styles from './index.module.scss';
export function Header() {
 return <p className={styles.header}>This is Header</p>
};
```

3. PostCSS

一般可以通过 `postcss.config.js` 文件来配置 PostCSS, 不过在 Vite 配置文件中已经提供了 PostCSS 的配置入口, 可以直接在 Vite 配置文件中进行操作。

```bash
# 自动为不同的目标浏览器添加样式前缀
npm i autoprefixer -D
```

```ts
// vite.config.ts 增加如下的配置
import autoprefixer from "autoprefixer"
export default {
  css: {
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ["Chrome > 40", "ff > 31", "ie 11"],
        }),
      ],
    },
  },
}
```

PostCSS 可以做的事情非常多，甚至能实现 CSS 预处理器语法和 CSS Modules，社区当中也有不少的 PostCSS 插件

- postcss-preset-env: 兼容 CSS 新语法
- cssnano: 压缩 CSS 代码
- [postcss](www.postcss.parts/ )

4. CSS 原子化框架

- tailwindcss
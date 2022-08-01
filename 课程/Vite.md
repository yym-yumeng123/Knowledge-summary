# 使用 Vite 创建一个 Vue3 + Ts 的开发环境

> vite 支持很多预设的模板让我们可以选择, 我们根据需要来选择模板, 可以使用下面三种包管理工具创建

```bash
npm create vite@latest my-vue-app -- --template vue-ts
yarn create vite my-vue-app --template vue-ts
pnpm create vite my-vue-app --template vue-ts
```

1. 看一下 vite 生成目录的 `package.json`

```json
{
  "name": "my-vue-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite", // 打开开发环境
    "build": "vue-tsc --noEmit && vite build", // 打包生产
    "preview": "vite preview" // 本地查看打包后的环境
  },
  "dependencies": {
    "vue": "^3.2.37"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^3.0.0",
    "typescript": "^4.6.4",
    "vite": "^3.0.0",
    "vue-tsc": "^0.38.4"
  }
}
```

2. 启动环境

```
yarn dev
```

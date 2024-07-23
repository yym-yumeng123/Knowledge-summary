import { defineConfig } from 'vite'

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
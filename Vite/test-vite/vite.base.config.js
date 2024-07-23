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
    },
    preprocessorOptions: { // 配置 css 预处理器 (less/scss/stylus) 的一些全局参数
      less: {
        modifyVars: { // 配置 less 变量
          'primary-color': '#f00'
        },
        javascriptEnabled: true // 配置 less 启用 js 语法
      }
    },
    devSourcemap: true, // 开启 css 的 sourcemap, 开发环境开启, 生产环境关闭
    postcss: {
      plugins: [
        require('postcss-preset-env')(),
        require('autoprefixer')({
          overrideBrowserslist: ['> 1%', 'last 2 versions']
        })
      ]
    }
  }
})
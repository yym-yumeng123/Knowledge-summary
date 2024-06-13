// Note: vite.config.js is a file that is used to configure the Vite build tool.
/**
 * vite 语法提示
 * 1. import { defineConfig } from 'vite'
 * 2. @type {import('vite').UserConfig}
 */

import { defineConfig, loadEnv } from 'vite'
import viteBaseConfig from './vite.base.config'
import viteDevConfig from './vite.dev.config'
import viteProdConfig from './vite.prod.config'
/**
 * command: 'serve' | 'build'
 * mode: 'development' | 'production' => yarn dev (--mode development) | yarn build (--mode production
 */


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
export default defineConfig(({ command, mode }) => {
  console.log(command, 'command', process.cwd())
  const env = loadEnv(mode, process.cwd(), "")
  // 根据不同的环境返回不同的配置
  return envResolver[command]()
})
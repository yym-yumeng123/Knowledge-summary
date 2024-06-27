const Koa = require('koa')
const fs = require('fs') // 引入文件模块
const path = require('path')

const app = new Koa()

app.use(async (ctx) => {
  console.log(ctx.request)
  if (ctx.request.url === '/') {
    // 根路径访问
    const indexContent = await fs.promises.readFile(path.resolve(__dirname, './index.html'))
    console.log(indexContent.toString(), 'index...')
    ctx.response.body = indexContent
    ctx.response.set('Content-Type', 'text/html;charset=utf-8')
  }

  if (ctx.request.url === '/main.js') {
    const mainContent = await fs.promises.readFile(path.resolve(__dirname, './main.js'))
    ctx.response.body = mainContent
    ctx.response.set('Content-Type', 'text/javascript')
  }

  if (ctx.request.url === '/App.vue') {
    const indexContent = await fs.promises.readFile(path.resolve(__dirname, './App.vue'))
    // 如果是 vue 文件, 需要对 模板进行解析
  }
})

app.listen(5173, () => {
  console.log('server is running at http://localhost:5173')
})
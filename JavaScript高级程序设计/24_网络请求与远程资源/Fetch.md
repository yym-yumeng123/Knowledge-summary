> Fetch API 能够执行 XMLHttpRequest 的所有功能，而且更简单。XML 可以选择异步, 而 Fetch 则必须是异步的。

### 基本用法

`fetch()` 方法是暴露在全局作用域中的，包括主页面执行线程、模块和工作线程。调用这个方法，浏览器就会向给定 URL 发送请求。

1. 分派请求

fetch() 只有一个必须的参数，即请求 URL, 返回一个 Promise

```js
let r = fetch("https://api.github.com/users/github");
console.log(r) // Promise {<pending>}

r.then((response) => {
  console.log(response);
})
```

2. 读取响应

读取响应内容的最简单方式是取得纯文本格式的内容, 使用 `response.text()` 方法, 方法会返回一个 Promise, 读取成功后返回一个字符串。

```js
fetch("bar.txt").then((response) => {
  response.text().then((data) => {
    console.log(data)
  })
})

fetch("bar.txt")
  .then((response) => response.text())
  .then((data) => console.log(data))
```

3. 处理状态码和请求失败

Fetch API 支持通过 Response 的 status（状态码）和 statusText（状态文本）属性检查响应状态。

```js
// 成功获取响应的请求通常会产生值为 200 的状态码
fetch("/bar").then((response) => {
  console.log(response.status) // 200
  console.log(response.statusText) // OK
})

// 请求不存在的资源通常会产生值为 404 的状态码
fetch("/bar/foo").then((response) => {
  console.log(response.status) // 404
  console.log(response.statusText) // Not Found
})

// 请求的 URL 如果抛出服务器错误会产生值为 500 的状态码
fetch("/throw-server-error").then((response) => {
  console.log(response.status) // 500
  console.log(response.statusText) // Internal Server Error
})

// 状态码非 200~299 时检查 Response 对象的 ok 属性
fetch("/bar").then((response) => {
  console.log(response.status) // 200
  console.log(response.ok) // true
})
fetch("/does-not-exist").then((response) => {
  console.log(response.status) // 404
  console.log(response.ok) // false
})
```

4. 自定义选项

只使用 URL 时，fetch()会发送 GET 请求，只包含最低限度的请求头, 进一步配置如何发送请求，需要传入可选的第二个参数 init 对象

- body: 指定请求体时请求体的内容, 必须是 Blob, BufferSource, FormData, URLSearchParams、ReadableStream 或 String 的实例
- cache: 控制浏览器与HTTP缓存的交互
- credentials: 配置请求的 Cookie
- headers: 指定请求头
- method: 指定请求方法
- keepalive: 用于指示浏览器允许请求存在时间超出页面生命周期
- mode: 指定请求模式 这个模式决定来自跨源请求的响应是否有效，以及客户端可以读取多少响应
- redirect: 指定请求重定向
- referrer: 指定请求来源
- referrerPolicy: 配置请求来源
- signal: 配置取消请求的信号

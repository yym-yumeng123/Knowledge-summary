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
- cache: 控制浏览器与 HTTP 缓存的交互
- credentials: 配置请求的 Cookie
- headers: 指定请求头
- method: 指定请求方法
- keepalive: 用于指示浏览器允许请求存在时间超出页面生命周期
- mode: 指定请求模式 这个模式决定来自跨源请求的响应是否有效，以及客户端可以读取多少响应
- redirect: 指定请求重定向
- referrer: 指定请求来源
- referrerPolicy: 配置请求来源
- signal: 配置取消请求的信号

### 常见 Fetch 请求模式

1. 发送 JSON 数据

```js
let payload = JSON.stringify({ foo: "bar" })
let jsonHeaders = new Headers({ "Content-Type": "application/json" })

fetch("/bar", {
  method: "POST",
  headers: jsonHeaders,
  body: payload,
})
```

2. 在请求体中发送参数

因为请求体支持任意字符串值, 所以可以通过它发送请求参数

```js
let payload = "foo=bar&baz=qux"
let paramHeaders = new Headers({
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
})
fetch("/bar", {
  method: "POST",
  headers: paramHeaders,
  body: payload,
})
```

3. 发送文件

因为请求体支持 FormData 实现，所以 fetch()也可以序列化并发送文件字段中的文件：

```js
let imageFormData = new FormData()
let imageInput = document.querySelector("input[type=file]")
imageFormData.append("image", imageInput.files[0])
fetch("/bar", {
  method: "POST",
  body: imageFormData,
})
```

4. 加载 Blob 文件

一种常见的做法是明确将图片文件加载到内存，然后将其添加到 HTML 图片元素。为此，可以使用响应对象上暴露的 `blob()` 方法

```js
const imageElement = document.querySelector("img")
fetch("my-image.png")
  .then((response) => response.blob())
  .then((blob) => {
    imageElement.src = URL.createObjectURL(blob)
  })
```

5. 发送跨域资源

从不同的源请求资源，响应要包含 CORS 头部才能保证浏览器收到响应。没有这些头部，跨源请求会失败并抛出错误。

```js
fetch("//cross-origin.com")
// TypeError: Failed to fetch
// No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

如果代码不需要访问响应，也可以发送 no-cors 请求。此时响应的 type 属性值为 opaque

```js
// 适合发送探测请求或者将响应缓存起来供以后使用
fetch("//cross-origin.com", { method: "no-cors" }).then((response) =>
  console.log(response.type)
)
// opaque
```

6. 中断请求

Fetch API 允许中断请求，通过 AbortController/AbortSignal 对象实现。

```js
let abortController = new AbortController()
fetch("wikipedia.zip", { signal: abortController.signal }).catch(() =>
  console.log("aborted!")
)
// 10 毫秒后中断请求
setTimeout(() => abortController.abort(), 10)
// 已经中断
```

### Headers 对象

Headers 对象是所有外发请求和入站响应头部的容器, 每个外发的 Request 实例都包含一个空的 Headers 实例, 可以通过 Request.prototype.headers 属性访问, 每个入站 Response 实例都包含一个空的 Headers 实例, 可以通过 Response.prototype.headers 访问

1. Headers 与 Map 的相似之处

HTTP 头部本质上是序列化后的键值对, 键是 HTTP 头部名称, 值是 HTTP 头部值

```js
let h = new Headers()
let m = new Map()

// 设置键
h.set("Content-Type", "text/plain")
m.set("Content-Type", "text/plain")

// 检查键
console.log(h.has("Content-Type"))
console.log(m.has("Content-Type"))

// 更新键
h.set("Content-Type", "application/json")
m.set("Content-Type", "application/json")

// 获取更新的值
console.log(h.get("Content-Type"))
console.log(m.get("Content-Type"))

// 删除键
h.delete("Content-Type")
m.delete("Content-Type")
```

2. Headers 独有的特性

在初始化 Headers 对象时, 也可以使用键/值对形式的对象, 而 Map 则不可以

```js
let seed = { "Content-Type": "text/plain" }
let h = new Headers(seed)

let m = new Map(seed) // TypeError: object is not iterable
```

一个 HTTP 头部字段有多个值, 而 Headers 对象通过 append() 支持添加多个值

```js
let h = new Headers()
h.append("Set-Cookie", "foo=bar")
h.append("Set-Cookie", "baz=qux")
console.log(h.get("Set-Cookie"))
```

3. 头部护卫

某些情况下，并非所有 HTTP 头部都可以被客户端修改，而 Headers 对象使用护卫来防止不被允许的修改。

### Request 对象

顾名思义，Request 对象是获取资源请求的接口。这个接口暴露了请求的相关信息，也暴露了使用请求体的不同方式。

1. 创建 Request 对象

```js
let r = new Request("https://example.com/foo")
console.log(r) // Request { … }
```

2. 克隆 Request 对象

Fetch API 提供了两种不太一样的方式用于创建 Request 对象的副本: clone() 和 new Request()

```js
let r1 = new Request("https://example.com/foo")
let r2 = new Request(r1)

// 如果传入 init 对象, 会覆盖源对象中同名的值
let r3 = new Request(r1, { method: "POST" })
console.log(r1.method, r2.method, r3.method) // GET GET POST


// clone() 会创建一个 Request 对象的副本, 任何值都不会被覆盖
let r1 = new Request('https://foo.com', { method: 'POST', body: 'foobar' });
let r2 = r1.clone();
console.log(r1.url); // https://foo.com/
console.log(r2.url); // https://foo.com/
console.log(r1.bodyUsed); // false
console.log(r2.bodyUsed); // false
```

3. 在 fetch() 中使用 Request 对象

```js
let r = new Request('https://foo.com');
// 向 foo.com 发送 GET 请求
fetch(r);
// 向 foo.com 发送 POST 请求
fetch(r, { method: 'POST' });

```

fetch()会在内部克隆传入的 Request 对象, 与克隆 Request 一样，fetch()也不能拿请求体已经用过的 Request 对象来发送请求

```js
let r = new Request("https://foo.com", { method: "POST", body: "foobar" })
r.text()
fetch(r)
// TypeError: Cannot construct a Request with a Request object that has already been used.
```

要想基于包含请求体的相同 Request 对象多次调用 fetch()，必须在第一次发送 fetch()请求前调用 clone()：

```js
let r = new Request("https://foo.com", { method: "POST", body: "foobar" })
// 3 个都会成功
fetch(r.clone())
fetch(r.clone())
fetch(r)
```

### Response 对象

Response 对象是获取资源响应的接口。这个接口暴露了响应的相关信息

1. 创建 Response 对象

```js
let r = new Response();
console.log(r);

// Response {
//  body: (...)
//  bodyUsed: false
//  headers: Headers {}
//  ok: true
//  redirected: false
//  status: 200
//  statusText: "OK"
//  type: "default"
//  url: ""
// }

```

- headers: 响应包含的 Headers 对象
- ok: 布尔值 响应状态码是否在 200-299 范围内
- redirected: 响应是否被重定向
- status: 响应状态码
- statusText: 响应状态文本
- type: 响应类型
- url: 响应的 URL

### Request/Response/Body 混入

Request 和 Response 都使用了 Fetch API 的 Body 混入，以实现两者承担有效载荷的能力

Body 混入提供了 5 个方法，用于将 ReadableStream 转存到缓冲区的内存里，将缓冲区转换为某种 JavaScript 对象类型，以及通过期约来产生结果

1. Body.text()

Body.text()方法返回期约，解决为将缓冲区转存得到的 UTF-8 格式字符串。下面的代码展示了在 Response 对象上使用 Body.text()：

```js
fetch("https://foo.com")
  .then((response) => response.text())
  .then(console.log)
// <!doctype html><html lang="en">
// <head>
// <meta charset="utf-8">
// ...
```

2. Body.json()

Body.json()方法返回期约，解决为将缓冲区转存得到的 JSON

```js
fetch("https://foo.com/foo.json")
  .then((response) => response.json())
  .then(console.log)
// {"foo": "bar"}
```

3. Body.arrayBuffer()

有时候，可能需要以原始二进制格式查看和修改主体, 可以使用 Body.arrayBuffer()将主体内容转换为 ArrayBuffer 实例

```js
fetch("https://foo.com")
  .then((response) => response.arrayBuffer())
  .then(console.log)
// ArrayBuffer(...) {}
```

4. Body.formData()

浏览器可以将 FormData 对象序列化/反序列化为主体

```js
fetch("https://foo.com/form-data")
  .then((response) => response.formData())
  .then((formData) => console.log(formData.get("foo")))
// bar
```

5. Body.blob()

有时候，可能需要以原始二进制格式使用主体，不用查看和修改

```js
fetch("https://foo.com")
  .then((response) => response.blob())
  .then(console.log)
// Blob(...) {size:..., type: "..."}
```

6. 一次性流

因为 Body 混入是构建在 ReadableStream 之上的，所以主体流只能使用一次。这意味着所有主体混入方法都只能调用一次，再次调用就会抛出错误

```js
fetch("https://foo.com").then((response) =>
  response.blob().then(() => response.blob())
)
// TypeError: Failed to execute 'blob' on 'Response': body stream is locked
let request = new Request("https://foo.com", { method: "POST", body: "foobar" })
request.blob().then(() => request.blob())
// TypeError: Failed to execute 'blob' on 'Request': body stream is locked
```

即使是在读取流的过程中，所有这些方法也会在它们被调用时给 ReadableStream 加锁，以阻止其他读取器访问：

```js
fetch("https://foo.com").then((response) => {
  response.blob() // 第一次调用给流加锁
  response.blob() // 第二次调用再次加锁会失败
})
// TypeError: Failed to execute 'blob' on 'Response': body stream is locked
let request = new Request("https://foo.com", { method: "POST", body: "foobar" })
request.blob() // 第一次调用给流加锁
request.blob() // 第二次调用再次加锁会失败
// TypeError: Failed to execute 'blob' on 'Request': body stream is locked
```

7. 使用 ReadableStream 主体

正如Stream API所定义的，ReadableStream暴露了getReader()方法，用于产生`ReadableStreamDefaultReader`，这个读取器可以用于在数据到达时异步获取数据块。数据流的格式是`Uint8Array`。

```js
fetch("https://fetch.spec.whatwg.org/")
  .then((response) => response.body)
  .then((body) => {
    let reader = body.getReader()
    console.log(reader) // ReadableStreamDefaultReader {}
    reader.read().then(console.log)
  })
// { value: Uint8Array{}, done: false }

```

在随着数据流的到来取得整个有效载荷，可以像下面这样递归调用 read()方法：

```js
fetch("https://fetch.spec.whatwg.org/")
  .then((response) => response.body)
  .then((body) => {
    let reader = body.getReader()
    function processNextChunk({ value, done }) {
      if (done) {
        return
      }
      console.log(value)
      return reader.read().then(processNextChunk)
    }
    return reader.read().then(processNextChunk)
  })
// { value: Uint8Array{}, done: false }
// { value: Uint8Array{}, done: false }
// { value: Uint8Array{}, done: false }
```

双流技术 

```js

```
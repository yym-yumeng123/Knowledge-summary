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
fetch("https://fetch.spec.whatwg.org/")
  .then((response) => response.body)
  .then((body) => {
    const reader = body.getReader()
    // 创建第二个流
    return new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { value, done } = await reader.read()
            if (done) {
              break
            }
            // 将主体流的块推到第二个流
            controller.enqueue(value)
          }
        } finally {
          controller.close()
          reader.releaseLock()
        }
      },
    })
  })
  .then((secondaryStream) => new Response(secondaryStream))
  .then((response) => response.text())
  .then(console.log)
// <!doctype html><html lang="en"><head><meta charset="utf-8"> ...

```

### 流式处理 SSE (Server-Sent Events)

SSE (Server-Sent Events) 是一种服务器推送技术，允许服务器向客户端持续发送事件流。与传统的请求-响应模式不同，SSE 是**单向、持续的数据流**。

#### 为什么需要流式处理？

传统方式需要等待完整响应：
```js
// 传统方式：必须等服务器全部处理完才能看到结果
fetch('/api/chat')
  .then(res => res.json())
  .then(data => {
    // 一次性显示全部内容，用户等待时间长
    console.log(data.message)
  })
```

流式处理边收边显示：
```js
// 流式方式：数据来一块处理一块
fetch('/api/chat')
  .then(res => {
    const reader = res.body.getReader()
    // 每收到一个 chunk 就立即处理
  })
```

#### SSE 数据格式

SSE 响应有特定的文本格式：

```
data: 第一块数据

data: 第二块数据

data: {"type": "message", "content": "你好"}

event: customEvent
data: 自定义事件数据

```

**关键点**：
- 每条消息以 `data:` 开头
- 消息之间用**两个换行符**分隔
- 可选 `event:` 字段指定事件类型
- 可选 `id:` 字段指定事件 ID

#### 使用 Fetch + ReadableStream 处理 SSE

下面是一个完整的 SSE 流式处理示例：

```js
async function streamSSE(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        console.log('流传输完成')
        break
      }

      // 解码二进制数据
      const chunk = decoder.decode(value, { stream: true })

      // 将新数据追加到缓冲区
      buffer += chunk

      // 处理完整的 SSE 消息（按双换行符分割）
      const messages = buffer.split('\n\n')

      // 保留最后一个可能不完整的消息
      buffer = messages.pop() || ''

      // 处理每条完整的消息
      for (const message of messages) {
        if (!message.trim()) continue

        // 解析 SSE 消息
        const parsed = parseSSEMessage(message)

        // 处理不同类型的事件
        if (parsed.event === 'message' || !parsed.event) {
          console.log('收到消息:', parsed.data)
          // 可以在这里更新 UI
          appendToUI(parsed.data)
        } else if (parsed.event === 'error') {
          console.error('服务器错误:', parsed.data)
        } else if (parsed.event === 'done') {
          console.log('服务器完成发送')
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}

// 解析单条 SSE 消息
function parseSSEMessage(message) {
  const lines = message.split('\n')
  let event = 'message'
  let data = ''
  let id = null

  for (const line of lines) {
    if (line.startsWith('event:')) {
      event = line.slice(6).trim()
    } else if (line.startsWith('data:')) {
      data += line.slice(5).trim()
    } else if (line.startsWith('id:')) {
      id = line.slice(3).trim()
    }
  }

  // 尝试解析 JSON
  try {
    data = JSON.parse(data)
  } catch {
    // 保持原样
  }

  return { event, data, id }
}

// 示例：将消息追加到 UI
function appendToUI(data) {
  const container = document.getElementById('messages')
  const div = document.createElement('div')
  div.textContent = typeof data === 'string' ? data : data.content
  container.appendChild(div)
}

// 使用示例
streamSSE('/api/events')
```

#### 实际应用：ChatGPT 风格的流式输出

```js
class StreamingChat {
  constructor(url) {
    this.url = url
    this.container = document.getElementById('chat-messages')
    this.currentMessage = null
  }

  async sendMessage(message) {
    // 显示用户消息
    this.appendMessage('user', message)

    // 创建空的助手消息容器
    this.currentMessage = this.appendMessage('assistant', '')

    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        const chunk = decoder.decode(value, { stream: true })

        // SSE 格式：data: {...}
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6)

            // 跳过 [DONE] 标记
            if (jsonStr === '[DONE]') continue

            try {
              const data = JSON.parse(jsonStr)

              // 逐字追加内容
              if (data.content) {
                this.currentMessage.textContent += data.content
                // 自动滚动到底部
                this.scrollToBottom()
              }
            } catch (e) {
              console.error('解析失败:', e)
            }
          }
        }
      }
    } catch (error) {
      this.currentMessage.textContent = '出错啦: ' + error.message
    }
  }

  appendMessage(role, content) {
    const div = document.createElement('div')
    div.className = `message ${role}`
    div.textContent = content
    this.container.appendChild(div)
    this.scrollToBottom()
    return div
  }

  scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight
  }
}

// 使用
const chat = new StreamingChat('/api/chat/stream')
chat.sendMessage('你好，介绍一下 SSE')
```

#### 支持断线重连的 SSE 处理

```js
async function resilientSSE(url, options = {}) {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    onMessage = console.log,
    onError = console.error
  } = options

  let retryCount = 0
  let lastEventId = null

  while (retryCount <= maxRetries) {
    try {
      const headers = {}
      if (lastEventId) {
        headers['Last-Event-ID'] = lastEventId
      }

      const response = await fetch(url, { headers })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      // 重置重试计数（连接成功）
      retryCount = 0

      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const messages = buffer.split('\n\n')
        buffer = messages.pop() || ''

        for (const msg of messages) {
          const parsed = parseSSEMessage(msg)
          if (parsed.id) lastEventId = parsed.id
          onMessage(parsed)
        }
      }

      reader.releaseLock()
      break // 正常结束

    } catch (error) {
      retryCount++
      onError(error, retryCount)

      if (retryCount > maxRetries) {
        throw new Error(`超过最大重试次数: ${maxRetries}`)
      }

      // 等待后重连
      await new Promise(resolve => setTimeout(resolve, retryDelay * retryCount))
    }
  }
}
```

#### SSE vs WebSocket 对比

| 特性 | SSE | WebSocket |
|------|-----|-----------|
| 方向 | 服务器 → 客户端（单向） | 双向通信 |
| 协议 | HTTP | HTTP + WebSocket 升级 |
| 自动重连 | 浏览器自动支持 | 需手动实现 |
| 数据格式 | 文本（UTF-8） | 文本或二进制 |
| 浏览器支持 | 现代浏览器 | 现代浏览器 |
| 使用场景 | 消息推送、股票行情 | 聊天、游戏 |

**选择 SSE 当**：
- 只需要服务器推送数据
- 希望利用浏览器自动重连
- 数据格式简单（文本为主）
- 传统 HTTP 基础设施

**选择 WebSocket 当**：
- 需要双向通信
- 需要二进制数据传输
- 需要低延迟的实时交互


### Web Socket

Web Socket(套接字) 的目标是通过一个长时连接实现与全双工, 双向的通信。在 JS中创建 Web Socket 时, 一个 HTTP请求会发送到服务器以初始化连接, 服务器响应后, 连接使用 HTTP 的 Upgrade 头部从 HTTP协议转换为 WebSocket协议。

因为 Web Socket 使用了自定义协议. 所以URL方案(schene) 稍有变化: 不能再使用http:// 或 https://, 而是使用 ws:// 或 wss://. 前者是不安全连接, 后者用于安全链接。

使用自定义协议而非 HTTP 协议的好处是，客户端与服务器之间可以发送非常少的数据，不会对HTTP 造成任何负担。使用更小的数据包让 Web Socket 非常适合带宽和延迟问题比较明显的移动应用。使用自定义议的缺点是，定义协议的时间比定义 JavaScript API 要长。Web Socket 得到了所有主流浏览器支持。

1. API

```js
// 必须给 WebSocket 构造函数传入一个绝对 URL
// 同源策略不适用于 Web Socket，因此可以打开到任意站点的连接。至于是否与来自特定源的页面通信，则完全取决于服务器
let socket = new WebSocker("ws://echo.websocket.org")
```

浏览器会在初始化 WebSocket 对象之后立即创建连接。与 XHR 类似，WebSocket 也有一个readyState 属性表示当前状态。不过，这个值与 XHR 中相应的值不一样。

- WebSocket.OPENING (0) - 连接正在建立
- WebSocket.OPEN (1) - 连接已经建立，可以进行通信
- WebSocket.CLOSING (2) - 连接正在关闭
- WebSocket.CLOSE (3) - 连接已经关闭

任何时候都可以调用 close()方法关闭 Web Socket 连接：
`socket.close()`
调用 close()之后，readyState 立即变为 2（连接正在关闭），并会在关闭后变为 3（连接已经关闭）。


2. 发送和接受数据

WebSocket 对象有 send()方法，用于发送数据。这个方法接受一个字符串作为参数，并把它发送给服务器。

```js
let  socket = new WebSocket("ws://echo.websocket.org")
let stringData = "hello world"
let arrayBufferData = Unit8Array.from([1, 2, 3, 4, 5])
let blobData = new Blob(["hello world"])

// 服务器向客户端发送消息时，WebSocket 对象上会触发 message 事件
socket.send(stringData)
socket.send(arrayBufferData)

socket.onmessage = function(event) {
  let data = event.data
  // 对接收到的数据进行处理
}
```


3. 其它事件

- open - 连接成功时触发
- error - 连接错误时触发
- close - 连接关闭时触发


```js
let socket = new WebSocket("ws://www.example.com/server.php")
socket.onopen = function () {
  alert("Connection established.")
}
socket.onerror = function () {
  alert("Connection error.")
}
socket.onclose = function () {
  alert("Connection closed.")
}

socket.onclose = function (event) {
  console.log(
    `as clean? ${event.wasClean} Code=${event.code} Reason=${event.reason}`
  )
```


### 总结

Ajax 是无需刷新当前页面既可以从服务器获取数据的一个方法, 具有一下特点:

- 让 Ajax 迅速流行的中心对象是 XMLHttpRequest 对象。
- 这个对象最早由微软发明, 并在IE5中作为通过 JS 从服务器获取XML数据的一种手段
- XHR 的一个主要限制是同源策略, 即通信只能在相同域名, 相同端口和相同协议的前提下完成
- Fetch API 是作为 XHR对象的一种端到端的替代品，这个API提供了基于期约的结构, 更直观的接口以及对 Stream API 的最好支持
- Web Socket 是与服务器的全双工、双向通信渠道。与其他方案不同，Web Socket 不使用 HTTP，而使用了自定义协议，目的是更快地发送小数据块。这需要专用的服务器，但速度优势明显

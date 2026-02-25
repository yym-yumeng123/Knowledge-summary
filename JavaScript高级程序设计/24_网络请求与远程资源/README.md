## XMLHttpRequest 对象

所有现代的浏览器都支持 XMLHttpRequest 构造函数原生支持 XHR 对象。

- `let xhr = new XMLHttpRequest();`

### 使用 XHR

```js
let xhr = new XMLHttpRequest()
// 请求类型 请求URL 请求是否异步
xhr.open("GET", "data.txt", false)

// 接收一个参数, 作为请求体发送的数据, 如果不需要请求体, 必须传 null
// 调用 send()之后, 请求就会发送到服务器
xhr.send(null)
```

收到响应后, XHR 对象的属性会得到更新

- `xhr.status`: 响应 HTTP 状态码
- `xhr.statusText`: 响应 HTTP 状态码对应的文本
- `xhr.responseText`: 响应体返回的文本

收到响应后

1. 检查 status 属性确保响应成功返回 `2xx`
2. 此时 responseText 属性中保存的是响应体数据

```js
if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
  console.log(xhr.responseText)
} else {
  console.log(xhr.statusText)
}
```

上面是同步请求, 但多数情况最好使用异步请求, 可以不阻塞 JS 代码继续执行, XHR 对象有一个 readyState 属性, 表示当前处在请求/响应过程的哪个阶段

- 0: 请求未初始化, 尚未调用 open() 方法
- 1: 已打开, 调用 open() 方法后, 但尚未调用 send() 方法
- 2: 已发送, 调用 send() 方法后, 但尚未接收响应
- 3: 正在接收响应, 响应的 Headers 和状态码已经返回, 但尚未接收完响应体
- 4: 响应完成, 响应已经接收完成

```js
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
      console.log(xhr.responseText);
    } else {
      console.log(xhr.statusText);
    }
  }
}
xhr.open('get', '/api', true);
xhr.send(null);
```

在收到响应之前, 如果想取消异步请求, 可以调用`xhr.abort()`

### HTTP 头部

HTTP 请求和响应都有自己的头部, 它们是请求行和请求头和响应行和响应头组成的, 响应行和请求行都包含状态码和状态信息, 响应头和请求头都包含 HTTP 头部字段和字段值, HTTP 头部字段和字段值之间用冒号隔开, HTTP 头部字段和字段值之间用回车换行隔开, HTTP 头部字段和字段值之间用冒号隔开, HTTP 头部字段和字段值之间用回车换行隔开, HTTP 头部字段和字段值之间用冒号隔

- Accept: 浏览器可以处理的内容类型
- Accept-Charset: 浏览器可以处理的字符集
- Accept-Encoding: 浏览器可以处理的压缩编码类型
- Accept-Language: 浏览器可以处理的语言
- Connection: 浏览器是否支持持久连接
- Cookie: 浏览器的 Cookie
- Host: 发送请求的页面所在的域
- Referer: 发送请求的页面的 URI
- User-Agent: 浏览器的用户代理字符串

```js
xhr.open("get", "example.php", true);
// 头部字段的名称和值
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.send(null);
```

### GET 请求

最常用的请求是 GET 请求，它用于从服务器获取数据。

```js
xhr.open("get", "example.php?name=Nicholas", true);

function addURLParam(url, name, value) {
  return url + (url.indexOf("?") == -1 ? "?" : "&") + encodeURIComponent(name) + "=" + encodeURIComponent(value);
}

let url = "example.php";
url = addURLParam(url, "name", "Nicholas");
url = addURLParam(url, "city", "Sydney");
```

### POST 请求

用于向服务器发送应该保存的数据, 每个 Post 请求都应该在请求体中携带提交的数据, 而 GET 请求则不然

```js
xhr.open("POST", "example.php", true);

// 接下来要给send() 方法传入要发送的闪烁, 因为XHR最初主要用发送XML

// 模拟表单提交, 提交表单使用的内容类型
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
```

1. FormData 类型, 便于表单序列化

```js
let data = new FormData();
// append()方法接收两个参数：键和值，相当于表单字段名称和该字段的值
data.append("username", "admin");

let form = document.getElementById("user-info");
// 不再需要给 XHR 对象显式设置任何请求头部
xhr.send(new FormData(form));
```

2. 超时

```js
// IE8 给 XHR 对象增加了一个 timeout 属性，用于表示发送请求后等待多少毫秒，如果响应不成功就中断请求

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    }
  }
}
xhr.open("GET", "https://api.github.com/users/github");
xhr.timeout = 5000; // 5 秒后中断请求
xhr.ontimeout = function () {
  console.log("请求超时");
}
xhr.send(null);
```

### 进度事件

Progress Events 是 W3C 的工作草案, 定义了客户端-服务端通信, 有 6 个进度相关的 API

- loadstart: 在接受到响应的第一个字节时触发
- progress: 在接受响应期间，每隔指定的时间间隔触发一次
- error: 在请求失败时触发
- abort: 在调用 abort() 方法时触发
- load: 在成功接收完响应时触发
- loadend: 在通信完成时, 且在 load 或 error 事件之后触发

每次请求都会首先触发 loadstart 事件，之后是一个或多个 progress 事件，接着是 error、abort
或 load 中的一个，最后以 loadend 事件结束。

1. load 事件

只要是从服务器收到响应，无论状态码是什么，都会触发 load 事件。这意味着还需要检查 status 属性才能确定数据是否有效

```js
let xhr = new XMLHttpRequest()
xhr.onload = function () {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.responseText)
  } else {
    console.log(xhr.status)
  }
}

xhr.open("get", "/api/users", true)
xhr.send(null)
```

2. progress 事件

在浏览器接收数据期间，这个事件会反复触发。每次触发时，onprogress 事件处理程序都会收到 event 对象，其 target 属性是 XHR 对象，且包含 3 个额外属性：lengthComputable、position 和 totalSize。

- lengthComputable: 表示响应长度是否可计算，如果响应长度可计算，则值为 true，否则为 false
- position: 表示已经接收的字节数
- totalSize: 响应的总字节数

```js
let xhr = new XMLHttpRequest()
xhr.onload = function () {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.responseText)
  } else {
    console.log(xhr.status)
  }
}

xhr.onprogress = function (event) {
  let divStatus = document.getElementById("status")
  if (event.lengthComputable) {
    divStatus.innerHTML =
      "Received " + event.position + " of " + event.totalSize + " bytes"
  }
}

xhr.open("get", "/api/users", true)
xhr.send(null)

```

为了保证正确执行，必须在调用 open()之前添加 onprogress 事件处理程序。在前面的例子中，每次触发 progress 事件都会更新 HTML 元素中的信息。假设响应有 Content-Length 头部，就可以利用这些信息计算出已经收到响应的百分比。
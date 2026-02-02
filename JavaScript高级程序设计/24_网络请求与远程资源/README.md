## XMLHttpRequest 对象

所有现代的浏览器都支持 XMLHttpRequest 构造函数原生支持 XHR 对象。

- `let xhr = new XMLHttpRequest();`

### 使用XHR

```js
let xhr = new XMLHttpRequest()
// 请求类型 请求URL 请求是否异步
xhr.open("GET", "data.txt", false)

// 接收一个参数, 作为请求体发送的数据, 如果不需要请求体, 必须传 null
// 调用 send()之后, 请求就会发送到服务器
xhr.send(null)
```

收到响应后, XHR对象的属性会得到更新

- `xhr.status`: 响应HTTP状态码
- `xhr.statusText`: 响应HTTP状态码对应的文本
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

上面是同步请求, 但多数情况最好使用异步请求, 可以不阻塞JS代码继续执行, XHR 对象有一个 readyState 属性, 表示当前处在请求/响应过程的哪个阶段

- 0: 请求未初始化, 尚未调用 open() 方法
- 1: 已打开, 调用 open() 方法后, 但尚未调用 send() 方法
- 2: 已发送, 调用 send() 方法后, 但尚未接收响应
- 3: 正在接收响应, 响应的Headers 和状态码已经返回, 但尚未接收完响应体
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

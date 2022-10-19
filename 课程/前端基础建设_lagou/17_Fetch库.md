### 一个请求库需要考虑哪些能力

一个请求，纵向向前承载了数据的发送，向后链接了数据的接收和消费，横向还需要处理网络环境和宿主能力，以及业务的扩展需求。

### 适配浏览器 or Node.js 环境

Node.js 基于 V8 JavaScript Engine，顶层对象是 global，不存在 Window 对象和浏览器宿主, 因此使用传统的 XMLHttpRequest/Fetch 在 Node.js 上发送请求是行不通的

### XHR or Fetch

1. `XMLHttpRequest` 发送请求
   - 配置和使用方式较为烦琐
   - 基于事件的异步模型不够友好

```js
function success() {
  var data = JSON.parse(this.responseText);
  console.log(data);
}

function error() {
  console.log("Error Occurred", err);
}

var xhr = new XMLHttpRequest();
xhr.onload = success;
xhr.onerror = error;
xhr.open("GET", "https://xxx");
xhr.send();
```

2. Fetch 发送请求
   - Fetch 基于 Promise，语法更加简洁，语义化更加突出
   - 兼容性不如 XMLHttpRequest。

```js
fetch("https://xxx")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

### 功能设计与抽象粒度

对于请求库来说，是否要处理以下看似通用，但又具有定制性的功能呢？你需要考虑以下功能点：

- 自定义 headers 添加
- 统一断网/弱网处理
- 接口缓存处理
- 接口统一错误提示
- 接口统一数据处理
- 统一数据层结合
- 统一请求埋点

设计问题如果初期不考虑清楚，那么在业务层面，一旦真正使用了设计不良的请求库，很容易遇到不满足业务需求的场景，而沦为手写 Fetch

合理的设计是，底层部分保留对全局封装的影响范围，而项目层保留对页面层的影响能力，页面层保留对组件层的影响能力。

### axios 设计之美

- 在浏览器端，使用 XMLHttpRequest 发送请求；
- 支持 Node.js 端发送请求
- 支持 Promise API，使用 Promise 风格语法；
- 支持请求和响应拦截
- 支持自定义修改请求和返回内容
- 支持请求取消
- 默认支持 XSRF 防御

### 拦截器思想

**它赋予了分层开发时借助拦截行为，注入自定义能力的功能** 简单来说，axios 的拦截器主要由：任务注册 → 任务编排 → 任务调度（执行）三步组成。

1. 任务注册,

```js
// 在请求发出前, 使用 `axios.interceptors.request.use` 方法注入拦截逻辑
axios.interceptors.request.use(
  function (config) {
    // 请求发送前做一些事情，比如添加 headers
    return config;
  },
  function (error) {
    // 请求出现错误时，处理逻辑
    return Promise.reject(error);
  }
);

// 在请求返回后，用 axios.interceptors.response.use` 方法注入拦截逻辑
axios.interceptors.response.use(
  function (response) {
    // 响应返回 2xx 时，做一些操作，比如响应状态码为 401 时，自动跳转到登录页

    return response;
  },
  function (error) {
    // 响应返回 2xx 外响应码时，错误处理逻辑

    return Promise.reject(error);
  }
);
```

2. 注册了任务，我们再来看看任务编排时是如何将拦截器串联起来，并在任务调度阶段执行各个拦截器的

```js
// lib/core/Axios.js

Axios.prototype.request = function request(config) {
  config = mergeConfig(this.defaults, config);

  // ...

  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  // 任务编排
  this.interceptors.request.forEach(function unshiftRequestInterceptors(
    interceptor
  ) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(
    interceptor
  ) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  // 任务调度
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// 过chain数组来编排调度任务，dispatchRequest方法实际执行请求的发送，编排过程实现：在实际发送请求的方法dispatchRequest前插入请求拦截器，在dispatchRequest方法后，插入响应拦截器。
```

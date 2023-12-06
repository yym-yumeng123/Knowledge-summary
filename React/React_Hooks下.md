设计一个 API 去做对话框的全局管理。假设我们将这个对话框的实现命名为 NiceModal，那么我们的目标就是能够用以下的方式去操作对话框

```js
// 通过 create API 创建一个对话框，主要为了能够全局的控制对话框的展现
const UserInfoModal = NiceModal.create("user-info-modal", RealUserInfoModal)

// 创建一个 useNiceModal 这样的 Hook，用于获取某个 id 的对话框的操作对象
const modal = useNiceModal("user-info-modal")
// 通过 modal.show 显示一个对话框，并能够给它传递参数
modal.show(args)
// 通过 modal.hide 关闭对话框
modal.hide()
```

实现: 以 Redux 为例，来创建一个可以处理所有对话框状态的 reducer

```js
const modalReducer = (state = { hiding: {} }, action) => {
  switch (action.type) {
    case "nice-modal/show":
      const { modalId, args } = action.payload;
      return {
        ...state,
        // 如果存在 modalId 对应的状态，就显示这个对话框
        [modalId]: args || true,
        // 定义一个 hiding 状态用于处理对话框关闭动画
        hiding: {
          ...state.hiding,
          [modalId]: false,
        },
      };
    case "nice-modal/hide":
     const { modalId, force } = action.payload;
      // 只有 force 时才真正移除对话框
      return action.payload.force
        ? {
            ...state,
            [modalId]: false,
            hiding: { [modalId]: false },
          }
        : { ...state, hiding: { [.modalId]: true } };
    default:
      return state;
  }
};
```

定义一个 useNiceModal 这样的 Hook，在其内部封装对 Store 的操作，从而实现对话框状态管理的逻辑重用

```js
// 使用 action creator 来创建显示和隐藏对话框的 action
function showModal(modalId, args) {
  return {
    type: "nice-modal/show",
    payload: {
      modalId,
      args,
    },
  }
}

function hideModal(modalId, force) {
  return {
    type: "nice-modal/hide",
    payload: {
      modalId,
      force,
    },
  }
}

// 创建自定义 Hook 用于处理对话框逻辑
export const useNiceModal = (modalId) => {
  const dispatch = useDispatch()
  // 封装 Redux action 用于显示对话框
  const show = useCallback(
    (args) => {
      dispatch(showModal(modalId, args))
    },
    [dispatch, modalId]
  )
  // 封装 Redux action 用于隐藏对话框
  const hide = useCallback(
    (force) => {
      dispatch(hideModal(modalId, force))
    },
    [dispatch, modalId]
  )

  const args = useSelector((s) => s[modalId])
  const hiding = useSelector((s) => s.hiding[modalId])

  // 只要有参数就认为对话框应该显示，如果没有传递 args，在reducer 中会使用
  // 默认值 true
  return { args, hiding, visible: !!args, show, hide }
}
```

实现 NiceModal 这样一个组件，去封装通用的对话框操作逻辑。比如关闭按钮，确定按钮的事件处理，等等。为了方便演示，我们以 Ant Design 中的 Modal 组件为例

```js
function NiceModal({ id, children, ...rest }) {
  const modal = useNiceModal(id)
  return (
    <Modal
      onCancel={() => modal.hide()} // 默认点击 cancel 时关闭对话框
      onOk={() => modal.hide()} // 默认点击确定关闭对话框
      afterClose={() => modal.hide(true)} // 动画完成后真正关闭
      visible={!modal.hiding}
      {...rest} // 允许在使用 NiceModal 时透传参数给实际的 Modal
    >
      {children}
    </Modal>
  )
}
```

容器模式，它会在对话框不可见时直接返回 null，从而不渲染任何内容；并且确保即使页面上定义了 100 个对话框，也不会影响性能：

```js
export const createNiceModal = (modalId, Comp) => {
  return (props) => {
    const { visible, args } = useNiceModal(modalId)
    if (!visible) return null
    return <Comp {...args} {...props} />
  }
}
```

使用

```js
import { Button } from "antd"
import NiceModal, { createNiceModal, useNiceModal } from "./NiceModal"

const MyModal = createNiceModal("my-modal", () => {
  return (
    <NiceModal id='my-modal' title='Nice Modal'>
      Hello NiceModal!
    </NiceModal>
  )
})

function MyModalExample() {
  const modal = useNiceModal("my-modal")
  return (
    <>
      <Button type='primary' onClick={() => modal.show()}>
        Show Modal
      </Button>
      <MyModal />
    </>
  )
}
```

应该如何让调用者获得返回值呢？

```js
const modal = useNiceModal("my-modal")
// 实现一个 promise API 来处理返回值
modal.show(args).then((result) => {})
```

```js
// 使用一个 object 缓存 promise 的 resolve 回调函数
const modalCallbacks = {}
export const useNiceModal = (modalId) => {
  const dispatch = useDispatch()
  const show = useCallback(
    (args) => {
      return new Promise((resolve) => {
        // 显示对话框时，返回 promise 并且将 resolve 方法临时存起来
        modalCallbacks[modalId] = resolve
        dispatch(showModal(modalId, args))
      })
    },
    [dispatch, modalId]
  )
  const resolve = useCallback(
    (args) => {
      if (modalCallbacks[modalId]) {
        // 如果存在 resolve 回调函数，那么就调用
        modalCallbacks[modalId](args)
        // 确保只能 resolve 一次
        delete modalCallbacks[modalId]
      }
    },
    [modalId]
  )

  // 其它逻辑...

  // 将 resolve 也作为返回值的一部分
  return { show, hide, resolve, visible, hiding }
}
```

### Service Worker

使用 service worker 缓存前端资源, 提供了拦截前端请求的能力，使得它能够结合 Local Storage，成为一个独立的缓存方案

```js
// Service Worker 会拦截所有浏览器发送出来的请求，你可以通过代码去控制 Rest API 这些请求发送到服务器；
// 而 JS、CSS 等静态资源，则通过 Cache Storage 存储在浏览器端
requset => Service Worker => js, css => local storage
requset => Service Worker => Rest Api => server
```

- 缓存永远不会过期
- 永远不会访问过期的资源

Service Worker 是一段独立于页面之外的 JavaScript 脚本，它并不在 Web 页面中运行，但是会在 Web 页面加载时，由一段代码去触发注册、下载和激活。一旦安装完成之后，Service Worker 就会拦截所有当前域名下的所有请求，由代码逻辑决定应该如何处理

**注册 Service Worker**

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => {
      // 注册成功
      console.log('Service worker registered.');
    }, (err) => {
      // 注册失败
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
```

**在 Service Worker 安装之后初始化缓存机制**

在 Service Worker 的实现代码被下载和执行后，会触发安装完成的事件，这个时候，你就可以在 sw.js 里监听这个事件，从而初始化自己的缓存机制。

```js
// sw.js
// 如何在安装事件中配置 Cache Storage：
const cacheName = "my_app_cache"
// 在 sw.js 中监听安装完成事件
self.addEventListener("install", function (e) {
  console.log("Service worker installed.")
  // 初始化 Cache Storage
  const cacheOpenPromise = caches.open(cacheName)
  // 安装过程中，等待 Cache Storage 配置完成
  e.waitUntil(cacheOpenPromise)
})
```

Cache Storage 也是浏览器提供的一种缓存机制，专门用于缓存一个请求的 request 和 response 的配对关系。此外，它还提供了 API，用来判断某个 request 是不是有对应的 response 已经缓存。所以 Cache Storage 也可以认为是专门为 Service Worker 提供的缓存机制。

**拦截请求**

当 Service Worker 安装完成后，接下来就是处于运行状态，能够拦截前端的请求了。你可以通过监听 fetch 事件来处理所有的请求，然后根据请求内容等条件来决定如何处理请求

```js
// sw.js
// 监听所有的请求
self.addEventListener("fetch", function (e) {
  // 如果请求的路径不是 js 结尾，就通过 return false 来告诉
  // service worker 这个请求应该发送到服务器端
  if (!request.url.endsWith(".js")) return false

  // 否则检查 cache 中是否有对应的 response
  const promise = caches.open(cacheName).then((cache) => {
    // 使用 cache.match
    return cache.match(e.request).then((res) => {
      if (res) {
        // 如果缓存存在则直接返回结果
        return Promise.resolve(res)
      } else {
        // 否则发出请求，并存到 cache
        const req = new Request(e.request.url)
        return fetch(corsRequest).then((res) => {
          // 更新 cache
          cache.put(request, res.clone())
          return res
        })
      }
    })
  })
  // 使用 e.respondWith 方法给请求返回内容
  e.respondWith(promise)
})
```

### Webpack

核心思路是将源代码以及图片、样式文件等资源文件都视为模块，然后通过提供对不同类型资源的处理器，将它们进行统一处理，形成最终可在浏览器运行的代码

Webpack 不仅是用于打包最终发布出去的应用程序，而且还能在开发时，为我们提供开发时服务器。它可以通过监测源代码的变化并实时编译，让我们能在代码发生变化时，及时看到运行的效果。

配置分为三个部分

- 输入输出配置：定义你的应用程序的入口，以及打包结果输出的文件夹位置。
- 配置对于每一类资源文件的处理器：比如说，对 JavaScript 是用 babel-loader 去编译；对 less 文件则是用 less-loader 去编译；图片则用 file-loader 去处理。你在项目中能使用哪些技术或者资源，完全取决于配置了哪些 loader。
- 插件配置：除了核心的源代码编译和打包流程，Webpack 还支持插件扩展功能，可以通过插件生成额外的打包结果，或者进行一些其它的处理。比如打包过程生成 index.html，源代码分析报表，提取 CSS 到独立文件，代码压缩，等等。

```js
// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  entry: {
    // 定义应用的入口点 src/app.js，并命名为 main
    main: path.resolve(__dirname, "./src/app.js"),
  },
  output: {
    // 打包输出的文件名，这里将生成 main.bundle.js
    filename: "[name].bundle.js",
    // 定义打包结果的输出位置
    path: path.resolve(__dirname, "build"),
  },
  module: {
    // 定义处理源文件的规则，rules 下会按顺序使用匹配的规则
    rules: [
      {
        // 遇到 .js 结尾的文件则使用这个规则
        test: /\.js$/,
        // 忽略 node_modules 目录下的 js 文件
        exclude: /node_modules/,
        use: {
          // 使用 babel-loader 处理 js
          loader: "babel-loader",
          // babel-loader 的一些选项
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    // 使用 HtmlWebpackPlugin 生成一个 index.html，其中自动引入 js
    // 并配置了页面的 title
    new HtmlWebpackPlugin({
      title: "Webpack Output",
    }),
  ],
}
```

**理解 loader 和 plugin**

为了理解工作机制, 看一个 less 作为 css 预处理器

涉及三个 loader:

- less-loader：用于将 Less 代码转换成 Css
- css-loader：用于处理 Css 中的 import、url 等语句，以便能分析出图片等静态资源打包到最终结果
- style-loader：会自动生成代码，并将打包后的 Css 插入到页面 style 标签。这个 loader 会将 Css 打包到 js 文件中，在应用运行时，自动生成的代码再把这些 css 应用到页面上。

loader 的重要一个机制: `链式调用` 前面一个 loader 的输出结果，可以作为后一个 loader 的输入

- loader 主要用于处理不同类型的资源，将它们转换成模块；
- 而 plugin 通常用于生成一些除了 JavaScript bundle 之外的一些打包结果，比如例子中的 index.html 和 css 文件

### 常用的第三方工具庫

- lodash: 工具函数
  - keyBy，将数组快速转换成对象
  - debounce 函数，实现输入防抖
- UI 库
  - ant design
  - meterial ui
- react-use : 各种的工具 Hooks

### 什么是服务器端的组件

**React17 渐进升级**

所谓渐进升级的支持，就是一个应用可以同时有多个 React 的版本。这样的话，升级 React 的过程可以更为平滑，不用一次性升级整个应用，而是某些新功能可以用新版本的 React，而旧的功能呢，则可以继续使用老版本。

**新的事件模型**

React 17 中，为了支持多版本 React 的共存，React 的事件模型做了一个修改。让我们不需要再通过 Document 去监听事件，而是在 React 组件树的根节点上去监听。这样的话，多个版本的 React 就不会有事件的冲突了。

```js
document html // React17之前 监听 document.addEventListener()
header
div // react17之后, 监听根节点 rootNode.addEventListener()
```

**JSX 编译机制**

在过去，如果我们要在 React 组件中使用 JSX，那么就需要使用 import 语句引入 React。这么做的原因就在于，在编译时 JSX 会被翻译成 React.createElement 这样的 API，所以就需要引入 React。

```js
import React from "react"
function App() {
  return <h1>Hello World</h1>
}

import React from "react"
function App() {
  return React.createElement("h1", null, "Hello world")
}
```

现在，JSX 采用了新的编译机制，因此我们的代码不需要再引入 React 了

```js
function App() {
  return <h1>Hello World</h1>
}

// 由编译器自动引入
import { jsx as _jsx } from "react/jsx-runtime"
function App() {
  return _jsx("h1", { children: "Hello world" })
}
```

**Suspense: 悬停渲染**

Suspense，顾名思义，就是`挂起当前组件的渲染，直到异步操作完成`

React 会将所有的 DOM 变化一次性渲染到浏览器中。这在应用非常复杂的场景下，会成为一个潜在的性能瓶颈。所以 React 就提出了 Suspense 这样一个概念，它允许组件暂时挂起刷新操作，让整个渲染过程可以被切分成一个个独立的部分，从而为优化性能提供了空间

有了 Suspense，异步的请求就不再需要由组件去触发。组件不仅可以作为状态的展现层，同时也能变成异步请求的展现层。

```js
副作用 -> State -> View -> 副作用

state -> view
Async logic -> view
```

```js
// 按照 Suspense 规范提供一个异步请求的视线
function fetchData() {
  let status = "pending"
  let result
  // 发起请求获取数据，返回 suspender 这个 promise
  let suspender = apiClicent.fetch("/topic/1").then(
    (r) => {
      status = "success"
      result = r
    },
    (e) => {
      status = "error"
      result = e
    }
  )
  // 无论何时调用 fetchTopic，都直接返回一个结果
  return {
    readTopic() {
      if (status === "pending") {
        // 如果还在请求中直接抛出一个 promise
        throw suspender
      } else if (status === "error") {
        // 如果请求出错，抛出 error
        throw result
      } else if (status === "success") {
        // 如果请求成功，返回数据
        return result
      }
    },
  }
}

// 如何在 Suspense 中使用这个 API
import React, { Suspense } from "react";
import fetchTopic from './fetchTopic';


const data = fetchData();


function TopicDetail() {
  // 调用了 data.readTopic() 来获取数据
  const topic = data.readTopic();
  // 直接同步的返回了 JSX
  return (
    <div>
      <h1>{topic.title}</h1>
      <p>{topic.content}</p>
    </div>
  )
}


function TopicPage() {
  return (
    <Suspense
      // 提供一个 fallback 的属性，用于渲染加载状态的界面
      fallback={<h1>Loading...</h1>}
    >
      <TopicDetail />
    </Suspense>
  );
```

**Server Component: 服务端 React 组件**

Server Components 最明显的功能，就是能够在组件级别实现服务器端的渲染。也就是说，一个前端页面中，有些组件是客户端渲染的，而有的组件则可以是服务器端渲染的

比如说有这么三个组件，分别是 App.server.js、Article.server.js、Comments.client.js。我们可以通过后缀来区分哪个是 server 端的组件，哪个是 client 端的组件。那么 App.server.js 的示意代码如下所示：

```js
import { Suspense } from 'react';
import Article from 'Article.server.js';
import Comments from 'Comments.client.js';
function App() {
  // 从 URL 获取 articleId
  const articleId = useSearchParams('articleId')
  return (
    <div>
      <Suspense fallback={<>Loading...</>}>
        // Article 组件在服务器端运行，所以在代码中可以直接去读取文件系统、查询数据库等
        <Article id={} />
      </Suspense>
      <Comments articleId={articleId} />
    </div>
  );
}

export default function Article({ articleId}) {
  // 服务器端组件可以直接查询数据库
  const article = db.query(
    `select * from articles where id=${articleId}`
  ).rows[0];

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
}
```

### 复杂状态处理: 如何保持状态一致性

**1: 保证状态最小化**

`在保证 State 完整性的同时，也要保证它的最小化`: 某些数据如果能从已有的 State 中计算得到, 那么我们应该始终在用的时候去计算, 而不是把计算的结果存到某个 State 中, 这样, 才能简化我们的状态处理逻辑

```js
function FilterList({ data }) {
  // 设置关键字的 State
  const [searchKey, setSearchKey] = useState('');
  // 设置最终要展示的数据状态，并用原始数据作为初始值
  const [filtered, setFiltered] = useState(data);

  // 处理用户的搜索关键字
  const handleSearch = useCallback(evt => {
    setSearchKey(evt.target.value);
    setFiltered(data.filter(item => {
      return item.title.includes(evt.target.value)));
    }));
  }, [filtered])
  return (
    <div>
      <input value={searchKey} onChange={handleSearch} />
      {/* 根据 filtered 数据渲染 UI */}
    </div>
  );
}

// 一致性, 根据 data 关键字, 来缓存 filter 的值
function FilterList({ data }) {
  const [searchKey, setSearchKey] = useState("");

  // 每当 searchKey 或者 data 变化的时候，重新计算最终结果
  const filtered = useMemo(() => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchKey.toLowerCase())
    );
  }, [searchKey, data]);

  return (
    <div className="08-filter-list">
      <h2>Movies</h2>
      <input
        value={searchKey}
        placeholder="Search..."
        onChange={(evt) => setSearchKey(evt.target.value)}
      />
      <ul style={{ marginTop: 20 }}>
        {filtered.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

**2. 避免中间状态, 确保唯一数据源**

在有的场景下，特别是原始状态数据来自某个外部数据源，而`非 state 或者 props` 的时候，冗余状态就没那么明显。这时候你就需要准确定位状态的数据源究竟是什么，并且在开发中确保它始终是唯一的数据源，以此避免定义中间状态

### 异步处理: 如何向服务器发送请求

1. 实现自己的 API Client

无论大小项目，在开始实现第一个请求的时候，通常我们要做的第一件事应该都是创建一个自己的 `API Client`，之后所有的请求都会通过这个 Client 发出去。而`不是上来就用 fetch 或者是 axios 去直接发起请求`，因为那会造成大量的重复代码

可以对你需要连接的服务端做一些通用的配置和处理，比如 Token、URL、错误处理等等

- 通用的 Header, 比如: `Authorization Token`
- 服务器地址的配置
- 请求未认证, 错误处理等

```js
import axios from "axios"

// 定义相关的 endpoint
const endPoints = {
  test: "https://api.io/",
  prod: "https://prod.myapi.io/",
  staging: "https://staging.myapi.io/",
}

// 创建 axios 的实例
const instance = axios.create({
  // 实际项目中根据当前环境设置 baseURL
  baseURL: endPoints.test,
  timeout: 30000,
  // 为所有请求设置通用的 header
  headers: { Authorization: "Bear mytoken" },
})

// 听过 axios 定义拦截器预处理所有请求
instance.interceptors.response.use(
  (res) => {
    // 可以假如请求成功的逻辑，比如 log
    return res
  },
  (err) => {
    if (err.response.status === 403) {
      // 统一处理未授权请求，跳转到登录界面
      document.location = "/login"
    }
    return Promise.reject(err)
  }
)

export default instance
```

2. 使用 Hooks 思考异步请求, 封装远程资源

- Data: 请求成功后的数据
- Error: 请求失败, 错误信息
- Pending: loading

上面三个状态, 我们可以在 UI 上做一些处理, 写一个 Hook

```js
import { useState, useEffect } from "react"
import apiClient from "./apiClient"

// 将获取文章的 API 封装成一个远程资源 Hook
const useArticle = (id) => {
  // 设置三个状态分别存储 data, error, loading
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    // 重新获取数据时重置三个状态
    setLoading(true)
    setData(null)
    setError(null)
    apiClient
      .get(`/posts/${id}`)
      .then((res) => {
        // 请求成功时设置返回数据到状态
        setLoading(false)
        setData(res.data)
      })
      .catch((err) => {
        // 请求失败时设置错误状态
        setLoading(false)
        setError(err)
      })
  }, [id]) // 当 id 变化时重新获取数据

  // 将三个状态作为 Hook 的返回值
  return {
    loading,
    error,
    data,
  }
}
```

### 多个 API 调用, 如何处理并发或串行请求?

例如: 需要显示作者、作者头像，以及文章的评论列表, 需要发送三个请求 `GetAvatar GetAuthor GetComments`

`Promise.all([fetch1, fetch2])` 传统思路, React 函数组件是一个同步的函数, 没法直接使用 `await`, 而是要把请求通过副作用去触发

从状态变化的角度去组织异步调用, 通过`不同的状态组合`，来实现异步请求的逻辑

```js
import { useState, useEffect } from "react"
import apiClient from "./apiClient"

export default (id) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    // 当 id 不存在，直接返回，不发送请求
    if (!id) return
    setLoading(true)
    setData(null)
    setError(null)
    apiClient
      .get(`/users/${id}`)
      .then((res) => {
        setLoading(false)
        setData(res.data)
      })
      .catch((err) => {
        setLoading(false)
        setError(err)
      })
  }, [id])
  return {
    loading,
    error,
    data,
  }
}

import useArticle from "./useArticle"
import useUser from "./useUser"
import useComments from "./useComments"

const ArticleView = ({ id }) => {
  // article comments 并行
  const { data: article, loading, error } = useArticle(id)
  const { data: comments } = useComments(id)
  // 串行的请求
  const { data: user } = useUser(article?.userId)
  if (error) return "Failed."
  if (!article || loading) return "Loading..."
  return (
    <div className='exp-09-article-view'>
      <h1>
        {id}. {article.title}
      </h1>
      {user && (
        <div className='user-info'>
          <img src={user.avatar} height='40px' alt='user' />
          <div>{user.name}</div>
          <div>{article.createdAt}</div>
        </div>
      )}
      <p>{article.content}</p>
      <CommentList data={comments || []} />
    </div>
  )
}
```

### 函数组件设计模式：如何应对复杂条件渲染场景？

1. 容器模式: 实现按条件执行 Hooks

Hooks 必须在顶层作用域调用，而不能放在条件判断、循环等语句中，同时也不能在可能的 return 语句之后执行。换句话说，Hooks 必须按顺序被执行到。

但假如我们希望实现一下 Modal, 像下面代码会报错

```js
import { Modal } from "antd"
import useUser from "useUser"

function UserInfoModal({ visible, userId, ...rest }) {
  // 当 visible 为 false 时，不渲染任何内容
  if (!visible) return null
  // 这一行 Hook 在可能的 return 之后，会报错！
  const { data, loading, error } = useUser(userId)

  return (
    <Modal visible={visible} {...rest}>
      {/* 对话框的内容 */}
    </Modal>
  )
}
```

我们可以使用容器模式: 把条件判断的结果放到两个组件之中，确保真正 render UI 的组件收到的所有属性都是有值的

```js
// 定义一个容器组件用于封装真正的 UserInfoModal
export default function UserInfoModalWrapper({
  visible,
  ...rest // 使用 rest 获取除了 visible 之外的属性
}) {
  // 如果对话框不显示，则不 render 任何内容
  if (!visible) return null
  // 否则真正执行对话框的组件逻辑
  return <UserInfoModal visible {...rest} />
}
```

把判断条件放到 Hooks 中去

```js
const ArticleView = ({ id }) => {
  const { data: article, loading } = useArticle(id)
  let user = null
  // Hook 不能放到条件语句中，那我们应该如何做呢
  if (article?.userId) user = useUser(article?.userId).data
  // 组件其它逻辑
}

function useUser(id) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    // 当 id 不存在，直接返回，不发送请求
    if (!id) return
    // 获取用户信息的逻辑
  })
}
```

2. render props 模式重用 UI 逻辑

`render props` 就是把一个 render 函数作为属性传递给某个组件，由这个组件去执行这个函数从而 render 实际的内容。

在 Class 组件时期，render props 和 HOC（高阶组件）两种模式可以说是进行逻辑重用的两把利器，但是实际上，HOC 的所有场景几乎都可以用 render props 来实现。可以说，Hooks 是逻辑重用的第一选择。

举例演示: 计数器, 演示纯数据逻辑的重用, 就是重用的业务逻辑自己不产生任何 UI

```js
import { useState, useCallback } from "react"

//  把计数逻辑封装到一个自己不 render 任何 UI 的组件中
function CounterRenderProps({ children }) {
  const [count, setCount] = useState(0)
  const increment = useCallback(() => {
    setCount(count + 1)
  }, [count])
  const decrement = useCallback(() => {
    setCount(count - 1)
  }, [count])

  return children({ count, increment, decrement })
}

function CounterRenderPropsExample() {
  return (
    // children 这个特殊属性。也就是组件开始 tag 和结束 tag 之间的内容，其实是会作为 children 属性传递给组件
    <CounterRenderProps>
      {({ count, increment, decrement }) => {
        return (
          <div>
            <button onClick={decrement}>-</button>
            <span>{count}</span>
            <button onClick={increment}>+</button>
          </div>
        )
      }}
    </CounterRenderProps>
  )
}
```

在上面这种场景下, Hooks 更方便

```js
import { useState, useCallback } from "react"

function useCounter() {
  // 定义 count 这个 state 用于保存当前数值
  const [count, setCount] = useState(0)
  // 实现加 1 的操作
  const increment = useCallback(() => setCount(count + 1), [count])
  // 实现减 1 的操作
  const decrement = useCallback(() => setCount(count - 1), [count])

  // 将业务逻辑的操作 export 出去供调用者使用
  return { count, increment, decrement }
}
```

### 事件处理: 如何创建自定义事件

1. React 中使用原生事件: 约定使用骆驼体 (onMouseOver, onChange) 等
2. React 原生事件的原理: 合成事件 由于虚拟 DOM 的存在, 在 React 绑定一个事件到原生的 DOM 节点, 事件也不会绑定在对应的节点上, 而是所有的事件都绑定在根节点上. 然后由 React 统一监听和管理, 代理模式, 分发到具体的虚拟 DOM 上
3. React17 版本前: 绑定在 document, 之后, 绑定在整个 App 上的根节点上
   - 虚拟 DOM render 的时候, DOM 可能还没有真实的 render 到页面上, 所以无法绑定事件
   - React 屏蔽底层事件的细节, 避免浏览器兼容问题

**创建自定义事件**

- 原生事件是浏览器机制
- 自定义事件是组件自己的行为, 本质是一种回调机制
  - 通过 `props 给组件传递一个回调函数`，然后在组件中的某个时机，比如用户输入，或者某个请求完成时，去调用这个传过来的回调函数就可以了
  - 习惯上以 `onSomething` 命名

```jsx
import { useState } from "react"

// 创建一个无状态的受控组件
function ToggleButton({ value, onChange }) {
  const handleClick = () => {
    onChange(!value)
  }
  return (
    <button style={{ width: "60px" }} onClick={handleClick}>
      按钮
    </button>
  )
}
```

**Hooks 封装键盘事件**

```js
import { useEffect, useState } from "react"

// 使用 document.body 作为默认的监听节点
const useKeyPress = (domNode = document.body) => {
  const [key, setKey] = useState(null)
  useEffect(() => {
    const handleKeyPress = (evt) => {
      setKey(evt.keyCode)
    }
    // 监听按键事件
    domNode.addEventListener("keypress", handleKeyPress)
    return () => {
      // 接触监听按键事件
      domNode.removeEventListener("keypress", handleKeyPress)
    }
  }, [domNode])
  return key
}
```

### Form: Hooks 给 Form 处理带来的那些新变化

1. 受控组件 和 非受控组件

```js
function MyForm() {
  const [value, setValue] = useState("")
  const handleChange = useCallback((evt) => {
    setValue(evt.target.value)
  }, [])
  // React 统一了表单组件的 onChange 事件
  return <input value={value} onChange={handleChange} />
}
```

```js
// 非受控组件 表单元素的值不是由父组件决定的，而是完全内部的状态
import { useRef } from "react"

export default function MyForm() {
  // 定义一个 ref 用于保存 input 节点的引用
  const inputRef = useRef()
  const handleSubmit = (evt) => {
    evt.preventDefault()
    // 使用的时候直接从 input 节点获取值
    alert("Name: " + inputRef.current.value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type='text' ref={inputRef} />
      </label>
      <input type='submit' value='Submit' />
    </form>
  )
}
```

2. 使用 Hooks 简化表单处理

我们对每一个表单元素, 都是遵循这样处理

- 设置一个 state 绑定 value
- 监听表单元素的 onChange 事件, 同步 value 到 state

维护表单组件的状态逻辑: 核心

- 字段的名字
- 绑定 value 值
- 处理 onChange 事件

```js
import { useState, useCallback } from "react"

const useForm = (initialValues = {}) => {
  // 设置整个 form 的状态：values
  const [values, setValues] = useState(initialValues)

  // 提供一个方法用于设置 form 上的某个字段的值
  const setFieldValue = useCallback((name, value) => {
    setValues((values) => ({
      ...values,
      [name]: value,
    }))
  }, [])

  // 返回整个 form 的值以及设置值的方法
  return { values, setFieldValue }
}

;<input
  value={values.email || null}
  onChange={(evt) => setFieldValue("email", evt.target.value)}
/>
```

3. 处理表单验证

- 如何定义这样的错误状态
- 如何设置这个错误状态

```js
// 除了初始值之外，还提供了一个 validators 对象，
// 用于提供针对某个字段的验证函数
const useForm = (initialValues = {}, validators) => {
  const [values, setValues] = useState(initialValues)
  // 定义了 errors 状态
  const [errors, setErrors] = useState({})

  const setFieldValue = useCallback(
    (name, value) => {
      setValues((values) => ({
        ...values,
        [name]: value,
      }))

      // 如果存在验证函数，则调用验证用户输入
      if (validators[name]) {
        const errMsg = validators[name](value)
        setErrors((errors) => ({
          ...errors,
          // 如果返回错误信息，则将其设置到 errors 状态，否则清空错误状态
          [name]: errMsg || null,
        }))
      }
    },
    [validators]
  )
  // 将 errors 状态也返回给调用者
  return { values, errors, setFieldValue }
}
```

```js
function MyForm() {
  // 用 useMemo 缓存 validators 对象
  const validators = useMemo(() => {
    return {
      name: (value) => {
        // 要求 name 的长度不得小于 2
        if (value.length < 2) return "Name length should be no less than 2."
        return null
      },
      email: (value) => {
        // 简单的实现一个 email 验证逻辑：必须包含 @ 符号。
        if (!value.includes("@")) return "Invalid email address"
        return null
      },
    }
  }, [])
  // 从 useForm 的返回值获取 errors 状态
  const { values, errors, setFieldValue } = useForm({}, validators)
  // UI 渲染逻辑...
}
```

### 路由管理

路由管理，就是让你的页面能够根据 URL 的变化进行页面的切换，这是前端应用中一个非常重要的机制

URL 的全称是 _Uniform Resource Locator_，中文意思是“统一资源定位符”，表明 URL 是用于唯一的定位某个资源的

1. 路由工作原理

在前端路由管理中，则一般只在主内容区域 Content 部分变化， Header 和 Sider 是不会变化的。

实现路由机制的核心逻辑就是根据 URL 路径这个状态，来决定在主内容区域显示什么组件, 示意代码

```js
const MyRouter = ({ children }) => {
  const routes = _.keyBy(
    children.map((c) => c.props),
    "path"
  )
  const [hash] = useHash()
  // 通过 URL 中的 hash，也就是“#”后面的部分来决定具体渲染哪个组件到主区域
  const Page = routes[hash.replace("#", "")]?.component
  // 如果路由不存在就返回 Not found.
  return Page ? <Page /> : "Not found."
}

// 定义了一个空组件 Route，来接收路由的具体参数 path 和 component，从而以声明式的方式去定义路由
const Route = () => null
```

```js
function SamplePages {
  return (
    <div className="sample-pages">
      {/* 定义了侧边导航栏 */}
      <div className="sider">
        <a href="#page1">Page 1</a>
        <a href="#page2">Page 2</a>
        <a href="#page3">Page 3</a>
        <a href="#page4">Page 4</a>
      </div>
      <div className="exp-15-page-container">
        {/* 定义路由配置 */}
        <MyRouter>
          <Route path="page1" component={Page1} />
          <Route path="page2" component={Page2} />
          <Route path="page3" component={Page3} />
          <Route path="page4" component={Page4} />
        </MyRouter>
      </div>
    </>
  );
};

```

### 按需加载

import 语句，定义按需加载的起始模块

按需加载，就是指在某个组件需要被渲染到页面时，才会去实际地下载这个页面，以及这个页面依赖的所有代码

```js
// return promise
import(someModule)

// 演示使用 import 语句
function ProfilePage() {
  // 定义一个 state 用于存放需要加载的组件
  const [RealPage, setRealPage] = useState(null)

  // 根据路径动态加载真正的组件实现
  import("./RealProfilePage").then((comp) => {
    setRealPage(Comp)
  })
  // 如果组件未加载则显示 Loading 状态
  if (!RealPage) return "Loading...."

  // 组件加载成功后则将其渲染到界面
  return <RealPage />
}
```


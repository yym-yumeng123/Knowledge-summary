> React 函数组件中, 每一次 UI 的变化, 都是通过执行整个函数来完成的

### Hooks 优点

- 逻辑复用
- 关注点分离

### Hooks 使用规则

- 只能在函数组件的顶级作用域使用
  - Hooks 不能在 循环 条件判断 嵌套函数内执行, 必须是顶层
  - 按顺序被执行
- 只能在函数组件或其它 Hooks 中使用
  - 函数组件
  - 自定义 Hooks

### useState 函数有维持状态的能力

state 永远不要保存可以`通过计算得到值`, 容易造成一致性问题

- 从 props 传递过来的值
- 从 URL 中读取的值
- 从 cookie, localStorage 中读取的值

```jsx
import React, { useState } from "react"

function Example() {
  // 创建一个保存 count 的 state，并给初始值 0
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
```

### useEffect 执行副作用

useEffect 是每次组件 render 完后判断依赖并执行

```js
// 第一个为要执行的函数 callback，第二个是可选的依赖项数组 dependencies
useEffect(callback, dependencies?)

// 没有依赖项
useEffect(() => {
  // 每次 render 完一定执行
  console.log('re-rendered');
});

// 空数组作为依赖项，则只在首次执行时触发
useEffect(() => {
  // 组件首次渲染时执行，等价于 class 组件中的 componentDidMount
  console.log('did mount');
}, [])
```

### useCallback 缓存回调函数

```jsx
function Counter() {
  const [count, setCount] = useState(0)
  // 在多次渲染之间，是无法重用 handleIncrement 这个函数的，而是每次都需要创建一个新的
  // 包含了 count 这个变量的闭包
  const handleIncrement = () => setCount(count + 1)
  // ...
  return <button onClick={handleIncrement}>+</button>
}
```

```js
// fn 定义回调函数
// deps 依赖的变量数组, 某个依赖变化时, 才回重新声明 fn 这个回调
useCallback(fn, deps)
```

```jsx
import React, { useState, useCallback } from "react"

function Counter() {
  const [count, setCount] = useState(0)
  // 只有当 count 发生变化时，我们才需要重新定一个回调函数
  const handleIncrement = useCallback(() => setCount(count + 1), [count])
  // ...
  return <button onClick={handleIncrement}>+</button>
}
```

### useMemo 缓存计算结果

如果某个数据是通过其它数据计算得到的，那么只有当用到的数据，也就是依赖的数据发生变化的时候，才应该需要重新计算

- 避免重新计算
- 避免子组件重复渲染

```jsx
// fn 产生所需数据的一个计算函数
// 通常来说，fn 会使用  deps 中声明的一些变量来生成一个结果，用来渲染出最终的 UI
useMemo(fn, deps)
```

```jsx
//...
// 使用 userMemo 缓存计算的结果
const usersToShow = useMemo(() => {
    if (!users) return null;
    return users.data.filter((user) => {
      return user.first_name.includes(searchKey));
    }
  }, [users, searchKey]);
```

useCallback 的功能其实是可以用 useMemo 来实现的

```jsx
const myEventHandler = useMemo(() => {
  // 返回一个函数作为缓存结果
  return () => {
    // 在这里进行事件处理
  }
}, [dep1, dep2])
```

### useRef 在多次渲染之间共享数据

- useRef 保存的数据一般是和 UI 的渲染无关的，因此当 ref 的值发生变化时，是不会触发组件的重新渲染的
- 保存某个 DOM 节点的引用
  - 结合 React 的 ref 属性和 useRef 这个 Hook

```js
const myRefContainer = useRef(initialValue)
```

```js
import React, { useState, useCallback, useRef } from "react"

export default function Timer() {
  // 定义 time state 用于保存计时的累积时间
  const [time, setTime] = useState(0)

  // 定义 timer 这样一个容器用于在跨组件渲染之间保存一个变量
  const timer = useRef(null)

  // 开始计时的事件处理函数
  const handleStart = useCallback(() => {
    // 使用 current 属性设置 ref 的值
    timer.current = window.setInterval(() => {
      setTime((time) => time + 1)
    }, 100)
  }, [])

  // 暂停计时的事件处理函数
  const handlePause = useCallback(() => {
    // 使用 clearInterval 来停止计时
    window.clearInterval(timer.current)
    timer.current = null
  }, [])

  return (
    <div>
      {time / 10} seconds.
      <br />
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  )
}
```

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null)
  const onButtonClick = () => {
    // current 属性指向了真实的 input 这个 DOM 节点，从而可以调用 focus 方法
    inputEl.current.focus()
  }
  return (
    <>
      <input ref={inputEl} type='text' />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  )
}
```

### useContext 定义全局状态

Context 提供了一个方便在多个组件之间共享数据的机制

```js
// 1. 先创建一个上下文
const MyContext = React.createContext(initialValue);


// 2. Context.Provider 作为根组件
// 创建一个 Theme 的 Context
const ThemeContext = React.createContext(themes.light);
function App() {
  // 整个应用使用 ThemeContext.Provider 作为根组件
  return (
    // 使用 themes.dark 作为当前 Context 
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3. 消费上下文
const value = useContext(MyContext);
```

从一种数据变成另一种数据, 就是状态 (state), 状态是数据的变化

```js
const [state, setState] = useState(0)
setState(1)
setState((prevState) => prevState + 1)
```

`useLayoutEffect` 和 `useEffect` 类似，但是 `useLayoutEffect` 会在浏览器 DOM 更新之后，在浏览器绘制之前执行，而 `useEffect` 会在浏览器 DOM 更新之后，在浏览器绘制之后执行

1. js 执行和渲染是阻塞的: js 执行 -> 渲染 -> js 执行
2. useEffect 的 effect 函数会在操作 dom 之后异步执行,

`useReducer`

```tsx
// Reducer<数据类型, action 类型>
import { Reducer, useReducer } from "react"

interface Data {
  result: number
}

interface Action {
  type: "add" | "minus"
  num: number
}
function reducer(state: Data, action: Action) {
  switch (action.type) {
    case "add":
      return {
        result: state.result + action.num,
      }
    case "minus":
      return {
        result: state.result - action.num,
      }
  }
  return state
}

function App() {
  // 第一个参数 reducer 函数, 第二个参数初始值
  const [res, dispatch] = useReducer<Reducer<Data, Action>>(reducer, {
    result: 0,
  })
  return (
    <div>
      <div onClick={() => dispatch({ type: "add", num: 2 })}>加</div>
      <div onClick={() => dispatch({ type: "minus", num: 1 })}>减</div>
      <div>{res.result}</div>
    </div>
  )
}
export default App
```

复杂对象的修改就要用 immutable 相关的库了 `npm install --save immer`

**在 react 里，只要涉及到 state 的修改，就必须返回新的对象，不管是 useState 还是 useReducer。**

`useRef` 保存 DOM 的引用, 不会触发渲染, 用来存一些不是用于渲染的内容

```tsx
import { useEffect, useRef } from "react"

function App() {
  // 类型参数是保存的内容的类型
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // 内容是保存在 current 属性上的
    inputRef.current?.focus()
  })

  return (
    <div>
      <input ref={inputRef}></input>
    </div>
  )
}

export default App
```

`forwardRef + useImperativeHandle`

如果是想从子组件传递 ref 到父组件，就需要 `forwardRef` 了，也就是把组件内的 ref 转发一下

```tsx
// 第一个类型参数是 ref 的 content 的类型，第二个类型参数是 props 的类型
import React, { useRef, useEffect, useImperativeHandle } from "react"

interface RefProps {
  aaa: () => void
}

const Guang: React.ForwardRefRenderFunction<RefProps> = (props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // useImperativeHandle 可以把子组件的 ref 转发给父组件
  // 第一个是传入的 ref，第二个是是返回新的 ref 值的函数, 第三个是依赖的数组
  useImperativeHandle(
    ref,
    () => {
      return {
        aaa() {
          inputRef.current?.focus()
        },
      }
    },
    [inputRef]
  )

  return (
    <div>
      <input ref={inputRef}></input>
    </div>
  )
}

const WrapedGuang = React.forwardRef(Guang)

function App() {
  const ref = useRef<RefProps>(null)

  useEffect(() => {
    console.log("ref", ref.current)
    ref.current?.aaa()
  }, [])

  return (
    <div className='App'>
      <WrapedGuang ref={ref} />
    </div>
  )
}

export default App
```

`useContext` 跨任意层组件传递数据，我们一般用 Context。
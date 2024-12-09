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

**用 createContext 创建 context 对象，用 Provider 修改其中的值， function 组件使用 useContext 的 hook 来取值，class 组件使用 Consumer 来取值**

```jsx
import { createContext, useContext } from "react"

const countContext = createContext(111)

function Aaa() {
  return (
    <div>
      <countContext.Provider value={222}>
        <Bbb></Bbb>
      </countContext.Provider>
    </div>
  )
}

function Bbb() {
  return (
    <div>
      <Ccc></Ccc>
    </div>
  )
}

function Ccc() {
  const count = useContext(countContext)
  return <h2>context 的值为：{count}</h2>
}

export default Aaa
```

`memo useMemo useCallback`

memo 是一个高阶组件，用于缓存组件的渲染结果，避免组件重复渲染，减少组件的渲染次数，提高性能。

```jsx
import { memo, useEffect, useState } from "react"

function Aaa() {
  const [, setNum] = useState(1)

  useEffect(() => {
    setInterval(() => {
      setNum(Math.random())
    }, 2000)
  }, [])

  return (
    <div>
      <MemoBbb count={2}></MemoBbb>
    </div>
  )
}

interface BbbProps {
  count: number;
}

function Bbb(props: BbbProps) {
  console.log("bbb render")

  return <h2>{props.count}</h2>
}

// memo 的作用是只有 props 变的时候，才会重新渲染被包裹的组件
const MemoBbb = memo(Bbb)

export default Aaa
```

用 memo 的话，一般还会结合两个 hook：useMemo 和 useCallback

**memo 是防止 props 没变时的重新渲染，useMemo 和 useCallback 是防止 props 的不必要变化**

```js
// 是当 deps 数组不变的时候，始终返回同一个 function，当 deps 变的时候，才把 function 改为新传入的。
const bbbCallback = useCallback(function () {
  // xxx
}, [])
```

同理，useMemo 也是和 memo 打配合的，只不过它保存的不是函数，而是值

```js
// 在 deps 数组变化的时候，计算新的值返回
const count2 = useMemo(() => {
  return count * 10
}, [count])
```

**如果子组件用了 memo，那给它传递的对象、函数类的 props 就需要用 useMemo、useCallback 包裹，否则，每次 props 都会变，memo 就没用了**

**反之，如果 props 使用 useMemo、useCallback，但是子组件没有被 memo 包裹，那也没意义，因为不管 props 变没变都会重新渲染，只是做了无用功。**

memo + useCallback、useMemo 是搭配着来的，少了任何一方，都会使优化失效。

但 useMemo 和 useCallback 也不只是配合 memo 用的, 比如有个值的计算，需要很大的计算量，你不想每次都算，这时候也可以用 useMemo 来缓存。


### 总结

- **useState**：状态是变化的数据，是组件甚至前端应用的核心。useState 有传入值和函数两种参数，返回的 setState 也有传入值和传入函数两种参数。
- **useEffect**：副作用 effect 函数是在渲染之外额外执行的一些逻辑。它是根据第二个参数的依赖数组是否变化来决定是否执行 effect，可以返回一个清理函数，会在下次 effect 执行前执行。
- **useLayoutEffect**：和 useEffect 差不多，但是 useEffect 的 effect 函数是异步执行的，所以可能中间有次渲染，会闪屏，而 useLayoutEffect 则是同步执行的，所以不会闪屏，但如果计算量大可能会导致掉帧。
- **useReducer**：封装一些修改状态的逻辑到 reducer，通过 action 触发，当修改深层对象的时候，创建新对象比较麻烦，可以结合 immer
- **useRef**：可以保存 dom 引用或者其他内容，通过 xxRef.current 来取，改变它的内容不会触发重新渲染
- **forwardRef + useImperativeHandle**：通过 forwardRef 可以从子组件转发 ref 到父组件，如果想自定义 ref 内容可以使用 useImperativeHandle
- **useContext**：跨层组件之间传递数据可以用 Context。用 createContext 创建 context 对象，用 Provider 修改其中的值， function 组件使用 useContext 的 hook 来取值，class 组件使用 Consumer 来取值
- **memo + useMemo + useCallback**：memo 包裹的组件只有在 props 变的时候才会重新渲染，useMemo、useCallback 可以防止 props 不必要的变化，两者一般是结合用。不过当用来缓存计算结果等场景的时候，也可以单独用 useMemo、useCallback
```jsx
import { useEffect, useState } from "react"

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setInterval(() => {
      console.log(count) // 形成了闭包, 每次打印都是 0
      setCount(count + 1)
    }, 1000)
    // useEffect 的依赖数组是 []，也就是只会执行并保留第一次的 function
  }, [])

  return <div>{count}</div>
}

export default App
```

### 解法 1

可以用 setState 的另一种参数; 用 setState 传入函数的方案类似，还可以用 useReducer 来解决

- 每次的 count 都是参数传入的上一次的 state
- 它是 dispatch 一个 action，不直接引用 state，所以也不会形成闭包

```jsx
import { useEffect, useState } from "react"

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setInterval(() => {
      // 并没有形成闭包，每次的 count 都是参数传入的上一次的 state
      setCount((prev) => prev + 1)
    }, 1000)
  }, [])

  return <div>{count}</div>
}

export default App
```

```tsx
import { Reducer, useEffect, useReducer } from "react"

interface Action {
  type: "add" | "minus"
  num: number
}

function reducer(state: number, action: Action) {
  switch (action.type) {
    case "add":
      return state + action.num
    case "minus":
      return state - action.num
  }
  return state
}

function App() {
  const [count, dispatch] = useReducer<Reducer<number, Action>>(reducer, 0)

  useEffect(() => {
    console.log(count)

    setInterval(() => {
      dispatch({ type: "add", num: 1 })
    }, 1000)
  }, [])

  return <div>{count}</div>
}

export default App
```

### 解法 2

有的时候，是必须要用到 state 的，也就是肯定会形成闭包

```jsx
// 这种解法是能解决闭包陷阱的，但在这里并不合适，因为 effect 里跑的是定时器，每次都重新跑定时器，那定时器就不是每 1s 执行一次了。
import { useEffect, useState } from "react"

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(count)

    const timer = setInterval(() => {
      setCount(count + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
    // 依赖数组加上了 count，这样 count 变化的时候重新执行 effect，那执行的函数引用的就是最新的 count 值。
  }, [count])

  return <div>{count}</div>
}

export default App
```

### 解法 3

有定时器不能重新跑 effect 函数，那怎么做呢？ 可以用 useRef

```jsx
import { useEffect, useState, useRef, useLayoutEffect } from "react"

function App() {
  const [count, setCount] = useState(0)

  // useRef 创建 ref 对象，保存执行的函数，每次渲染更新 ref.current 的值为最新函数
  const updateCount = () => {
    setCount(count + 1)
  }
  const ref = useRef(updateCount)

  ref.current = updateCount

  // useEffect 只跑一次，保证 setIntervel 不会重置，是每秒执行一次
  useEffect(() => {
    // 定时器执行的函数里就始终引用的是最新的 count。
    const timer = setInterval(() => ref.current(), 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return <div>{count}</div>
}

export default App
```

封装

```tsx
import { useEffect, useState, useRef } from "react"

function useInterval(fn: Function, time: number) {
  const ref = useRef(fn)

  ref.current = fn

  let cleanUpFnRef = useRef<Function>()

  const clean = useCallback(() => {
    cleanUpFnRef.current?.()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => ref.current(), time)

    cleanUpFnRef.current = () => {
      clearInterval(timer)
    }

    return clean
  }, [])

  return clean
}

function App() {
  const [count, setCount] = useState(0)

  const updateCount = () => {
    setCount(count + 1)
  }

  useInterval(updateCount, 1000)

  return <div>{count}</div>
}

export default App
```


### 总结

闭包陷阱就是 effect 函数等引用了 state，形成了闭包，但是并没有把 state 加到依赖数组里，导致执行 effect 时用的 state 还是之前的。

1. 使用 setState 的函数的形式，从参数拿到上次的 state，这样就不会形成闭包了，或者用 useReducer，直接 dispatch action，而不是直接操作 state，这样也不会形成闭包
2. 把用到的 state 加到依赖数组里，这样 state 变了就会重新跑 effect 函数，引用新的 state
3. 使用 useRef 保存每次渲染的值，用到的时候从 ref.current 取
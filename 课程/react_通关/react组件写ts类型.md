### JSX 的类型

```tsx
interface AaaProps {
  name: string
  content: React.ReactElement // ReactElement 就是 jsx 类型，但如果你传入 null、number 等就报错了
}
// 组件一般不写返回值类型, 使用默认导出的
function Aaa(props: AaaProps) {
  return <div>{props.name}</div>
}
const App = () => {
  return <Aaa name='hello' />
}
export default App
```

ReactNode 包含 ReactElement、或者 number、string、null、boolean 等可以写在 JSX 里的类型。

ReactNode > ReactElement > JSX.Element => 一般情况下，如果你想描述一个参数接收 JSX 类型，就用 ReactNode 就行

### 函数组件的类型

他的类型是: `FunctionComponent<Props>`

```tsx
type FC<P = {}> = React.FunctionComponent<P>
const Aaa: React.FunctionComponent<AaaProps> = (props) => {
  return (
    <div>
      aaa, {props.name}
      {props.content}
    </div>
  )
}
```

### hook 类型

```tsx
// 自动推导 或者 指定类型
const [count, setCount] = useState<number>(0)

// useRef 保存 dom 引用的时候，参数需要传个 null
// 传 null 就是 dom 引用，返回 RefObject，不传就是其他数据，返回 MutableRefObject。
const inputRef = useRef<HTMLInputElement>(null)

// forwardRef 包裹的组件会额外传入 ref 参数，所以它不是 FunctionComponent 类型，而是专门的 ForwardRefRenderFunction 类型
const Bbb: React.ForwardRefRenderFunction<HTMLInputElement, BbbProps> = (
  props,
  ref
) => {}

// useReducer 类型
const [state, dispatch] = useReducer<Reducer<Data, Action>>(
  reducer,
  initialState
)

// useCallback 类型参数是 传入函数的类型
const fn = useCallback<() => number>((a: number) => a + 1, [])

// useMemo 类型参数是 传入的函数的返回值类型
const obj = useMemo<{ name: string }>(() => ({ name: "aaa" }), [])
```

### 参数类型

```tsx
// propsWithChildren 包含 children 属性
import React, { ReactNode } from "react"

interface CccProps {
  content: ReactNode
  children: ReactNode
}

function Ccc(props: CccProps) {
  return (
    <div>
      ccc,{props.content}
      {props.children}
    </div>
  )
}

function App() {
  return (
    <div>
      <Ccc content={<div>666</div>}>
        <button>7777</button>
      </Ccc>
    </div>
  )
}

export default App

// 但其实没有必要自己写，传 children 这种情况太常见了，React 提供了相关类型
type CccProps = PropsWithChildren<{
  content: ReactNode
}>
```

```tsx
// CSSProperties 传入一些css 的值

import React, { CSSProperties, PropsWithChildren, ReactNode } from "react"

type CccProps = PropsWithChildren<{
  content: ReactNode
  color: CSSProperties["color"]
  styles: CSSProperties
}>
```

```tsx
// HTMLAttributes 传入一些html 的值 如果你写的组件希望可以当成普通 html 标签一样用
interface CccProps extends HTMLAttributes<HTMLDivElement> {}
```

```tsx
// EventHandler 组件需要传入一些事件处理函数
import React, { HTMLAttributes, MouseEventHandler } from "react"

// 参数就要用 xxxEventHandler 的类型，比如 MouseEventHandler、ChangeEventHandler 等，它的类型参数是元素的类型
interface CccProps {
  clickHandler: MouseEventHandler
}

interface CccProps {
  clickHandler: (e: MouseEvent<HTMLDivElement>) => void
}
```

### React 合成事件

React 内建了一套名为 `合成事件(SyntheticEvent)` 的事件系统.

1. 什么是 React 合成事件

```html
<!-- 原生DOM -->
<!-- 这是HTML不是JSX -->
<button onclick="handleClick()">按钮</button>
<input type="text" onkeydown="handleKeyDown(event)" />
```

在 React 中, HTML 元素也有类似的, 以 `on*` 开头的事件处理属性, 例 `onCLick onKeyDown` 等

```js
const Component = () => {
  const handleClick = () => {
    /* ...省略 */
  }
  const handleKeyDown = (evt) => {
    /* ...省略 */
  }
  return (
    <>
      {/* 这次是JSX了 */}
      <button onClick={handleClick}>按钮</button>
      <input type='text' onKeyDown={(evt) => handleKeyDown(evt)} />
    </>
  )
}
```

上面的代码中, 用户点击按钮, React 都会传入一个描述点击事件的对象作为函数的第一个参数。而这个对象就是 React 中的合成事件

合成事件是原生 DOM 事件的一种包装，它与原生事件的接口相同

2. 合成事件与原生 DOM 事件的区别

**注册事件监听函数的方式不同**

```js
// 原生 DOM 事件三种方式

// 1. 内联方式
;<button id='btn' onclick='handleClick()'>
  按钮
</button>
// 2. JS
document.getElementById("btn").onCLick = handleClick
// 3. addEventListener 合适时机调用 removeEventListener 以防内存泄漏
document.getElementById("btn").addEventListener("click", handleClick)

// 合成事件 不能通过 addEventListener 方法监听
// 合成事件, 捕获方式
;() => <div onClickCapture={handleClick}>...</div>
```

**特定事件的行为不同**

在 React 中，`<input> 、<textarea> 和 <select>` 三种表单元素的`onChange` 合成事件被规范成了一致的行为：在不会导致显示抖动的前提下，表单元素值的改变会尽可能及时地触发这一事件。

合成事件也规范化了 `onBeforeInput 、 onMouseEnter 、 onMouseLeave 、 onSelect`

**实现注册的目标 DOM 元素不同**

```js
// 原生 DOM 当前目标 event.currentTarget
document.getElementById("btn").addEventListener("click", handleClick)

// React 是合成事件, evt 参数就是一个合成事件
// 通过 evt.nativeEvent 属性，可以得到这个合成事件所包装的原生事件
;<div onClickCapture={(evt) => handleClick(evt)}>...</div>
```

React 使用了`事件代理模式`。React 在创建根（ createRoot ）的时候，会在容器上监听所有自己支持的原生 DOM 事件。当原生事件被触发时，React 会根据事件的类型和目标元素，找到对应的 `FiberNode` 和事件处理函数，创建相应的合成事件并调用事件处理函数

### 受控组件与表单

以 `React state 为单一事实来源（Single Source of Truth），并用 React 合成事件处理用户交互的组件，被称为 "受控组件"`

```js
const KanbanNewCard = ({ onSubmit }) => {
  const [title, setTitle] = useState("")
  const handleChange = (evt) => {
    setTitle(evt.target.value)
  }

  return (
    <div>
      <input type='text' value={title} onChange={handleChange} />
    </div>
  )
}
```

### 单向数据流

1. 什么是数据流

数据流（Data Flow）则是响应式编程的重要概念，响应式编程将程序逻辑建模成为在运算（Operation）之间流动的数据及其变化。

2. React 数据流包含哪些数据

- props: React 组件接受一组输入参数，用于改变组件运行时的行为，这组参数就是 props
  - 形成列表的子元素的 key
  - 引用 DOM 元素的 ref
  - props 的数据流向是单向的, 只能从父组件流向子组件, 而不能从子组件流向父组件
- State: 组件内自己的数据
  - 对同一个对象属性的修改不会改变对象的值引用, React 都不认为是变化, 所有在更新引用类型时, 需要新建数组, 对象
- Context: 上下文
  - context 的数据流向也是单向的，只能从声明了 Context.Provider 的当前组件传递给它的子组件树

```js
// props 不可变
function MyComponent(props) {
  return (
    <ul>
      <li>{props.prop1}</li>
      <li>{props.prop2}</li>
    </ul>
  );
}
function MyComponent({ prop1, prop2, optionalProp = 'default' }) {}
// rest 语法
function MyComponent({ prop1, prop2, ...restProps }) {
  return (
    <ul {...restProps}>
      <li>{prop1}</li>
      <li>{prop2}</li>
    </ul>
  );
}

// state 也不可变, 不能直接赋值, 判断改变, Object.is()
const [state1, setState1] = useState('文本');  
const [state2, setState2] = useState(123);


// 1. 调用 React.createContext() 创建 Context 对象
const MyContext = React.createContext('没路用的初始值');
// 2. <MyContext.Provider> 组件，定义 value 值，并将子组件声明在前者的闭合标签里
function MyComponent() {
  const [state1, setState1] = useState('文本');
  const handleClick = () => {
    setState1('更新文本');
  };
  return (
    <MyContext.Provider value={state1}>
      <ul>
        <MyChildComponent />
        <li><button onClick={handleClick}>更新state</button></li>
      </ul>
    </MyContext.Provider>
  );
}
// 3. 在子组件或后代组件, 使用 useContext 获取 MyContext 值, 称为 MyContext 消费者
const value = useContext(MyContext);
```


### 面向接口编程

所谓 `软件接口（Software Interface）`，就是两个或多个模块间用来交换信息的一个共享的边界。

1. 接口是抽象
   - 接口用途广泛
   - 容易被滥用
   - 重要依然不可替代
2. 接口是边界
   - 接口是为外部设计的
   - 接口对外部隐藏了内部实现
   - 接口调用者只需要知道接口的用法, 不需要关注内部实现
   - 接口的实现者在开发内部实现时，与外部环境的交互应集中体现在接口上
3. 接口是契约
   - 越是广泛使用的接口，它就越是一种契约
   - 设计接口时，应考虑哪些功能是不会轻易改变的，哪些是有可能修改的
   - 实现者应该在保持接口不变的情况下更新内部实现
   - 接口的实现者破坏契约，可能会给调用者带来成倍的风险或损失


### React 组件的接口

props 就是 React 组件对外接口

- 哪些字段作为 props 暴露出来？
- 哪些抽取为 context 从全局获取？
- 哪些数据实现为组件内部的 state？

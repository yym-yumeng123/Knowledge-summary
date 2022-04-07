### JSX 如何变身 DOM

- JSX 是 JS 的一种语法扩展
- JSX 会被编译为 React.createElement() 将返回一个 `ReactElement` 的 JS 对象
- 编译用的是 babel => 是一个工具链, 将 ES6+ 代码转换为 ES5 代码
- JSX 语法糖允许我们使用类 HTML 标签来创建虚拟 DOM

流程: 开发者编写 JSX 代码 => Babel 编译 => `React.createElement 调用` => `ReactElement 调用` => `虚拟DOM` 作为参数传入 => `ReactDOM.render()` => 渲染处理 `真是DOM`

### 生命周期

1. 虚拟 DOM, 核心算法的基石

- 组件初始化 -> render 方法生成虚拟 DOM -> ReactDOM.render 真实 DOM
- 组件更新 -> render 生成新的虚拟 DOM -> diff 算法 定位两次虚拟 DOM 的差异

2. 组件化

   - 每个组件即是 '封闭'的, 也是 '开放'的
   - 封闭: 针对渲染工作流来说, 每个组件只处理它内部的渲染逻辑
   - 开放: 针对组件之间的通信, '单项数据流' 的原则完成组件间的通信, 而组件通信改变通信双方的数据变化

3. 生命周期本质: 组件的灵魂和躯干

4. React 15 生命周期

```js
construcotr();
componentWillReceiveProps();
shouldComponentUpdate();
componentWillMount();
componentWillUpdate();
componentDidUpdate();
componentDidMount();
render();
compoenentWillUnmount();
```

```js
// Mounting 阶段: 组件的初始化渲染

组件挂载L初始化渲染 -> constructor() -> componentWillMount() -> render() -> componentDidMount()

constructor() 仅在挂载时调用一次, 对 this.state 初始化
componentWillMount() render 方法前调用一次
render() 在执行过程中并不会去操作真实DOM, 职能是把需要渲染的内容返回出来
componentDidMount() 在render 之后被触发, 真实DOM已经挂载到了页面上,  在这个生命周期执行真实 DOM 相关的操作
```

```js
// Updating阶段: 组件的更新

父组件触发的更新: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()
组件自身触发的更新: shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

componentWillReceiveProps(nextProps) // 接收到新 props 的内容, 由父组件的更新触发的
// 如果父组件导致组件重新渲染, 即使 props 没有更改, 也会调用此方法, 如果只想处理更改, 请确保进行当前值与变更值的比较

componentWillUpdate() -> render() -> componentDidUpdate() // 组件更新前后触发
shouldComponentUpdate(nextProps, nexState) // 根据返回值来决定是否执行该方法之后的生命周期, 进而决定是否对组件进行 re-render(重渲染), 默认 true, 都渲染
```

```js
// Unmounting: 组件的卸载

componentWillUnmount(); // 组件在父组件被移除了, 触发; 组件设置了key, key和上次不一样, 也会触发
```

5. React 16.3 生命周期

```js
// 组件挂载:初始化渲染
constructor() -> getDerivedStateFromProps() -> render() -> componentDidMount()

// 静态方法, 接受两个参数: 父组件props, 当前组件 state, 需要一个对象格式的返回值
// 对state 的更新, 并非覆盖式, 而是针对某个属性的定向更新
state getDerivedStateFromProps(props, state) =>有且仅有一个用途: 使用 props 来派生/更新 state
```

```js
// Updating: 组件更新
父组件触发: getDerivedStateFromProps() -> shouldComponentUpdate() -> render -> getSnapshotBeforeUpdate() -> componentDidUpdate()
组件自身触发: shouldComponentUpdate() -> render -> getSnapshotBeforeUpdate() -> componentDidUpdate()

getDerivedStateFromProps() 来完成props 对 state额映射

// 返回值会作为第三个参数给到 componentDidUpdate(), 执行时机: render 之后, 真实 DOM 更新之前,获取更新前的真实DOM和更新前后额 state & props信息
getSnapshotBeforeUpdate(prevProps, prevState)
```

6. Fiber 是 React16 对 React 核心算法的一次重写

- Fiber 会使原本同步的渲染过程变成异步的, 可以被打断的异步渲染模式
- Fiber 会将一个大任务拆解为许多小任务
- render 阶段是允许暂停 中止 重启的

### 数据流动

`UI = render(data)`

1. 基于 `props` 的单项数据流

- 组件,从概念上类似于 JavaScript 函数, 他接受任意的入参(props), 并返回用于描述页面展示内容的 React 元素
- 单项数据流: 当前组件的 state 以 props 的形式流动, 只能流向组件树中比自己层级更低的组件

```js
父子组件通信: props
子父组件通信: 父组件传递给子组件是一个绑定了自身上下文的函数 那么子组件在调用该函数时, 就可以将想要交给父组件的数据以函数入参的形式给出去

兄弟组件通信, 有同一个父组件 => 子父组件, 父子组件

发布-订阅 模式驱动数据流
1. 理解事件的发布, 订阅机制
target.addEventListener(type, listener) // 订阅的动作
2. 事件的监听(订阅) 事件的触发(发布)
on(): 负责注册事件的监听器,指定事件触发时的回调函数
emit(): 负责触发事件, 通过传参使其再触发的时候携带数据
off(): 负责监听器的删除

Context API 维护全局状态

1. 创建 Context (过时的API)
const AppContext = React.createContext(defaultValue)
const { Provider, Consumer } = AppContext // provider 数据的提供者, Consumer: 数据的消费者
<Provider value={title, content}></Provider>
<Consumer>{value => <div>{value.title}</div>}</Consumer>

Redux: 状态管理工具
```

### React Hook 16.8+

对 `类组件`和`函数组件`的思考

- 类组件 `class component`
- 函数组件/无状态组件 `Function Component` 以函数形态

类组件函数组件区别:

- 类组件需要继承 class, 函数组件不需要
- 类组件可以访问生命周期方法, 函数组件不能
- 类组件可以获取实例化后的 this, 基于这个 this 做各种各样的事情, 而函数组件不行
- 类组件可以维护定义 state, 函数组件不行

Hooks 出现之前, 类组件能力边界强于函数组件

类组件是面向对象编程的一种表征

- 封装: 将一类属性和方法, '聚拢'到一个 class 里去
- 继承: 新的 class 可以通过继承现有 Class 实现对某一类属性和方法的复用
- 包裹在面向对象下的 "大而全", 开发者编写的逻辑和组件粘在一起, 使得类组件内部的逻辑难以实现和复用

函数收件: 轻巧

- 函数组件会捕获 render 内部的状态, 这是两类组件最大的不同, props 不会改变
- Hooks: 一套能够使函数组件更加强大, 更灵活的钩子

### React Hooks 基本语法
```js
useState(initialValue) // 为函数组件引入状态

// 返回一个数组, 第一个元素是当前状态, 第二个元素是更新状态的方法 
const [state, setState] = useState(initialValue)
setState(value) // 更新状态

// useState 定义为数组
const [count, setCount] = useState([0, 1, 2, 3, 4, 5])
// 定义为数值
const [count, setCount] = useState(0)
// 定义为字符串
const [count, setCount] = useState('0')
```

```js
// useEffect 一定程度上弥补了声明周期的缺席
useEffect() // 允许函数组件执行副作用操作

// 每一次渲染后都执行的副作用: 传入回调函数, 不依赖数组
useEffect(() => {
  // 副作用操作
})

// 仅在挂载阶段执行一次的副作用: 传入回调, 传入一个空数组
useEffect(() => {
  // 副作用操作
}, [])

// 仅在挂载阶段和卸载阶段执行的副作用, 这个函数的返回值是一个函数, 传入一个空数组
useEffect(() => {
  // 副作用操作
  return () => { // 清除函数
    // 卸载副作用操作
  }
}, [])

// 每一次渲染都触发, 卸载阶段也会被触发, 传入回调, 返回值是一个函数, 不传入第二个参数
useEffect(() => {
  // 副作用操作
  return () => { // 清除函数
    // 卸载副作用操作
  }
})

// 根据一定的依赖触发的副作用: 传入回调函数, 传入一个非空数组
useEffect(() => {
  // 副作用操作
}, [count])
```

**为什么需要 React-Hooks**
- 告别难以理解的 class
   - `this`; `生命周期`
- 解决业务逻辑难以拆分的问题
- 使状态逻辑复用变得更加简单
- 函数组件更加契合React的设计思想


### React-Hook 使用规则
- 只在 React 函数中调用Hook
- 不要在循环 条件或者嵌套中使用 Hook
- 确保 Hooks 在每次渲染都保持同样的执行顺序  
- hooks 渲染是通过 依次遍历 来定位每个 hooks 内容的, 如果前后两次读到的链表在顺序上出现差异, 那么渲染的结果自然不可控
- hooks 本质是链表


### 理解 虚拟DOM(Virtual DOM)

本质上是 JS 和 DOM 之间的一个映射缓存, 在形态上表现为一个能够描述DOM结构及其属性信息的JS对象

1. 挂载阶段
   - React 结合 JSX 的描述, 构建出一个虚拟DOM树, 然后通过ReactDOM.render() 实现虚拟DOM到真实DOM的映射
2. 更新阶段
   - 页面的变化会先作用于虚拟DOM树, 然后再通过diff算法, 对虚拟DOM树进行更新, 最后将更新后的虚拟DOM树渲染到真实DOM

模板引擎的实现思路:
1.  读取HTML模板并解析它, 分离出其中的JS 信息
2. 将解析出的内容拼接成字符串, 动态生成JS代码
3. 运行动态生成的JS代码, 吐出目标HTML
4. 将目标HTML插入到页面中


虚拟DOM解决的问题
1. 研发体验/效率的问题 数据驱动视图
2. 跨平台 一次编码抽象为 => 虚拟DOM
3. 可控性问题
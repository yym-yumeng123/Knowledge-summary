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
```
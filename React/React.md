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

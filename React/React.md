### JSX 如何变身DOM

- JSX 是 JS 的一种语法扩展
- JSX 会被编译为 React.createElement() 将返回一个 `ReactElement` 的JS 对象
- 编译用的是 babel => 是一个工具链, 将ES6+ 代码转换为 ES5 代码
- JSX 语法糖允许我们使用类 HTML 标签来创建虚拟DOM


流程: 开发者编写 JSX代码 => Babel 编译 => `React.createElement 调用` => `ReactElement 调用` => `虚拟DOM` 作为参数传入 => `ReactDOM.render()` => 渲染处理 `真是DOM`


### 生命周期

1. 虚拟DOM, 核心算法的基石
  - 组件初始化 -> render 方法生成虚拟DOM -> ReactDOM.render 真实DOM
  - 组件更新 -> render 生成新的虚拟DOM -> diff 算法 定位两次虚拟DOM 的差异

2. 组件化
   - 每个组件即是 '封闭'的, 也是 '开放'的
   - 封闭: 针对渲染工作流来说, 每个组件只处理它内部的渲染逻辑
   - 开放: 针对组件之间的通信, '单项数据流' 的原则完成组件间的通信, 而组件通信改变通信双方的数据变化

3. 生命周期本质: 组件的灵魂和躯干

4. React 15 生命周期
```js
construcotr()
componentWillReceiveProps()
shouldComponentUpdate()
componentWillMount()
componentWillUpdate()
componentDidUpdate()
componentDidMount()
render()
compoenentWillUnmount()
```

```js
// Mounting 阶段: 组件的初始化渲染

```
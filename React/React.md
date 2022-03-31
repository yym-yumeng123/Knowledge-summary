### JSX 如何变身DOM

- JSX 是 JS 的一种语法扩展
- JSX 会被编译为 React.createElement() 将返回一个 `ReactElement` 的JS 对象
- 编译用的是 babel => 是一个工具链, 将ES6+ 代码转换为 ES5 代码
- JSX 语法糖允许我们使用类 HTML 标签来创建虚拟DOM


流程: 开发者编写 JSX代码 => Babel 编译 => `React.createElement 调用` => `ReactElement 调用` => `虚拟DOM` 作为参数传入 => `ReactDOM.render()` => 渲染处理 `真是DOM`
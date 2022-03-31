/**
 * @params {type} 表示节点类型
 * @params (config) 对象形式传入, 组件所有的属性会议键值对形式存储在 config 
 * @params {children} 嵌套子标签
 */
export function createElement(type, config, children) {}


ReactDOM.render(
  // 需要渲染的元素
  element, 
  // 元素挂在的目标容 (一个真是DOM)
  container,
  // 回调函数 可选参数, 处理渲染结束后的逻辑
  [callback]
)
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

/**
 * 问题1: 事件和监听函数的对应关系如何处理
 * 问题2: 如何实现订阅
 * 问题3: 如何实现发布
 * @description 发布订阅
 */

class MyEventEmitter {
  constructor() {
    // 用来存储事件和监听之前的关系
    this.eventMap = {}
  }

  // 事件名称
  on(eventName, callback) {
    if (!(callback instanceof Function)) {
      throw new Error("需要传入一个函数")
    }

    // 判断 name 是否存在
    if (!this.eventMap[eventName]) {
      // 不存在, 新建该队列
      this.eventMap[eventName] = []
    }
    // 存在,队列中推入callback
    this.eventMap[eventName].push(callback)
  }

  emit(eventName, params) {
    // 假设该事件有订阅
    if (this.eventMap[eventName]) {
      // 事件队列依次执行
      this.eventMap[eventName].forEach((callback) => {
        // 读取 params
        callback(params)
      })
    }
  }

  off(eventName, callback) {
    if (this.eventMap[eventName]) {
      this.eventMap[eventName].splice(
        this.eventMap[eventName].indexOf(callback),
        0,
        1
      )
    }
  }
}

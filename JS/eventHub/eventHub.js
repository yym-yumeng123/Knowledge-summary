/**
 * ! API: .on(name, fn) .emit(name, fn) .off(name)
 * @description 多个模块之间进行通信
 *
 * .on 订阅时: 我会把 name 作为 key 放进 cache: { name: }, 把事件推进 cache: {name: [fn, ...]}
 * .emit 发布时: 我看一下有没有被订阅, 如果被订阅, 循环执行 name 的 [fn], 没有被订阅, 就设为 [], 什么也不干
 */

class EventHub {
  /**
   * {'click': [fn1, fn2, ...], 'mouse': [fn3, fn4, ...]}
   */
  cache = {}

  constructor() {}
  /**
   *
   * @param {我想接受什么东西} eventName
   * @param {接受这个东西干甚me} fn
   */
  on(eventName, fn) {
    // 先看 cache 里面有没有 这个东西
    this.cache[eventName] = this.cache[eventName] || []
    this.cache[eventName].push(fn)
  }

  // 触发/发布
  emit(eventName, data) {
    if (this.cache[eventName] === undefined) return
    this.cache[eventName].forEach((fn) => fn(data))
  }

  // 销毁
  off(eventName, fn) {
    this.cache[eventName] = this.cache[eventName] || []
    const index = this.cache[eventName].indexOf(fn)

    if (index === -1) return
    this.cache[eventName].splice(index, 1)
  }
}

export default EventHub

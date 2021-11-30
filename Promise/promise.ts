/**
 * 手写 Promise, 是一个构造函数
 */

class Promise2 {
  // then 后面使用
  callbakcs = []
  state = "pending"

  // promise 接受一个函数
  constructor(fn) {
    if (typeof fn !== "function") {
      throw new Error("我只接受函数")
    }
    // fn 立即执行, 接收两个函数
    fn(this.resolve.bind(this), this.reject.bind(this))
  }

  // resolve 结果 会传递给 then 的结果
  resolve(result) {
    // 只能被调用一次

    if (this.state !== "pending") return
    this.state = "fulfilled"
    setTimeout(() => {
      this.callbakcs.forEach((handle) => {
        if (typeof handle[0] === "function") {
          handle[0].call(undefined, result)
        }
      })
    }, 0)
  }

  // reject 结果, then 也有
  reject(reason) {
    // 只能被调用一次
    if (this.state !== "pending") return
    this.state = "rejected"
    setTimeout(() => {
      this.callbakcs.forEach((handle) => {
        if (typeof handle[1] === "function") {
          handle[1].call(undefined, reason)
        }
      })
    }, 0)
  }

  // Promise 实例有 then 方法
  then(succeed?, fail?) {
    // 把 成功, 失败 推到数组里
    const handle = []
    // 当 resolve, 或者 reject 时 调用, 如果success | fail 不是函数忽略
    if (typeof succeed === "function") {
      handle[0] = succeed
    }

    if (typeof fail === "function") {
      handle[1] = fail
    }

    this.callbakcs.push(handle)
  }
}

const p = new Promise2((resolve, reject) => {}).then(
  () => {},
  () => {}
)

/**
 * 手写 Promise, 是一个构造函数
 */

class Promise2 {
  // then 后面使用
  succeed = null
  fail = null
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
      if (typeof this.succeed === "function") {
        this.succeed.call(undefined, result)
      }
    }, 0)
  }

  // reject 结果, then 也有
  reject(reason) {
    // 只能被调用一次
    if (this.state !== "pending") return
    this.state = "rejected"
    setTimeout(() => {
      if (typeof this.fail === "function") {
        this.fail.call(undefined, reason)
      }
    }, 0)
  }

  // Promise 实例有 then 方法
  then(succeed?, fail?) {
    // 当 resolve, 或者 reject 时 调用, 如果success | fail 不是函数忽略
    if (typeof succeed === "function") {
      this.succeed = succeed
    }

    if (typeof fail === "function") {
      this.fail = fail
    }
  }
}

const p = new Promise2((resolve, reject) => {}).then(
  () => {},
  () => {}
)

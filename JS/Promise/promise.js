class Promise2 {
  state = "pending"
  callbacks = []

  static resolve(data) {
    return new Promise2((resolve, reject) => {
      resolve(data)
    })
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  resolveOrReject(state, data, i) {
    if (this.state !== "pending") return
    this.state = state
    nextTick(() => {
      // 遍历 callbacks，调用所有的 handle[0]
      this.callbacks.forEach((handle) => {
        if (typeof handle[i] === "function") {
          let x
          try {
            x = handle[i].call(undefined, data)
          } catch (e) {
            return handle[2].reject(e)
          }
          handle[2].resolveWith(x)
        }
      })
    })
  }

  resolve(result) {
    this.resolveOrReject("fulfilled", result, 0)
  }
  reject(reason) {
    this.resolveOrReject("rejected", reason, 1)
  }
  constructor(fn) {
    if (typeof fn !== "function") {
      throw new Error("我只接受函数")
    }
    fn(this.resolve.bind(this), this.reject.bind(this))
  }
  then(succeed, fail) {
    const handle = []
    if (typeof succeed === "function") {
      handle[0] = succeed
    }
    if (typeof fail === "function") {
      handle[1] = fail
    }
    handle[2] = new Promise2(() => {})
    this.callbacks.push(handle)
    // 把函数推到 callbacks 里面
    return handle[2]
  }
  resolveWithSelf() {
    this.reject(new TypeError())
  }
  resolveWithPromise(x) {
    x.then(
      (result) => {
        this.resolve(result)
      },
      (reason) => {
        this.reject(reason)
      }
    )
  }
  getThen(x) {
    let then
    try {
      then = x.then
    } catch (e) {
      return this.reject(e)
    }
    return then
  }
  resolveWithThenable(x) {
    try {
      x.then(
        (y) => {
          this.resolveWith(y)
        },
        (r) => {
          this.reject(r)
        }
      )
    } catch (e) {
      this.reject(e)
    }
  }
  resolveWithObject(x) {
    let then = this.getThen(x)
    if (then instanceof Function) {
      this.resolveWithThenable(x)
    } else {
      this.resolve(x)
    }
  }
  resolveWith(x) {
    if (this === x) {
      this.resolveWithSelf()
    } else if (x instanceof Promise2) {
      this.resolveWithPromise(x)
    } else if (x instanceof Object) {
      this.resolveWithObject(x)
    } else {
      this.resolve(x)
    }
  }
}

// Promise.prototype.catch 用来捕获 promise 的异常，就相当于一个没有成功的 then
Promise2.prototype.catch = function (errCallback) {
  return this.then(null, errCallback)
}

// 无论成功还是失败如何都会执行的意思
// 如果返回一个 promise 会等待这个 promise 也执行完毕。
// 如果返回的是成功的 promise，会采用上一次的结果；
// 如果返回的是失败的 promise，会用这个失败的结果，传到 catch 中
Promise2.prototype.finally = function (callback) {
  return this.then(
    (value) => {
      return Promise2.reslove(callback()).then(() => value)
    },
    (reason) => {
      return Promise2.reslove(callback()).then(() => {
        throw reason
      })
    }
  )
}

// promise.all 是解决并发问题的，多个异步并发获取最终的结果（如果有一个失败则失败)
Promise2.all = function (values) {
  if (!Array.isArray(values)) {
    const type = typeof values
    return new TypeError(`TypeError: ${type} ${values} is not iterable`)
  }

  return new Promise((resolve, reject) => {
    let resultArr = []
    let orderIndex = 0
    const processResultByKey = (value, index) => {
      resultArr[index] = value
      if (++orderIndex === values.length) {
        resolve(resultArr)
      }
    }
    for (let i = 0; i < values.length; i++) {
      let value = values[i]
      if (value && typeof value.then === "function") {
        value.then((value) => {
          processResultByKey(value, i)
        }, reject)
      } else {
        processResultByKey(value, i)
      }
    }
  })
}

// Promise.race 用来处理多个请求，采用最快的（谁先完成用谁的）
Promise2.race = function (promises) {
  return new Promise((resolve, reject) => {
    // 一起执行就是for循环
    for (let i = 0; i < promises.length; i++) {
      let val = promises[i]
      if (val && typeof val.then === "function") {
        val.then(resolve, reject)
      } else {
        // 普通值
        resolve(val)
      }
    }
  })
}

function nextTick(fn) {
  if (process !== undefined && typeof process.nextTick === "function") {
    return process.nextTick(fn)
  } else {
    var counter = 1
    var observer = new MutationObserver(fn)
    var textNode = document.createTextNode(String(counter))

    observer.observe(textNode, {
      characterData: true,
    })

    counter = counter + 1
    textNode.data = String(counter)
  }
}

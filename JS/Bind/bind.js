function bind(asThis, ...args) {
  // this 就是函数
  const fn = this
  if (typeof fn !== "function") {
    throw new TypeError("bind must function")
  }
  return function (...innerargs) {
    return fn.call(asThis, ...args, ...innerargs)
  }
}

// 支持 new
function new_bind(asThis, ...args) {
  // this 就是函数
  const fn = this
  if (typeof fn !== "function") {
    throw new TypeError("bind must function")
  }
  function resultFn(...innerargs) {
    // new fn 和 普通的调用区别是 {}.__proto__ === fn.prototype
    return fn.call(
      resultFn.prototype.isPrototypeOf(this) ? this : asThis,
      ...args,
      ...innerargs
    )
  }

  resultFn.prototype = fn.prototype
  return resultFn
}

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}

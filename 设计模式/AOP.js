const AOP = {}
AOP.before = function (fn, beforeFn) {
  return function () {
    beforeFn.apply(this, arguments)
    return fn.apply(this, arguments)
  }
}

AOP.after = function (fn, afterFn) {
  return function () {
    const ret = fn.apply(this, arguments)
    afterFn.apply(this, arguments)
    return ret
  }
}
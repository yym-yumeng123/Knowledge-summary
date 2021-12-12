### 手写 call apply bind

1. call
   - 不传入第一个参数, 那么上下文默认为 `window`
   - 改变了 `this` 指向, 让新的对象可以执行该函数, 并能接受参数

```js
// context -> this
Function.prototype.myCall = function (context) {
  // 处理用户不传为 window
  context = context || window
  // 设置 fn 为调用 myCall 的方法
  context.fn = this
  // 获取去掉第一个 this 的剩余参数
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}
this.a = 1
const fn = function () {
  this.a = 2
  console.log(this.a)
}

fn.myCall(fn, 1, 2)
```

2. aply 参数是数组

```js
Function.prototype.myApply = function (context) {
  context = context || window
  context.fn = this
  let result
  // 处理参数和 call 有区别
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}
```

3. bind 需要返回一个函数
   - `bind` 返回了一个函数，对于函数来说有两种方式调用，一种是直接调用，一种是通过 new 的方式

```js
Function.prototype.myBind = function (context) {
  // 设置 fn 为 this
  const fn = this
  // 获取剩余参数
  const args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 如果通过 new F()，绑定 this 示例对象
    if (this instanceof F) {
      return new fn(...args, ...arguments)
    }
    return fn.apply(context, args.concat(...arguments))
  }
}
```

### new 原理是什么?

调用 `new` 发生四件事情:

1. 新生成一个对象
2. 链接到原型
3. 绑定 This
4. 返回新对象

```js
function myNew() {
  // 创建一个新的对象
  const obj = {}
  // 截取传入myNew函数的第一个参数
  Constructor = Array.prototype.shift.call(arguments)
  // 将第一个参数的prototype与要返回的对象建立关联。
  obj.__proto__ = Constructor.prototype
  // 使用apply，改变构造函数的this指向，使其指向新对象，这样，obj就可以访问到构造函数中的属性了。
  Constructor.apply(obj, arguments)
  return obj
}
```

### instanceof 原理

- `instanceof` 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 `prototype`

```js
function myInstanceof(left, right) {
  // 首先获取类型的原型
  let prototype = right.prototype
  // 然后获得对象的原型
  left = left.__proto__
  // 然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 null，因为原型链最终为 null
  while (true) {
    if (left === null || left === undefined) return false
    if (prototype === left) return true
    left = left.__proto__
  }
}
```

### 为什么 0.1 + 0.2 != 0.3

- 因为 JS 采用 IEEE 754 双精度版本（64 位），并且只要采用 IEEE 754 的语言都有该问题

```js
parseFloat((0.1 + 0.2).toFixed(10)) === 0.3 // true
```

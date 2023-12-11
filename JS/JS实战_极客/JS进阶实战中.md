### JS 8 种数据类型

- 原始类型 Primitive Type
  - number
  - string
  - boolean
  - null
  - undefined
  - symbol 数据不可变 immutable
  - BigInt
- 对象类型 Object Type
  - object
    - array
    - function
    - Date
    - RegExp
    - Map
    - Set

1. number, 为什么 `0.1 + 0.2 != 0.3`

JavaScript 中的数字类型包括了两类：浮点数和整数。浮点数对应的是定点数

浮点数是采用科学计数法来表示的,`1.4 * 10 的 9 次方`

JavaScript 所采用的`IEEE 754` 是二进制浮点数算术标准。这个标准里规定了 4 种浮点数算术方式：`单精确度、双精确度、延伸单精确度与延伸双精确度`, 这里选择的是 `float64`

有 64 位比特, 包含了一个比特的符号位(sign), 11 个比特的有偏指数, 52 个比特小数部分

十进制转化为二进制的算法是用十进制的小数乘以 2 直到没有了小数为止，所以十进制下的有些小数无法被精确地表示成二进制小数。而既然这里的浮点数是二进制，因此小数就会存在精度丢失的问题。

当我们使用加减法的时候，由于需要先对齐（也就是把指数对齐，过程中产生移位），再计算，所以这个精度会进一步丢失

```js
// 按比例先放大, 再缩小
var priceBigInt = 1999n
var priceStr = String(priceBigInt)
var priceYuan = `￥${priceStr.slice(0, -2)}.${priceStr.slice(-2)}`
console.log(priceYuan)
```

2. NaN, 如何判断一个值是不是数字?

在 `IEEE 754` 中, NaN 代表 `Not a Number`, 但是 `typeof NaN => number`

`NaN != NaN`

```js
// isFinite 可以过滤掉 NaN 和 Infinity
var isNum = function isNum(value) {
  return typeof value === "number" && isFinite(value)
}
```

3. boolean

在 JS 中, `false undefined null 0 NaN ""` 都是假值

4. null, 是个对象

`typeof null =>  object` null 实际上是一个空的对象指针

```js
null == undefined // true
null === undefined // false
```

5. 为什么基于对象创建的实例 instanceOf 返回错误

```js
// 1. 字面量
var objA = { name: "Object A" }
var objB = Object.create(objA)
console.log(objB instanceof objA) // 返回 类型错误

// 2. constructor
var objA = new Object()
objA.name = "Object A"
var objB = object.create(objA)
console.log(objB instanceof objA) // 返回 类型错误

// 3. 基于原型
var objA = function () {}
objB = new objA()
console.log(objB instanceof objA) // 返回 true
```

6. 如何识别一个数组

- Array.isArray()

```js
if (typeof Array.isArray === "undefined") {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === "[object Array]"
  }
}
```

### 通过JS引擎堆栈了解闭包


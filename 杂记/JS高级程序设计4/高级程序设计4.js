let script = document.createElement("script")
script.src = "demo.js"
document.head.appendChild(script)

var message // undefined
var message = "hi"
message = 100 // 不推荐改变变量保存值的类型

function test() {
  var message = "hi" // 局部变量
}
test()
console.log(message) // 出错

var message = "hi",
  found = false,
  age = 29

if (true) {
  var name = "matt"
  console.log("name", name)
}
console.log("name", name)

if (true) {
  let age = 26
  console.log(age) // 26
}
console.log(age) // ReferenceError: age 没有定义

let a = 6
let b = 9
function simpleTag(strings, aValExpression, bValExpression, sumExpression) {
  console.log(strings)
  console.log(aValExpression)
  console.log(bValExpression)
  console.log(sumExpression)
  return "foobar"
}
let untaggedResult = `${a} + ${b} = ${a + b}`
let taggedResult = simpleTag`${a} + ${b} = ${a + b}`
// ["", " + ", " = ", ""]
// 6
// 9
// 15
console.log(untaggedResult) // "6 + 9 = 15"
console.log(taggedResult) // "foobar"

let sym = Symbol()
console.log(typeof sym)

let fooGlobalSymbol = Symbol.for("foo")
console.log(typeof fooGlobalSymbol) // symbol

let s1 = Symbol("foo"),
  s2 = Symbol("bar"),
  s3 = Symbol("baz"),
  s4 = Symbol("qux")
let o = {
  [s1]: "foo val",
}
// 这样也可以：o[s1] = 'foo val';
console.log(o)
// {Symbol(foo): foo val}
Object.defineProperty(o, s2, { value: "bar val" })
console.log(o)
// {Symbol(foo): foo val, Symbol(bar): bar val}
Object.defineProperties(o, {
  [s3]: { value: "baz val" },
  [s4]: { value: "qux val" },
})
console.log(o)
// {Symbol(foo): foo val, Symbol(bar): bar val,
// Symbol(baz): baz val, Symbol(qux): qux val}

Reflect.ownKeys()

console.log(!false)

Math.pow(3, 2)
3 ** 2

console.log(Math.pow(16, 0.5))
console.log(16 ** 0.5)

for (const propName in window) {
  document.write(propName)
}

for (const key in object) {
  if (Object.hasOwnProperty.call(object, key)) {
    const element = object[key]
  }
}

for (const el of [2, 4, 6, 8]) {
  document.write(el)
}

start: for (let i = 0; i < count; i++) {
  console.log(i)
}

let num = 0
for (let i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    break
  }
  num++
}

console.log("num", num)

let num1 = 0
for (let i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    continue
  }
  num1++
}
console.log(num1) // 8

let person = new Person()
person.name = "Nico"
console.log("person.name", person.name)

let obj1 = new Object()
let obj2 = obj1
obj1.name = "nic"
console.log(obj2.name)

function addTen(num) {
  num += 10
  return num
}
let count = 20
let result = addTen(count)
console.log(count) // 20，没有变化
console.log(result) // 30

function setName(obj) {
  obj.name = "Nicholas"
}
let person = new Object()
setName(person)
console.log(person.name) // "Nicholas"

function setName(obj) {
  obj.name = "Nicholas"
  obj = new Object()
  obj.name = "Greg"
}
let person = new Object()
setName(person)
console.log(person.name) // "Nicholas"

var color = "blue"

function changeColor() {
  if (color === "blue") {
    color = "red"
  } else {
    color = "blue"
  }
}
changeColor()

var color = "blue"
function changeColor() {
  let anotherColor = "red"
  function swapColors() {
    let tempColor = anotherColor
    anotherColor = color
    color = tempColor
    // 这里可以访问 color、anotherColor 和 tempColor
  }
  // 这里可以访问 color 和 anotherColor，但访问不到 tempColor
  swapColors()
}
// 这里只能访问 color
changeColor()

function displayInfo(args) {
  let output = ""

  if (typeof args.name === "string") {
    output += "Name: " + args.name + "\n"
  }

  if (typeof args.age == "number") {
    output += "Age: " + args.age + "\n"
  }

  alert(output)
}

displayInfo({
  name: "Nicholas",
  age: 29,
})
displayInfo({
  name: "Greg",
})

console.log(Array.from("Matt"))

const m = new Map().set(1, 2).set(3, 4)
const s = new Set().add(1).add(2).add(3).add(4)

const a1 = [1, 2, 3, 4]
const a2 = Array.from(a1, (x) => x ** 2)
const a3 = Array.from(
  a1,
  function (x) {
    return x ** this.exponent
  },
  { exponent: 2 }
)
console.log(a2) // [1, 4, 9, 16]
console.log(a3) // [1, 4, 9, 16]

const options = [1, , , , 5]
for (const option of options) {
  console.log("option", option === undefined)
}

let values = [1, 2, 3, 4, 5]

let sum = values.reduce((prev, current, index, array) => prev + current, 10)

const m1 = new Map([
  ["key1", "val1"],
  ["key2", "val2"],
  ["key3", "val3"],
])

m1.has("key1")
m1.has("key4")
m1.get("key2")

m1.entries === m[Symbol.iterator]

const wm = new WeakMap()

const key1 = { id: 1 },
  key2 = { id: 2 },
  key3 = { id: 3 }

const wm1 = new WeakMap([
  [key1, "val1"],
  [key2, "val2"],
  [key3, "val3"],
])

class User {
  constrouctor(id) {
    this.idProperty = Symbol("id")
    this.setId(id)
  }

  setPrivate(property, value) {
    const privateMembers = wm.get(this) || {}
    privateMembers[property] = value
    wm.set(this, privateMembers)
  }
  getPrivate(property) {
    return wm.get(this)[property]
  }
  setId(id) {
    this.setPrivate(this.idProperty, id)
  }
  getId() {
    return this.getPrivate(this.idProperty)
  }
}

const user = new User(123)
alert(user.getId()) // 123
user.setId(456)
alert(user.getId()) // 456
// 并不是真正私有的
alert(wm.get(user)[user.idProperty]) // 456

const User = (() => {
  const wm = new WeakMap()
  class User {
    constructor(id) {
      this.idProperty = Symbol("id")
      this.setId(id)
    }
    setPrivate(property, value) {
      const privateMembers = wm.get(this) || {}
      privateMembers[property] = value
      wm.set(this, privateMembers)
    }
    getPrivate(property) {
      return wm.get(this)[property]
    }
    setId(id) {
      this.setPrivate(this.idProperty, id)
    }
    getId(id) {
      return this.getPrivate(this.idProperty)
    }
  }
  return User
})()

const m11 = new Set()

const s11 = new Set(["v1", "v2", "v3"])

for (const value of s11.values()) {
  console.log(value, "value")
}

for (let index = 0; index < array.length; index++) {
  console.log("index", index)
}

let num11 = 1
let obj = {}

console.log("num11[Symbol.iterator]", num11[Symbol.iterator])

class Foo {
  [Symbol.iterator]() {
    return {
      next() {
        return { done: false, value: "foo" }
      },
    }
  }
}

class Counter {
  constructor(limit) {
    this.limit = limit
  }
  [Symbol.iterator]() {
    let count = 1,
      limit = this.limit
    return {
      next() {
        if (count <= limit) {
          return { done: false, value: count++ }
        } else {
          return { done: true, value: undefined }
        }
      },
    }
  }
}

let counter = new Counter(3)

for (const i of counter) {
  console.log("i", i)
}

// 生成器函数声明
function* generatorFn() {}
// 生成器函数表达式
let generatorFn = function* () {}
// 作为对象字面量
let foo = {
  *generatorFn() {},
}
// 作为类实例方法
class Foo {
  *generatorFn() {}
}
// 作为类静态方法的生成器函数
class Bar {
  static *generatorFn() {}
}

const g = generatorFn()
console.log("g", g)
console.log("g.next", g.next)

class Foo {
  constructor() {
    this.values = [1, 2, 3]
  }
  *[Symbol.iterator]() {
    yield* this.values
  }
}

const f = new Foo()
for (const x of f) {
  console.log(x)
}

let person = new Object()
person.name = "yym"
person.age = 18
person.job = "engineer"
person.sayNmae = function () {
  console.log("this.name", this.name)
}

let person = {}
Object.defineProperty(person, "name", {
  writable: false, // 只读
  configurable: false, // 不能从对象上删除
  value: "yym",
})
console.log("person.name", person.name)
person.name = "zhangsan"
console.log("person.name", person.name)
delete person.name
console.log("person.name", person.name)

let book = {
  year_: 2017,
  edition: 1,
}

Object.defineProperty(book, "year", {
  get() {
    return this.year_
  },
  set(newValue) {
    if (newValue > 2017) {
      this.year_ = newValue
      this.edition += newValue - 2017
    }
  },
})

book.year = 2018
console.log("book.edition", book.edition)

let book = {}
Object.defineProperties(book, {
  year_: {
    value: 2017,
  },
  edition: {
    value: 1,
  },

  year: {
    get() {
      return this.year_
    },
    set(newValue) {
      if (newValue > 2017) {
        this.year_ = newValue
        this.edition += newValue - 2017
      }
    },
  },
})
let descriptor = Object.getOwnPropertyDescriptor(book, "year_")
console.log("descriptor.value", descriptor.value) // 2017
console.log("descriptor.configurable", descriptor.configurable)
console.log(typeof descriptor.get) // "undefined"
let descriptor1 = Object.getOwnPropertyDescriptor(book, "year")
console.log(descriptor1.value) // undefined
console.log(descriptor1.enumerable) // false
console.log(typeof descriptor1.get) // "function"

let dest, src, result1
dest = {}
src = { id: "1" }
result1 = Object.assign(dest, src)

function recursivelyCheckEqual(x, ...rest) {
  return (
    Object.is(x, rest[0]) && (rest.length < 2 || recursivelyCheckEqual(...rest))
  )
}

const nameKey = "name"
const ageKey = "age"
const jobKey = "job"

let person = {}
person[nameKey] = "Matt"
person[ageKey] = 27
person[jobKey] = "Software engineer"

function createPerson(name, age, job) {
  let o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayNmae = function () {
    console.log("this.name", this.name)
  }

  return o
}

let person1 = createPerson("yym", 18, "soft")
let person2 = createPerson("yym1", 20, "soft1")

function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayNmae = function () {
    console.log("this.name", this.name)
  }
}

let person3 = new Person("yym", 18, "soft")
let person4 = new Person("yym", 128, "soft1")

person3.sayNmae()
person4.sayNmae()

function Perosn() {}
Person.prototype.name = "yym"
Person.prototype.age = 29
Person.prototype.job = "Software Engineer"
Person.prototype.sayName = function () {
  console.log(this.name)
}

let person5 = new Person()
person5.sayName()

/**
 * 构造函数可以是函数表达式
 * 也可以是函数声明
 * function Person(){}
 * let Person = function() {}
 */
function Person() {}

person1.name = "Grey"

function hasPrototypeProperty(object, name) {
  return !object.hasOwnProperty(name) && name in object
}

const o1 = {
  foo: "baz",
  baz: 1,
  qux: {},
}

Object.values(o1)

Person.prototype = {
  name: "yynm",
}

function SuperType() {
  this.property = true
}

SuperType.prototype.getSuperValue = function () {
  return this.property
}

function SubType() {
  this.subproperty = false
}

SubType.property = new SuperType()
SubType.property.getSubValue = function () {
  return this.subproperty
}

let instance = new SubType()
console.log("instance.getSuperValue()", instance.getSuperValue())

function SuperType(name) {
  this.name = name
}

function SubType() {
  // 继承 SuperType 并传参
  SuperType.call(this, 'yym')
  // 实例属性
  this.age = 18
}

let instance1 = new SubType()
instance1.colors.push("black")
console.log(instance1.colors) // "red,blue,green,black"
let instance2 = new SubType()
console.log(instance2.colors) // "red,blue,green"

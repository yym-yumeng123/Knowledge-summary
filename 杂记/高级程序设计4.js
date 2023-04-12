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

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

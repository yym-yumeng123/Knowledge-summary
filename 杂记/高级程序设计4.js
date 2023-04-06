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

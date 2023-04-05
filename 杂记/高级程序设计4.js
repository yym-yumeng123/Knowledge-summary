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

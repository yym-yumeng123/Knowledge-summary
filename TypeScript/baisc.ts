/**
 * 体验 ts
 */
const sum = (a: number, b: number) => {
  return a + b
}
sum(1, 2)

/**
 * 类型推断
 */

// 普通类型推断
let name1 = "yym" // 类型推断 string
let boo = true // 推断 boolean

// 数组类型推断
const arr = ["yym"] // 类型推断 string[]
// arr.push(4) // 不能将 number 类型赋给 string 类型
const arr1 = ["yym", 12] // 推断为 (string | number)[]
const arr2 = ["yym", 18, true] // 推断为 (string | number | boolean)[]

// 对象类型
const obj = { name: "yym", age: 19 } // {name: string;}
const obj1 = { name: "yym", age: 19, lesson: [{title: 'ts'}] }
// 类型推断: {
//   name: string;
//   age: number;
//   lesson: {
//       title: string;
//   }[];
// }
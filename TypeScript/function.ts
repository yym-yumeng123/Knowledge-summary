/**
 * 函数
 */

let fn3: Function = () => {}

// ! 参数的声明
function fn4(a: number, b: string, c?: boolean) {
  // a number
  // b number
  // c boolean 可选参数
}

function fn5(a: number, b: string, c: boolean = true) {
  // 默认值放在最后的参数
}

// ! 函数返回值
function fn6(a: number, b: number): string {
  return `${a + b}`
}

function fn7(a: number, b: number): void {
  // 其声明类型不为 "void" 或 "any" 的函数必须返回值
}

// ! 参数声明 type
type userType = { name: string; age: number } // 提取公用类型
const addUser = (user: userType): void => {
  console.log("添加用户")
}
const updateUser = (user: userType): void => {
  console.log("更新用户")
}

// ! 函数结构定义
let sum2: (a: number, b: number) => number

let addUser1: (user: { name: string; age: number }) => boolean
addUser1 = (u: { name: string; age: number }): boolean => {
  return true
}

// ! 剩余参数 ts 使用
const sum3 = (...args: number[]): number => {
  return args.reduce((s, n) => s + n, 0)
}

const push = (arr: any[], ...args: any[]): any[] => {
  arr.push(...args)
  return arr
}

// ! 元组 tuple 
let arr3: (string | number | boolean)[] = ['yym', true, 1] // 不管顺序, 只要是这三种类型

let tuple: [string, number, boolean] = ['1', 2, true] // 必须按照顺序
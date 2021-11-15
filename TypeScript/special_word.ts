/**
 * any 关键字
 * 什么类型都可以
 */

// ! any 关键字
let b: any // 任何类型
b = 1
b = "1"
b = []
b = {}
b = true

// ! any 在数组中应用
let arrA: any[] = [1, "2", true, null, {}]

// "noImplicitAny": true, 没有隐含的any
function sum1(a: number, b: number) {
  return a + b
}

/**
 * unknown 类型
 * 不知道的类型, 但我有类型
 *
 * as 断言
 */

let b1: unknown = "yym"
// let b2: string = b1 // 不能将 不知道的类型 分配给 b2
let b2: string = b1 as string

let b3: string = "1"
// let b4: number = b3 as number // 不能转换
let b4: number = b3 as unknown as number // 可以把 unknown 当做中间

/**
 * void never
 */
let c: void = undefined

// 不具体返回值, 会执行结束, 返回 undefined
function fn(): void {}

// never 函数不会执行到头
function fn1(): never {
  throw new Error("我错了")
}

/**
 * null
 * undefined
 */
let c1: null = null
let c2: undefined = undefined

function fn2(): void | null {
  return undefined
}

// 默认情况下, null undefined 可以变成其他类型的值
let c3: string = 'yym'
// 非严格下 "strictNullChecks": true,
// c3 = null
// c3 = undefined


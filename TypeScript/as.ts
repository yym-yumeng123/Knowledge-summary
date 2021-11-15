/**
 * ! 断言: 我说了算, 我说它是啥就是啥
 * * as const
 */

const as = "yym" // as 类型时值类型 yym
let as1 = "yym" // as1 是 string 类型, 可以是任何字符串

// * 值 as const 变为固定值类型
let as2 = "hhh" as const // as2 也变成 值类型 hhh

// * 数组 as const
let as3 = [1, 2, "2"] // (string | number)[] 类型
let as4 = [1, 2, "2"] as const // readonly [1, 2, "2"] 元组

// * 对象 as const
let as5 = {
  name: "哈哈",
} // { name: string}

let as6 = {
  name: "哈哈",
} as const // { readonly name: '哈哈'}

// * as const => <const>
let as7 = "yym"
let as8 = 19
let as9 = [as7, as8] // (string | number)[]
let as10 = <const>[as7, as8] // readonly [string, number]
let as11 = as10[1]

// * 解构使用 as const

//  返回类型 =>  (string | ((x: number, y: number) => number))[]
function as12() {
  let as13 = "yym"
  let as14 = (x: number, y: number): number => x + y
  return [as13, as14]
}

const [as15, as16] = as12(); // 解构
// as16(1, 2)  类型type 有问题
(as16 as Function)(1, 2) // 第一种断言
(as16 as (x: number, y: number) => number)(1, 2) // 具体一点断言
// * const [as15, as16] = as12() as [string, Function] // 结果断言
function as17() {
  let as13 = "yym"
  let as14 = (x: number, y: number): number => x + y
  return <const>[as13, as14]
}
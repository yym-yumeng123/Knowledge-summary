/**
 * 设置基本类型
 */
let str: string = "yym"
let num: number = 12
let bool: boolean = true
let bool1: boolean = 1 > 2
let strArr: string[] = ["1", "2"]
let strArr1: Array<string> = ["1", "2"] // 泛型

/**
 * 设置对象类型
 */
let o: object
o = {}
o = []
o = Object.prototype

let o1: object = []

// 限定对象的值
let o2: { name: string; age: number } = { name: "yym", age: 15 }

// ? 可选参数
let o3: { name: string; age: number; hobby?: string } = { name: "yym", age: 15 }
o3 = { name: "yym", age: 15, hobby: "玩" }

// * 组合类型, 用 | 隔开类型
let a: string | number = 1
let a1: string | number = "1"

let a2: (string | boolean)[] = ["1", true]
let a3: string | number[] = "1"
let a4: string | number[] = [1, 2, 4]

/**
 * * 类的 type
 */

// ! 1. 使用 ts 约束 class
class User {
  name: string
  age: number
  constructor(p1: string, p2: number) {
    this.name  = p1
    this.age = p2
  }

  info(): string {
    return `你的名字${this.name}, 年龄是${this.age}`
  }
}

const yy = new User('yym', 2)
const ym = new User('yym', 18)

// ! 2. 泛型 generics 
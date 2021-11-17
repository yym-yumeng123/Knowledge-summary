/**
 * * 类的 type
 */

// ! 1. 使用 ts 约束 class
class User {
  name: string
  age: number
  constructor(p1: string, p2: number) {
    this.name = p1
    this.age = p2
  }

  info(): string {
    return `你的名字${this.name}, 年龄是${this.age}`
  }
}

const yy = new User("yym", 2)
const ym = new User("yym", 18)

// ! 2. 泛型 generics  ==> 宽泛的类型
{
  let a: number = 1 // 具体的类型
}

// 我们希望我 传入 string, 返回 string, 传入 boolean, 返回 boolean,
function dump<T>(arg: T): T {
  return arg
}

dump(12)
dump(true)

// ! 3. public 修饰符
{
  class User {
    public name: string
    public age: number
    constructor(p1: string, p2: number) {
      this.name = p1
      this.age = p2
    }

    public info(): string {
      return `你的名字${this.name}, 年龄是${this.age}`
    }
  }

  const yy = new User("yym", 2)
  const ym = new User("yym", 18)
}

// ! 4. 泛型的继承 generics extends  T 就是动态接受类型
// ! T 类型来源于传递过来的参数 <T  extends any>
{
  // 这种使用泛型 因为不确定 类型, 所以可能类型没有length 属性
  // function getlength<T>(arg: T): number {
  //   return arg.length
  // }
  // console.log(getlength("2323232"))
  // console.log(getlength(12))
}

{
  function getlength<T extends any[] | string>(arg: T): number {
    return arg.length
  }
  console.log(getlength("2323232"))
  console.log(getlength(["2323232", '热热']))
}

// ! 5. 泛型与类的结合
class 集合<T> {
  data: T[] = []

  public push(...items: T[]) {
    this.data.push(...items)
  }
}

const 集合1 = new 集合<number>()
const 集合2 = new 集合<string>()
集合1.push(1,2,3,4,5)
集合2.push('1', '2')
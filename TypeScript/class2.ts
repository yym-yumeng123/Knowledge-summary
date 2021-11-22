// ! 1. class protected 受保护的修饰符
{
  class User {
    protected name: string
    public age: number
    constructor(p1: string, p2: number) {
      this.name = p1
      this.age = p2
    }

    protected info(): string {
      return `你的名字${this.name}, 年龄是${this.age}`
    }
  }

  const yy = new User("yym", 2)
  const ym = new User("yym", 18)
  // ym.name 属性“name”受保护，只能在类“User”及其子类中访问
  // ym.info
}

// ! 2. 构造函数使用 ts 泛型
{
  class User<T> {
    constructor(private _user: T) {}
    public get(): T {
      // 返回值
      return this._user
    }
  }

  interface UserProps {
    name: string
    age: number
  }

  const yy = new User<UserProps>({ name: "yym", age: 12 })
  const yy1 = new User("2121")
}


// ! private 使用继承
{
  class Person {
    protected name!: string
    public age!: number
    private site!: string

    protected info() {
      return `${this.name} 的年龄是 ${this.age}`
    }
  }

  class User extends Person {
    constructor(n: string, a: number) {
      super()
      this.name = n
      this.age = a
      // this.site // 私有属性
    }

    public show() {
      return this.info()
    }
  }

  const ym = new User('yym', 12)
  
}
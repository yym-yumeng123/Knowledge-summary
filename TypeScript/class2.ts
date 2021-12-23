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

  const ym = new User("yym", 12)
}

// ! 泛型
{
  interface ArticleInterface<B, C> {
    title: string
    isLock: B
    comments: C[]
  }

  type CommentType = {
    content: string
    author: string
  }

  const yym: ArticleInterface<Boolean, CommentType> = {
    title: "js",
    isLock: false,
    comments: [{ content: "你好", author: "yym" }],
  }
}

// ! readonly
{
  class Axios {
    readonly site: string = "https://www.google.com"
  }
  const instance = new Axios()
  // instance.site = '23232' 只读属性, 无法赋值
}

// ! construcotr

{
  class User {
    public name: string
    constructor(name: string) {
      this.name = this.initName(name)
    }

    initName(name: string) {
      return `${name}是个大好人`
    }
  }
  const yym = new User("杨雨萌")
}

// ! static 静态属性
{
  class User {
    static site: string = "www.example.com"
    public static getSite(): string {
      // return this.site 属性“site”在类型“User”上不存在
      return User.site
    }
  }
  const user = new User()
  // console.log(user.site); 属性“site”在类型“User”上不存在
  console.log(User.site, "user.site")
  console.log(User.getSite(), "User.site")
}

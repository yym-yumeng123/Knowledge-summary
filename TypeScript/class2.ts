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

// ! 单例
{
  class Axios {
    private static instance: Axios | null = null
    private constructor() {}
    static make(): Axios {
      if (Axios.instance == null) {
        console.log("创建Axios实例")

        Axios.instance = new Axios()
      }
      return Axios.instance
    }
  }
  const instance = Axios.make()
  const instance1 = Axios.make()
  const instance2 = Axios.make()
  const instance3 = Axios.make()
}

// ! get set
{
  class User {
    public _name: string
    constructor(name: string) {
      this._name = name
    }
    public get name(): string {
      return this._name.substring(0, 2)
    }
    public set name(value: string) {
      this._name = value
    }
  }

  const a = new User("yym")
  a.name = "yym张三111121212"
  console.log(a.name, "yym")
}

// ! 抽象类 abstract
{
  abstract class Animation {
    abstract move(): void
    abstract name: string
    protected getPos(): number[] {
      return [100, 300]
    }
  }

  // 非抽象类“Tank”不会实现继承自“Animation”类的抽象成员“move”
  class Tank extends Animation {
    name: string = "敌方坦克"
    public move(): void {
      console.log("敌方坦克移动")
    }
  }

  class Player extends Animation {
    name: string = "玩家"
    public move(): void {
      console.log("玩家坦克移动")
    }
  }

  const abstract = new Tank()
  console.log(abstract.move())
}

// ! 接口 interface
{
  // 规范
  interface IAnimation {
    name: string
    move(): void
  }
  abstract class Animation {
    protected getPos(): number[] {
      return [100, 300]
    }
  }

  // implements 实现 工具
  class Tank extends Animation implements IAnimation {
    name: string = "敌方坦克"
    public move(): void {
      console.log("敌方坦克移动")
    }
  }

  class Player extends Animation implements IAnimation {
    name: string = "玩家"
    public move(): void {
      console.log("玩家坦克移动")
    }
  }

  const abstract = new Tank()
  console.log(abstract.move())
}

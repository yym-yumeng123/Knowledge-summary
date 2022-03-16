语言构件: 类class 模块 module 实例变量 instance variable ...

元编程操作的就是这些语言构件

所有这些语言构件存在的系统称之为 对象模型, 在对象模型中: 可以找到诸如: '这个方法来自那个类?' '使用这个模块会发生什么?'

1. 打开类
可以重新打开已经存在的类并对之进行动态修改, 及时像 String 或者 Array这样的标准库也不例外, 这种法术称为 打开类(open class)

2. 打开类的问题
自己定义的, 可能会覆盖原有的方法 (猴子补丁)


### 类的真相
1. 对象中有什么

实例变量: Ruby中对象的类和它的实例变量没有关系, 当给实例变量赋值时, 他们就突然出现了,, 因此,对于同一个类, 可以创建具有不同实例变量的对象

方法: 对象还有方法, 通过调用 Object#methods 方法, 可以获得一个对象的方法列表. 绝大多数的对象都从 Object 继承了一组方法,因此列表很长,
可以调用 Array#grep方法确定 my_method 在 obj对象的方法列表中

一个对象仅包含它的实例变量以及一个对自身类的引用
```rb
class MyClass
  # 没有调用方法, obj对象不会有任何实例变量
  def my_method
    @v = 1
  end
end

obj = MyClass.new
obj.class # MyClass
obj.my_method
obj.instance_variables # [:@v] []
```

实例变量存放在对象中, 方法存在类中
```
object => obj/@v = 1  -> MyClass/my_methods() -> class
```
obj 有一个 my_method 方法, 可以调用 obj.my_method() 方法, 不能说: MyClass 有一个 my_method 方法
为了消除歧义: my_method 是 MyClass 的一个实例方法


> 总结: 一个对象的实例变量存在于对象本身之中, 而一个对象的方法存在于对象自身的类中. 这就是同一个类的对象共享同样的方法, 不共享实例变量的原因


2. 类本身也是对象

既然类本身也是对象,那么适用于对象的规则也就适用于类, 类像其它对象一样,也有自己的类. 它的名字叫做 Class
```rb
'hello'.class # => String
String.class # => Class
```
在 Ruby 中, 可以像操作其他对象一样对类进行操作, 我们会调用 Class.new方法在运行时创建一个类

```rb
Class.instance_methods(false) # => [:allcate, :new, :superclass]

# Array类 继承自 Object 类 数组是对象
Array.superclass # => Object 
# Object 又继承自 BasicObject
Object.superclass # => BasicObject
BasicObject.superclass # => nil
```

**模块**

```rb
# 每个类都是一个模块, 类就是带有三个方法(new allocate superclass)的增强模块
Class.superclass # => Module
```

如果希望代码包含 (include) 到别的代码中, 应该使用模块, 如果希望某段代码被实例化或者被继承, 应该使用类

**类与普通对象**
像普通对象一样,, 类也可以通过引用来访问. 变量可以像引用普通对象一样引用类

my_class = MyClass

**常量**

任何以大写字母开头的引用(包括类名和模块名) 都是常量. 常量和变量最大的区别作用域不同

```rb
module MyModule
  MyConstant = 'outer constants'

  class MyClass
    MyConstant = 'inner constnats'
  end
end
```
常量的路径用双冒号进行分隔

> ------------------------

### 对象和类的小结
什么是对象? => 对象是一组实例变量外加一个指向其类的引用. 对象的方法并不存在对象本身, 而是存在于类中, 在类中, 这些方法被称为类的实例方法

什么是类? => 类就是一个对象外加一组实例方法和一个对其超类的引用


**使用命名空间**
```rb
module Bookworm
  class Text

Bookworm::Text
```


**方法查找**

接收者(receiver)
祖先链(ancestors chain)

接收者就是你调用方法所在的对象, my_string.reverse() => my_string 就是接收者

方法查找: 首先在接收者的类中查找, 然后再顺着祖先链向上查找, 直到找到该方法

**执行方法**

self 关键字: Ruby 的每一行代码都会在一个对象中被执行 - 这个对象就是所谓的当前对象, 当前对象也可以用 self 表示, 因为可以用 self 关键字对它进行访问

调用一个方法时, 接收者就成为 self, 从这一刻, 所有的实例变量都是 self 的实例变量
```rb
class MyClass
  def testing_self
    @var = 10
    my_method()
    self
  end

  def my_method
    @var += 1
  end
end
obj = MyClass.new
obj.testing_self 
# 接收者 obj 成为 self, 实例变量 @var 就是obj对象的实例变量
```
> 私有 private 意味者什么? 不能明确指定接收者来调用私有方法

**细化**
解决打开类的问题:

```rb
module StringExtensions
  refine String do
    def to_xxx
      gsub(/[^\w\s]/, '')
    end
  end
end

using StringExtensions
```


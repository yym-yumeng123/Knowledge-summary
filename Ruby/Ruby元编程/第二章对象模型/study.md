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


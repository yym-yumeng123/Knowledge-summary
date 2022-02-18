Ruby 面向对象

Ruby 是纯面向对象的语言，Ruby 中的一切都是以对象的形式出现。
Ruby 中的每个值都是一个对象，即使是最原始的东西：字符串、数字，甚至连 true 和 false 都是对象
类本身也是一个对象，是 Class 类的一个实例

------------------

Ruby 类定义

类定义以关键字 class 开始, 后跟类名称, 最后以一个 end 进行分隔表示终止该类定义. 例如: 我们使用关键字 class 来定义
Box 类

class Box
  code
end

按照惯例: 名称必须以大写字母开头, 如果包含多个单词, 每个单词首字母大写, 但此间没有分隔符 (CamelCase)

--------------------
定义 Ruby 对象

类提供了对象的蓝图, 基本上, 对象是根据类进行创建的, 我们使用 new 关键字声明类的对象, 下面的语句声明类 Box 两个对象

box1 = Box.new
box2 = Box.new

---------------------
initialize 方法

initialize 方法是一个标准的 Ruby 类方法, 是类的构造函数, 与其他面向对象编程语言中的 constructor 工作原理相似
当你想要在创建对象的同时初始化一些类变量, initialize 有用

class Box
  def initialize(w, h)
    @width, @height = w, h
  end  
end

--------------------
实例变量

实例变量是类属性, 他们在使用类创建时就变成了对象的属性. 每个对象的属性都是单独赋值的, 和其它对象之间不共享, 在类的内部
使用 @ 运算符访问这些属性, 在类的外部, 则是使用称为 访问器方法 和公共方法 来进行访问

class Box
  def initialize w, h
    # 给实例变量赋值
    @width, @height = w, h
  end
end

访问器 getter & 设置器 setter
为了在类的外部读取类中已定义的变量, 我们可以通过定义访问器(getter) 方法来访问
class Box
  # 构造器方法
  def initialize w, h
    # 给实例变量赋值
    @width, @height = w, h
  end

  # 访问器方法
  def printWidth
    @width
  end
  def printHeight
    @height
  end

  # 设置器方法
  def setWidth=(value)
    @width = value
  end

  def setHeight=(value)
    @height = value
  end
end

# 创建对象
box = Box.new 10 ,20

# 使用访问器方法
x = box.printHeight
y = box.printWidth

# 使用设置器方法
box.setWidth = 30
box.setHeight = 50
x1 = box.printHeight()

由于 getter setter 非常有用, Ruby 定义了 attr_accessor:variable_name attr_reader:variable_name
attr_writer:variable_name 三种属性声明方法
其中: accessor = reader + write   变量名前一定要:, 变量名用 , 分割

---------------

实例方法

实例方法的定义与其他方法定义一样, 都是使用 def 关键字, 但它们只能通过类实例来使用

class Box
  def initialize
  end

  def getArea
    @width * @height
  end
end

box = Box.new 10, 20
a = box.getArea()

---------------

类方法 & 类变量

类变量是在类的所有实例中共享的变量, 换句话说, 类变量的实例可以被所有的对象实例访问, 类变量以 @@ 作为前缀
类变量必须在类定义中被初始化, 如下面实例所示

类方法使用 def self.methodname() 定义, 类方法以 end 分割符结尾. 类方法可使用带有类名称的 classname.methodname 形式调用

class Box
  # 初始化类变量
  @@count = 0
  def initialize w,h
    # 给实例变量赋值
    @width, @height = w, h

    @@count +=1
  end

  def self.printCount()
    puts "Box count is: #@@count"
  end
end
b1 = Box.new 10, 20
b2 = Box.new  30, 100

Box.printCount()

----------------------

to_s 方法

您定义的任何类都有一个 to_s 实例方法来返回对象的字符串形式,

class Box
  # 构造器方法
  def initialize w, h
    @width, @height = w, h
  end

  # 定义 to_s 方法
  def to_s
    "(w:#@width,h:#@height)"
  end
end
box = Box.new 10, 20

---------

访问控制

public private protected

public 方法: 可被任意对象调用, 默认下, 方法都是 public 的,除了 initialize 方法总是 private 的
private 方法: 不能从类外部访问或查看. 只有类方法可以访问私有成员
protected 方法: 只能被类及其子类的对象调用, 访问也只能在类及其子类内部进行

class Box
  # 构造器方法
  def initialize w,h
    @width, @height = w, h
  end

  # 实例方法默认是 public 的
  def getArea
    getWidth() * getHeight()
  end

  def getWidth
    @width
  end

  def getHeight
    @height
  end

  private :getHeight, :getWidth

  def printArea
    @area = getHeight() * getWdith()
    puts "#@area"
  end

  protected :printArea
end
box = Box.new 10, 20
a = box.getArea()
puts "#{a}"

box.printArea()

------------------------------
类的继承

继承，是面向对象编程中最重要的概念之一。继承允许我们根据另一个类定义一个类，这样使得创建和维护应用程序变得更加容易

继承有助于重用代码和快速执行，不幸的是，Ruby 不支持多继承, 但是 Ruby 支持 mixins。mixin 就像是多继承的一个特定实现
在多继承中，只有接口部分是可继承的。

当创建类时，程序员可以直接指定新类继承自某个已有类的成员，这样就不用从头编写新的数据成员和成员函数, 这个已有类被称为基类或父类，新类被称为派生类或子类。

Ruby 也提供了子类化的概念，子类化即继承，下面的实例解释了这个概念。扩展一个类的语法非常简单 只要添加一个 < 字符和父类的名称到类语句中即可

# 定义类
class Box
  # 构造器方法
  def initialize(w,h)
    @width, @height = w, h
  end
  # 实例方法
  def getArea
     @width * @height
  end
end

# 定义子类
class BigBox < Box
  # 添加一个新的实例方法
  def printArea
    @area = @width * @height
    puts "Big box area is : #@area"
  end
end


方法重载
虽然您可以在派生类中添加新的功能，但有时您可能想要改变已经在父类中定义的方法的行为。这时您可以保持方法名称不变，重载方法的功能即可

# 定义类
class Box
  # 构造器方法
  def initialize(w,h)
    @width, @height = w, h
  end
  # 实例方法
  def getArea
     @width * @height
  end
end

# 定义子类
class BigBox < Box

  # 改变已有的 getArea 方法
  def getArea
    @area = @width * @height
    puts "Big box area is : #@area"
  end
end

运算符重载

希望使用 + 运算符执行两个 Box 对象的向量加法，使用 * 运算符来把 Box 的 width 和 height 相乘，使用一元运算符 - 对 Box 的 width 和 height 求反

class Box
  def initialize(w,h) # 初始化 width 和 height
    @width,@height = w, h
  end

  def +(other)         # 定义 + 来执行向量加法
    Box.new(@width + other.width, @height + other.height)
  end

  def -@               # 定义一元运算符 - 来对 width 和 height 求反
    Box.new(-@width, -@height)
  end

  def *(scalar)        # 执行标量乘法
    Box.new(@width*scalar, @height*scalar)
  end
end


冻结对象
有时候，我们想要防止对象被改变。在 Object 中，freeze 方法可实现这点，它能有效地把一个对象变成一个常量
任何对象都可以通过调用 Object.freeze 进行冻结。冻结对象不能被修改，也就是说，您不能改变它的实例变量

# 定义类
class Box
  # 构造器方法
  def initialize(w,h)
    @width, @height = w, h
  end

  # 访问器方法
  def getWidth
    @width
  end
  def getHeight
    @height
  end

  # 设置器方法
  def setWidth=(value)
    @width = value
  end
  def setHeight=(value)
    @height = value
  end
end

# 创建对象
box = Box.new(10, 20)

# 让我们冻结该对象
box.freeze
if( box.frozen? )
  puts "Box object is frozen object"
else
  puts "Box object is normal object"
end

# 现在尝试使用设置器方法
box.setWidth = 30
box.setHeight = 50

# 使用访问器方法
x = box.getWidth()
y = box.getHeight()

puts "Width of the box is : #{x}"
puts "Height of the box is : #{y}"


------------------
类常量
可以在类的内部定义一个常量，通过把一个直接的数值或字符串值赋给一个变量来定义的
常量的定义不需要使用 @ 或 @@。按照惯例，常量的名称使用大写

一旦常量被定义，您就不能改变它的值，您可以在类的内部直接访问常量，就像是访问变量一样
但是如果您想要在类的外部访问常量，那么您必须使用 classname::constant

# 定义类
class Box
  BOX_COMPANY = "TATA Inc"
  BOXWEIGHT = 10
  # 构造器方法
  def initialize(w,h)
    @width, @height = w, h
  end
  # 实例方法
  def getArea
     @width * @height
  end
end

box = Box.new
a = box.getArea()
puts Box::BOX_COMPANY

----------------------

使用 allocate(分配) 创建对象

可能有一种情况，您想要在不调用对象构造器 initialize 的情况下创建对象，即，使用 new 方法创建对象
在这种情况下，您可以调用 allocate 来创建一个未初始化的对象

class Box
  attr_accessor :width, :Height

  # 构造器方法
  def initialize(w,h)
    @width, @height = w, h
  end

   # 实例方法
   def getArea
      @width * @height
   end
end

-------------

类信息
Ruby 的 self 和 Java de this有相似之处, 但又大不相同. Java的方法都是在实例方法中引用, 所以this一般都是执行当前对象的
Ruby 逐行执行, 在不同的上下文(context) self 就有了不同的含义

class Box
  puts self.class
  puts self.name
end
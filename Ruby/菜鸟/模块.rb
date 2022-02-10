模块 Module

模块是一种把方法 类和 常量 组合在一起的方式
1. 提供了一个命名空间和避免名字冲突
2. 模块实现了 mixin 装置

模块定义了一个命名空间, 相当于一个沙盒, 里边您的方法和常量不会与其它地方的常量冲突
模块类似于 类, 但又以下不同: 
- 模块不能实例化
- 模块没有子类
- 模块只能被另一个模块定义

module Identifier
  statement1
  statement2
end

模块常量命名与类常量命名类似, 都以大写字母开头. 方法定义看起来也相似: 模块方法与类方法定义类似

通过类方法, 您可以在类方法名称前面放置模块名称和一个点号来调用模块方法, 您可以使用模块名称和两个冒号来引用一个常量

module Trig
  PI = 3.1415
  def Trig.sin(x)
    # ..
  end
  def Trig.cos(x)
  end
end

可以定义多个函数名称相同但是功能不同的模块：
module Moral
  VERY_BAD = 0
  BAD = 1
  # 像类方法，当您在模块中定义一个方法时，您可以指定在模块名称后跟着一个点号，点号后跟着方法名
  def Moral.sin(badness)
    #..
  end
end

# Ruby require 语句
如果一个第三方程序想要使用任何已定义的模块, 则可以简单的使用 Ruby require 语句来加载模块文件

require filename # 文件扩展名 .rb 不是必须的

require 'trig.rb'
require 'moral'

y = Trig.sin(Trig::PI/4)
wrongdoing = Moral.sin(Moral::VERY_BAD)

# Ruby include 语句
您可以在类中嵌入模块, 为了在类中嵌入模块, 您可以在类中使用 include 语句

include modulename

如果模块是定义在一个单独的文件夹中, name在嵌入模块之前就需要使用 require 语句引用改文件

# support.rb
module Week
  FIRST_DAY = 'Sunday'
  def Week.weeks_in_month
    puts "you have four weeks in a month"
  end
  def Week.weeks_in_year
    puts "You have 52 weeks in a year"
  end
end

$LOAD_PATH << '.'
require 'support'
class Decade
  include Week
  no_of_yrs = 10
  def no_of_month
    puts Week::FIRST_DAY
    number = 10 * 12
    puts number
  end
end

d1 = Decade.new
puts Week::FIRST_DAY
d1.no_of_month


# Ruby 中的 mixins
module A
  def a1
  end
  def a2
  end
end

module B
  def b1
  end
  def b2
  end
end

class Sample
  include A
  include B
  def s1
  end
end

模块 A 由方法 a1 和 a2 组成
模块 B 由方法 b1 和 b2 组成
类 Sample 包含了模块 A 和 B
类 Sample 可以访问所有四个方法，即 a1、a2、b1 和 b2
可以看到类 Sample 继承了两个模块，您可以说类 Sample 使用了多重继承或 mixin

samp = Sample.new
samp.a1
samp.a2
samp.b1
samp.b2





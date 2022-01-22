# 类和对象

class Customer
  # 局部变量  方法中定义的变量 方法外不可用  小写字母 或 _开始

  # 实例变量 可以跨任何特定的实例或对对象中的方法使用, 意味着: 实例变量可以从对象到对象的改变 @变量名

  # 类变量 可以跨不同的对象使用 属于类, 且是类的一个属性  @@变量名

  # 全局变量 可以跨类使用的变量, 需要定义全局变量  $变量名

  @@no_of_customers = 0 # 类变量

  # 声明带参数的 new 方法, 需要创建类的同时声明方法 initialize
  # initialize 是一种特殊类型的方法, 将在调用带参数的类的 new 方法执行
  def initialize(id, name, address)
    @cust_id == id
    @cust_name = name
    @cust_address = address
  end
end

# new 方法创建对象
cust1 = Customer.new('1', 'yym', '深圳市')
cust2 = Customer.new('2', '张三', '广东省')
# cust1.initialize

# Ruby 类中的成员函数

class Sample
  # Ruby 中, 函数被称为方法. 类中的每个方法以 关键字 def 开始, 后跟方法名
  # 方法名总是以 小写字母开头,  使用 end 来结束一个方法

  def function
    # statement 1
  end

  def hello
    puts 'Hello Ruby!'
  end
end

obj = Sample.new
obj.hello
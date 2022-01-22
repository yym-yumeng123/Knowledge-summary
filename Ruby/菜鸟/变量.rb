# Ruby 变量

# 变量是持有可被任何程序使用的任何数据的存储位置

=begin
  一般小写字母, 下划线开头: 变量
  $ 开头: 全局变量
  @ 开头: 实例变量
  @@ 开头: 类变量: 被共享在整个继承链中
  大写字母开头: 常数
=end

# Ruby 全局变量

$global_variable = 10
class Class1
  def print_global
    puts "全局变量在 Class1 中输出为 #$global_variable"
  end
end

class Class2
  def print_global
    puts "全局变量在 Class2 中 输出为 #$global_variable"
  end
end

class1Obj = Class1.new
class1Obj.print_global
class2Obj = Class2.new
class1Obj.print_global

# Ruby 实例变量 @开头, 未初始化值为 nil
class Customer
  def initialize(id, name, addr)
    @cust_id=id
    @cust_name=name
    @cust_addr=addr
  end
  def display_details()
    puts "Customer id #@cust_id"
    puts "Customer name #@cust_name"
    puts "Customer address #@cust_addr"
  end
end

# 创建对象
cust1=Customer.new("1", "John", "Wisdom Apartments, Ludhiya")
cust2=Customer.new("2", "Poul", "New Empire road, Khandala")

# 调用方法
cust1.display_details()
cust2.display_details()

# Ruby 类变量 @@开头 必须初始化才能在方法中使用
class Customer1
  @@no_of_customers=0
  def total_no_of_customers()
      @@no_of_customers += 1
      puts "Total number of customers: #@@no_of_customers"
  end
end

# 创建对象
cust1=Customer1.new

# 调用方法
cust1.total_no_of_customers()


# Ruby 局部变量

# 小写字母 _ 开头, 作用域: class module def do 到相应结尾或 大括号{ 到 大括号}
# 当调用一个未初始化的局部变量时, 被解释为调用一个不带参数的方法

# Ruby 常量 大写字母开头, 定义在类或模块内的常量可以从类或模块的内部访问, 定义在类或模块外的常量可以被全局访问
# 常量不能定义在方法内, 引用一个未初始化的常量会产生错误
class Example
  VAR1 = 100
  VAR2= 200

  def show
    puts "第一个常量#{VAR2}"
    puts "第二个常量#{VAR1}"
  end
end

object = Example.new
object.show
Ruby 方法

Ruby 方法用于捆绑一个或多个重复的语句到一个单元中

方法名应该以小写字母开头, 方法应在调用之前定义

def method_name [([arg [= default]]...[, * arg [, $expr ]])]
  expr...
end

# 简单方法
def method_name
  expr...
end

# 接受参数
def method_name (v1, v2)
  expr...
end

# 参数有默认值
def  (v1 = value1, v2 = value2)
  expr...
end

# 调用方法
method_name
method_name 25, 30


# 方法返回值
每个方法默认一个返回值, 这个返回值是最后一个语句的值

def test
  i = 100
  j = 100
  # 返回 k
  k = 0
end

# return 语句
return 语句 用于从 Ruby 方法中返回一个或多个值

return
return 13
return 1,2,3

def test
  i = 100
  j = 200
  k = 300
  return i, j, k
end
var = test
puts var # 100, 200, 300



# 可变数量的局势
def sample (*test)
  puts "参数个数为 #{test.length}"
  for i in 0..test.length
    puts "参数值为 #{test[i]}"
  end
end

sample "Zara", "6", "F"
sample "Mac", "36", "M", "MCA"

# 类方法
当方法定义在累的外部, 方法默认标记为 private, 方法定义在类中, 默认标记为 public
方法默认的可见性和 private 标记可通过 模块 Module 的 public 或 private 改变

当你想要访问类的方法时, 首先需要实例化类, 然后,使用对象, 您可以访问类的任何成员

class Accounts
  def reading_charge
  end
  def Accounts.return_date
    
  end
end

Accounts.return_date

# Ruby alias 语句
这个语句用于为方法或全局变量起别名, 别名不能在方法主体内定义. 即使方法被重写, 方法的别名也保持党发当前定义

alias 方法名 方法名
alias 全局变量 全局变量

alias foo bar
alias $MATCH $&

# undef 语句
用于取消方法定义, undef 不能出现在方法主体内
通过使用 undef 和 alias 类的接口可以从父类独立修改

undef 方法名
undef bar

# 去掉字符串 标点符合 和 特殊符号, 只保留字母 数字和空格
def to_alphanumeric s
  s.gsub(/[^\w\s]/, '')
end

# 打开 String 类 植入
class String
  def to_alphanumeric
    gsub(/[^\w\s]/, '')
  end
end

String.to_alphanumeric

3.times do
  class C
    puts 'hello'
  end
end

# 第一次定义这个类
class D
  def x
    'x'
  end
end

# 第二次重新打开这个类, 定义 y 方法
class D
  def y
    'y'
  end
end

class Numeric
  def to_money(currency = nil)
    # TODO...
  end
end

[].methods.grep /^re/
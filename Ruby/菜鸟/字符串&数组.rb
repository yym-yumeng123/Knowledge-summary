Ruby 中 String 对象用于存储或操作一个或多个字节的序列
Ruby 字符串分为单引号 ('') 和 双引号 ("") 字符串, 区别在于双引号能够支持更多的转义字符

# 单引号字符串

'这是一个 RUby 程序的字符串'

'Wont\'t 有 need read o\'reallly'

# 双引号字符串

"#{}" 来计算表达式

name = 'joe'
name2 = 'mary'

puts "您好 #{name}, #{name2} 在哪"

x,y,z = 12, 36, 72
puts "x 的值为 #{x}"
puts "x + y 的值为 #{x+ y}"


# 字符串内建方法
有一个 String 对象的实例来调用String方法
new [String.new(str = '')]

myStr = String.new('THIS IS TEST')
foo = myStr.downcase

puts "#{foo}"


--------------------------------


Ruby 数组是任何对象和有序整数索引集合, 数组中每个元素都与一个索引相关, 并可通过索引获取
数组的索引从 0 开始, 一个负数的索引相对于数组的末尾计数的, 也就是说, 索引为 -1 表示数组的最后一个元素
Ruby 数组可存储诸如 String Interger Fixnum Hash Symbol等对象, 甚至可以是其他 Array 对象

Ruby 数组不许粤菜指定大小, 当向数组添加元素时, Ruby 数组会自动增长

# 创建数组

1. new 类方法
names = Array.new
names = Array.new(20)
puts names.length
puts names.size

names = Array.new(4, 'mac')
puts "#{names}" # ["mac", "mac", "mac", "mac"]

nums = Array.new(10) { |e| e = e * 2 }
puts "#{nums}"

2. [] 方法
nums = Array.[](1,2,3,4,5)
nums = Array[1,2,3,4,5]

digist = Array(0..9)
puts "#{digist}" # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
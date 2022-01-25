# Ruby 注释

注释是在运行时会被忽略的 Ruby 代码内的注释行, 单行注释以 '#' 字符开始, 直到该行结束

# 这是一个单行注释
puts 'Hello Ruby!'


=begin
这是一个多行注释
可以扩展任意行
=begin =end 只能出现第一行和最后一行
=end

a   # addr
bbb # 323

------------------------------------------------


# Ruby 判断

# if...else

# if 条件执行 false 和 nil 为假, 其他值都为真
if condition [then]
  code
elseif conditional [then]
  code
else
  code
end


if a == 4 then a = 7 end

x = 10
if x > 2
  puts 'x 大于 2'
elseif x <= 2 and x != 0
  puts 'x ui 1'
else 
  puts '无法的值 x 的值'
end


# Ruby if 修饰符
$debug = 10
print '2121' if $debug


# Ruby unless 语句

#  unless 和 if 相反, 即如果 conditional 为假, 则执行code, 如果 为真, 则指向 else 句子里的 code
unless conditional [then]
  code
else
  code
end

x = 1
unless x > 2
    puts 'x 大于 2'
  else
    puts 'x 小于 2'
end

# Ruby unless 修饰符
code unless conditional

$var =  1
print "1 -- 这一行输出\n" if $var
print "2 -- 这一行不输出\n" unless $var

$var = false
print "3 -- 这一行输出\n" unless $var


# Ruby case 语句

# case 先对一个 expression 进行匹配判断, 根据匹配结果进行分支选择
# 它使用 === 运算符比较 when 指定的 expressions, 一致的话就执行 when 部分的内容
case expressions
[when expressions [, expressions ...] [then]
  code]..
[else
  code ]
end

case expr0
when expr1, expr2
  stmt1
when expr3, expr4
  stmt2
else 
  stmt3
end

# 实例
$age = 5
case $age
when 0..2
  puts '婴儿'
when 3..6
  puts '小孩'
when 7..12
  puts 'child'
when 13..18
  puts '少年'
else
  puts '其它年龄段的'
  
end

# 当case的"表达式"部分被省略时，将计算第一个when条件部分为真的表达式。
foo = false
bar = true
quu = false

case
when foo then puts 'foo is true'
when bar then puts 'bar is true'
when quu then puts 'quu is true'
end
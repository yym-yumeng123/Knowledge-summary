Ruby 范围

范围无处不在, a -> z, 0 -9, 等等, Ruby 支持范围, 并允许我们以不同的方式使用范围
- 作为序列的范围
- 作为条件的范围
- 作为间隔的范围

# 作为序列的范围
范围第一个也是最常见的用途是表达序列, 序列有一个起点, 一个终点和一个在序列产生连续值的方式

Ruby 使用 '..' 和 '...' 范围运算符创建这些序列
1..5 # 1 2 3 4 5
1...5 # 1 2 3 4
'a'..'d' # a b c d

可以使用 to_a 方法把范围转换成列表

range1 = (1..10).to_a  # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
range2 = ('bar'..'bat').to_a # ["bar", "bas", "bat"]

范围实现了让您便利他们的方法, 您可以通过多种方式检查他们的内容

digist = 0..9
digist.include?(5)
digist.min
digist.max
digist.reject {|i| i < 5 }

# 作为条件的范围
范围也可以作为条件代表式. 

while gets
  print if /start/../end/
end

score = 70
result = case score

when 0..40
  '糟糕的分数'
when 41..60
  '快及格了'
when 61..70
  '及格'
when 71..100
  '良好分数'
else
  '错误的分数'
end


# 作为间隔的范围
范围的最后一个作用是间隔检测, 检测指定是否在指定的范围内, 需要使用 === 相等运算符来完成计算
if (1..10) === 5
  puts "5 在(1..10)"
end



Ruby 迭代器

迭代(iterate)指的是重复做同样的事, 所以迭代器就是用来重复多次相同的事

迭代器是集合支持的方法, 存储一组数据成员的对象称为集合, 在 Ruby 中, 数组Array 和 哈希 Hash 可以称之为集合

迭代器返回集合的所有元素, 一个接着一个,  我们讨论 each collect

Ruby each 迭代器
each 迭代器返回数组或哈希的所有元素

collection.each do |variable|
  code
end

为集合中每个元素执行code, 在这里, 集合可以是数组的哈希

arr = [1,2,3,4,5]
arr.each do |i|
  puts i
end

Ruby collect 迭代器
collection = collection.collect
collect 方法不需要总是与一个块关联, collect方法返回整个集合, 不管他是数组还是哈希

a = [1,2,3,4,5]
b = Array.new
b = a.collect{|x|x}
puts b

注意: collect 方法不是数组间进行复制的正确方式, 这里有另一个称为 clone 的方法，用于复制一个数组到另一个数组
当您想要对每个值进行一些操作以便获得新的数组时，您通常使用 collect 方法

a = [1,2,3,4,5]
b = a.collect{|x| 10*x}
puts b
Ruby 哈希

哈希(Hash) 是类似 "key" => "value" 这样的键值对集合, 哈希类似于一个数组, 只不过它的索引不局限于使用数字.

Hash 的索引(或者叫 "键") 几乎可以是任何对象

Hash 虽然和数组类似, 但却有一个很重要的区别: Hash 元素没有特定的顺序, 如果顺序重要就要使用数组了

# 创建 Hash
1. new 类方法
months = Hash.new

months = Hash.new("months")
months = Hash.new "months"

当您访问带有默认值的哈希中的任意键时, 如果键或值不存在, 访问哈希将返回默认值
months = Hash.new "months"
puts "#{months[0]}"
puts "#{months[72]}"

H = Hash["a" => 100, "b" => 200]
puts "#{H['a']}"
puts "#{H['b']}"

可以使用任何的 Ruby 对象作为键或值, 甚至可以使用数组
[1, "jan"] => "january"

# Hash 内置方法
需要调用 Hash 方法, 需要先实例化一个Hash 对象, 下面创建 Hash 实例的方式
1. Hash[[key => |, value]*]
2. Hash.new Hash.new(obj)
3. Hash.new { |hash, key| block }

填充

months = Hash.new "month"
months = {"1" => "january", "2" => "February"}
keys = months.keys

------------------------------------------------------

Ruby 日期 & 时间

Time 类在 Ruby 中用于表示日期和时间, 它是基于操作系统提供的 系统日期和时间之上

# 创建当前日期和时间

t1 = Time.new
puts "当前时间: " + t1.inspect # 2022-02-14 11:49:44.045458 +0800
# Time.now 功能相同
t2 = Time.now

获取 Date & Time 组件
time = Time.new
time.inspect
time.year
time.month
time.day


Time.utc Time.gm Time.local 函数 可用于标准格式的日期
Time.local(2008, 7,8)
Time.utc(2008, 4,6,7,8)
Time.gm(2008, 7, 8, 9 ,10 ,11)


Time.new.to_a
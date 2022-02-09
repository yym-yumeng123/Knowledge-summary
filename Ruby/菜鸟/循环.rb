# while 语句

# 为真时, 执行code
while conditional [do]
  code
end

while conditional [:]
  code
end

$i = 0
$num = 5

while $i < $num do
  puts "在循环语句中 i = #$i"
  $i += 1
end

# while 修饰符
code while conditional

# 或者

begin
  codes
end while conditional

# 如果 while 修饰符跟在一个没有 rescue 或 ensure 子句的 begin 语句后面. code 会在 conditional 判断之前执行一次

$i = 0
$num = 5

begin
  puts "在循环语句中 i = #$i"
  $i+=1
end while $i < $num

# until 语句

# conditional 为假时, 执行 code
until conditional do
  code
end


$i = 0
$num = 5

until $i > $num do
  puts "在循环语句中 i = #$i"
  $i += 1
end

# until 修饰符
code until conditional

# 或者

begin
  code  
end until conditional

# for 语句

for variable [, variable ...] in expression [do]
  code
end

# for 循环不会为局部变量创建一个新的作用域
for i in 0..5
  puts "局部变量的值为 #{i}"
end

(0..5).each do |i|
  puts "局部变量的值为: #{i}"
end

# break 语句

# 终止最内部的循环, 如果在块内调用, 则终止相关的方法(方法返回 nil)
break

for i in 0..5
  if i > 2 then
    break
  end
  puts "局部变量的值: #{i}"
end

# next 语句

# 调到循环的下一个迭代, 如果在块内调用, 则终止块的执行
next

for i in 0..5
  if i < 2 then
    next
  end
  puts "局部变量的值: #{i}"
end

# redo 语句

# 重新开始最内部循环的盖茨迭代, 不检查循环条件, 如果在块内调用, 则重新开始 yield 和 call
for i in 0..5
  if i < 2 then
    # 并会进入一个无限循环
    puts "局部变量的值: #{i}"
    redo
  end
end
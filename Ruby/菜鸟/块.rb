Ruby 有一个块的概念
1. 块由大量的代码组成
2. 您需要给块去个名字
3. 块中的带代码总是包含在大括号内{}
4. 块总是从与其具有相同名称的函数调用, 意味着如果您的块名称为 test, name您使用函数 test 来调用这个块
5. 可以使用 yield 语句来调用块

block_name{ 
  statement1
  statement2
}


# yield 语句
def test
  puts '在 test 方法内'
  yield # 调用同名的 块
  puts '您又回到了 test 方法内'
  yield
end

test { puts '您在块内'}

def test
  yield 5 # yiled 语句后面跟着 参数
  puts "在 test 方法内"
  yield 100
end
test {|i| puts "你在块 #{i} 内"}

# 多个参数
yield a, b
test {|啊, b| statement}

# 块和方法
已经看到块和方法之间是如何相互关联的。您通常使用 yield 语句从与其具有相同名称的方法调用块
def test
  yield
end
test{ puts "Hello world"}


# BEGIN END
每个 Ruby 源文件可以声明当文件被加载时要运行的代码块（BEGIN 块），以及程序完成执行后要运行的代码块（END 块）。
BEGIN { 
  # BEGIN 代码块
  puts "BEGIN 代码块"
} 

END { 
  # END 代码块
  puts "END 代码块"
}
  # MAIN 代码块
puts "MAIN 代码块"

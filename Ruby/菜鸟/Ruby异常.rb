异常和执行总是被联系在一起, 

如果异常发生, 则程序停止, 异常用于处理各种类型的错误, 这些错误可能在程序执行期间发生, 所以要采取适当的行动, 而不至于让程序
完全停止

Ruby 提供了一个完美的处理异常的机制, 所以我们在 begin/end 块中附上可能抛出异常的代码, 并使用 resuce 子句告诉 Ruby
完美要处理的异常类型

# 语法
begin #开始
  raise.. # 抛出异常
rescue [EcpectionType = StandardExpection] # 捕获指定类型的异常默认值是 StandardExpection
  $i # 表示异常信息
  $@ # 表示异常出现的代码位置
  else # 其余异常

  ensure # 不管有没有异常, 进入该代码块

end # 结束

begin -> rescue 一切受保护的, 如果代码块执行期间发生了异常, 控制会传到 rescue 和 end 之间的块
对于 begin 块中的每个 rescue 子句, Ruby把抛出的异常与每个参数进行轮流比较

begin
  file = open('...')
  if file
    puts 'File opened successfully'
  end

rescue 
  file = STDIN  
end
print file, '==', STDIN, '\n'


# 使用 retry 语句
可以使用 rescue 块补获异常, 然后使用 retry 语句从开头开始执行 begin 块

语法
begin
  # 这段代码抛出的异常被下面的 rescue 子句捕获
rescue
  # 这个块将捕获所有类型的异常
  retry # 这将把控制一道begin 的开头
end

begin
  file = open('/...')
  if file 
    puts 'success'
  end
rescue
  fname = 'existant_file'
  retry
end
1. 打开时发生异常, 跳到 rescue, fname被重新赋值, 通过 retry跳到 begin 的开头
2. 这次文件成功打开, 继续基本的过程

注意：如果被重新命名的文件不存在，本实例代码会无限尝试。所以异常处理时，谨慎使用 retry。

------------

# raise 语句

简单地重新抛出当前异常（如果没有当前异常则抛出一个 RuntimeError）。这用在传入异常之前需要解释异常的异常处理程序中
raise

创建一个新的 RuntimeError 异常，设置它的消息为给定的字符串。该异常之后抛出到调用堆栈
raise 'Error Message'

使用第一个参数创建一个异常，然后设置相关的消息为第二个参数
raise ExceptionType, 'Error Message'

与第三种形式类似，您可以添加任何额外的条件语句（比如 unless）来抛出异常
raise ExceptionType, "Error Message" condition

begin  
  puts 'I am before the raise.'  
  raise 'An error has occurred.'
  puts 'I am after the raise.'
rescue  
  puts 'I am rescued.'  
end  
puts 'I am after the begin block.'

begin  
  raise 'A test exception.'  
rescue Exception => e
  puts e.message  
  puts e.backtrace.inspect  
end


----------------

使用 ensure 语句

有时候，无论是否抛出异常，您需要保证一些处理在代码块结束时完成。例如，您可能在进入时打开了一个文件，当您退出块时，您需要确保关闭文件。


ensure 子句做的就是这个。ensure 放在最后一个 rescue 子句后，并包含一个块终止时总是执行的代码块

它与块是否正常退出、是否抛出并处理异常、是否因一个未捕获的异常而终止，这些都没关系，ensure 块始终都会运行

begin 
  #.. 过程
  #.. 抛出异常
rescue 
  #.. 处理错误 
ensure 
  #.. 最后确保执行
  #.. 这总是会执行
end

begin
  raise 'A test exception.'
rescue Exception => e
  puts e.message
  puts e.backtrace.inspect
ensure
  puts "Ensuring execution"
end

----------------

使用 else 语句

如果提供了 else 子句，它一般是放置在 rescue 子句之后，任意 ensure 之前。
else 子句的主体只有在代码主体没有抛出异常时执行

  begin 
    #.. 过程 
    #.. 抛出异常
 rescue 
    #.. 处理错误
 else
    #.. 如果没有异常则执行
 ensure 
    #.. 最后确保执行
    #.. 这总是会执行
 end

 begin
  # 抛出 'A test exception.'
  puts "I'm not raising exception"
 rescue Exception => e
   puts e.message
   puts e.backtrace.inspect
 else
    puts "Congratulations-- no errors!"
 ensure
   puts "Ensuring execution"
 end


----------------

Catch 和 Throw

raise 和 rescue 的异常机制能在发生错误时放弃执行，有时候需要在正常处理时跳出一些深层嵌套的结构, 此时 catch 和 throw 就派上用场了

catch 定义了一个使用给定的名称（可以是 Symbol 或 String）作为标签的块。块会正常执行直到遇到一个 throw

throw :lablename
#.. 这不会被执行
catch :lablename do
#.. 在遇到一个 throw 后匹配将被执行的 catch
end

throw :lablename condition
#.. 这不会被执行
catch :lablename do
#.. 在遇到一个 throw 后匹配将被执行的 catch
end

# 类 Exception

Ruby 的标准类和模块抛出异常。所有的异常类组成一个层次，包括顶部的 Exception 类在内。下一层是七种不同的类型

Interrupt
NoMemoryError
SignalException
ScriptError
StandardError
SystemExit

Fatal 是该层中另一种异常，但是 Ruby 解释器只在内部使用它。

实例

class FileSaveError < StandardError
  attr_reader :reason
  def initialize reason
    @reason = reason
  end
end

File.open(path, 'w') do |file|
begin
  # 写出数据
rescue
  # 发生错误
  raise FileSaveError.new($i)
end


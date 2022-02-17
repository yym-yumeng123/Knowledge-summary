Ruby 文件的输入和输出
Ruby 提供了一整套 I/O 相关的方法, 在内核模块中实现. 所有的I/O 方法派生自 IO 类.

类 IO 提供了 所有基础的方法, read write gets puts readline printf

# puts 语句
puts 语句只是程序显示存储在变量中值, 这将在每行末尾加一个新行

var1 = '111'
puts var1


# gets 语句
gets 语句用于获取来自名为 STDIN 的标准屏幕的用户输入

puts '32323'
var = gets
puts val

# putc 语句
putc 语句可用于一次输出一个字符

str = "Hello Ruby"
putc str

# print 语句
print 与 puts 类似, puts 输出内容后回调到下一行, 而是用print 光标定位在同一行



# 打开和关闭文件

File.new

可以使用 File.new 方法创建一个 File 对象用于读取 写入或者读写, 读写权限取决于 mode 参数. 
最后, 使用 File.close 方法来关闭该文件

aFile = File.new("filename", "mode")
  # ... 处理文件
aFile.close

File.open 方法

可以使用 File.open 方法创建一个新的 file 对象, 并把该 file 对象赋值给文件
但是, File.new 和 FIle.open方法之间有一点不同, 不通电是 File.open 方法可与块关联, 而 File.new 方法不能

File.open('filename', "mode") do |aFile|
  # ... process the file
end

mode: r => 只读模式; r+ => 读写模式; w => 只写模式; w+ => 读写模式; a => 只写模式; a+ => 读写模式


sysread 方法
可以使用 sysread 来读取文件的内容, 当使用 sysread, 可以使用任意一种模式打开文件

aFile = File.new 'input.txt', 'r'
if aFile
  content = aFile.sysread 20
  puts content
 else
   puts "unable to open file"
 end
end


syswrite 方法

可以使用 syswrite 来向文件写入内容, 当使用方法 syswrite 时, 需要写入模式打开文件,

aFile = File.new("input.txt", "r+")
if aFile
  aFile.syswrite("ABCDEF")
else
  puts "Unable to open file"
end

each_byte 方法
方法属于类 File, 方法 each_byte 是个可以迭代字符串中每个字符

aFile = File.new("input.txt", "r+")
if aFile
  aFile.syswrite("ABCDEF")
  aFile.rewind
   aFile.each_byte {|ch| putc ch; putc ?. }
else
   puts "Unable to open file!"
end

# IO.readlines 方法
类 File 是 类 IO 的一个子类, 类 IO 也有一些用于操作文件的方法
IO.readlines 是 IO 类的一个方法, 跟该方法逐行返回文件的内容

arr = IO.readlines('input.txt')
puts arr[0]
puts arr[1]

# IO.foreach 方法
改方法也是逐行返回输出, 方法 forEach 与方法 readlines 之间不同的是, 方法 foreach 与块相关联,
方法 foreach 不是返回一个数组

IO.foreach('input.txt'){|block| puts block}

# 重命名 与删除文件

rename delete

File.rename('test.txt', 'test2.txt')

File.delete('text2.txt')

# 文件模式与所有权

使用带有掩码的 chmod 方法来改变文件的模式或权限/访问列表

file = File.new("test.txt", 'w')
file.chmod(0755)

# 文件查询

文件是否存在
File.open('file.rb') if File::exists?('file.rb')

查询文件是否确实是一个文件
File.file?('text.txt')

检查给定的文件名是否是一个目录
File::directory?('/usr/local/bin') # => true
一个文件
File::directory?("file.rb") # => false

检查可读
File.readable? 'text.txt'
检查可写
File.writable? '文件名'
检查可执行
File.executable '文件名'
检查文件大小是否为0
File.zero? '文件名'

返回文件大小
File.size? '文件名'

检查文件类型
File::ftype('文件名')


# Ruby 目录
所有的文件都是包含在目录中, Ruby 提供了处理文件和目录的方式, File类用于处理文件, Dir 类用于处理目录

浏览目录

为了在 Ruby 程序中改变目录, 使用 Dir.chdir
Dir.chdir('usr/bin') # 改变当前目录为 /use/bin
Dir.pwd # 查看当前目录

Dir.entries('usr/bin').join('') # 获取指定目录内的文件和目录列表
Dir.foreach('usr/bin') do |entry|
  puts entry
end

获取目录列表的一个更简洁的方式是通过使用 Dir 的类数组的方法

Dir['usr/bin/*']


创建目录
Dir.mkdir('mynewdir')

删除目录
Dir.delete('test.')


创建文件 & 临时目录

临时文件是那些执行过程中被简单的创建, 但不会永久性存储的信息
require 'tempfile'
f = Tempfile.new('tingtong')
f.puts "Hello"
puts f.path
f.close

aFile = File.new("input.txt", "r+")

if aFile
  aFile.syswrite("杨雨蒙写入文件内容")
else
  puts "Unable to open file"
end

if aFile
   aFile.syswrite("ABCDEF")
   aFile.rewind
   aFile.each_byte {|ch| putc ch; putc ?. }
else
   puts "Unable to open file!"
end
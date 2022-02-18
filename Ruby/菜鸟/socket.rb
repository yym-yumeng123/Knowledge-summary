require 'socket'
hostname = 'localhost'
port = 2000

s = TCPSocket.open(hostname, port)

while line = s.gets
  puts line.chop # 打印到终端
end

s.close
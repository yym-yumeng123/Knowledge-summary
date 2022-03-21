# Docker 入门

1. 运行第一个容器
```bash
# docker run 创建容器
# -i 保证容器中的 STDIN 是开启的
# -t 告诉Docker为要创建的容器分配一个伪 tty 终端
# -i -t 才能提供一个交互式shell,  能与之交互的容器
# /bin/bash 使用bash shell 交互
# ubuntu 告诉 Docker 基于什么镜像创建容器

# Docker 先检查本地是否存在 ubuntu 镜像, 本地没有, 链接 DockerHub, 找到下载保存到本地宿主机
# 该容器拥有自己的网络, IP地址, 以及一个用来和宿主机进行通信的桥接网络接口
docker run -i -t ubuntu /bin/bash
```

2. 使用容器
```bash
hostname # 检查容器的主机名 ffe4845a6878 , 我自己 docker 创建的

cat /etc/hosts  # docker 已在 hosts文件中为该容器添加了一条主机配置项
# 127.0.0.1       localhost
# ::1     localhost ip6-localhost ip6-loopback
# fe00::0 ip6-localnet
# ff00::0 ip6-mcastprefix
# ff02::1 ip6-allnodes
# ff02::2 ip6-allrouters
# 172.17.0.2      ffe4845a6878

ps -aux # 检查容器进程
# USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
# root         1  0.0  0.0   4236  3460 pts/0    Ss   03:16   0:00 /bin/bash
# root        14  0.0  0.0   5900  2844 pts/0    R+   03:19   0:00 ps -aux

apt-get update && apt-get install vim # 安装软件包
```

3. docker ps 命令
```bash
docker ps # 正在运行的容器
docker ps -a # 列出所有容器
docker ps -l # 最后一个运行的容器
```

4. 容器命名
```

```
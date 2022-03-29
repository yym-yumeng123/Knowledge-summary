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
Docker 会为我们创建的每一个容器生成一个随机的名字, 如果想要自己指定名字 `--name`
```bash
# a-z A-Z 0-9 _ . -
docker run --name yym_test -it ubuntu /bin/bash
```

5. 启动已经停止的容器
```bash
docker start yym_test
docker start 1212dfd
docker restart yym_start

docker ps
```

6. 附着到容器上
```bash
# 重新附着到正在运行的容器

docker attach yym_test
docker attach aa3f
```
7. 创建守护式容器

除了交互式运行的容器, 可以创建长期运行的容器,  守护容器, 没有交互会话, 

```bash
# -d 容器会在后台运行
docker run --name yym -d ubuntu /bin/sh -c "while true; do echo hello world; sleep 1; done"

docker logs yym # 获取容器日志
```

8. 查看容器内的进程

```bash
# 查看守护式容器的进程
docker top yym_test

# 查看统计信息
docker stats # 看到 CPU 内存 网络 I/O 等
# CONTAINER ID   NAME              CPU %     MEM USAGE / LIMIT     MEM %     NET I/O     BLOCK I/O   PIDS
# 7fa49aa1d47c   recursing_gould   0.00%     23.59MiB / 12.38GiB   0.19%     866B / 0B   0B / 0B     7
```

9. 在容器内部运行进程

在容器内运行的进程有两种类型, 后台任务, 交互式任务
```bash
# -d 表名需要运行一个后台进程
docker exec -d yym_test touch /etc/*

docker exec -it yym_test /bin/bash
```

10. 停止守护进程
```bash
# 会向 docker 容器进程发送 SIGTERM 信号
docker stop yym_test
docker stop c2c122

docker kill

# 查看已停止的容器
docker ps -n x # 最后x 个容器
```

11. 自动重启容器

如果由于某种错误导致容器停止运行, 可以通过 `--restart 标志` 重新启动该容器

```bash
# --restart => always : 无论容器退出代码是啥, 都会自动重启
docker run --restart=always --name yym_test1 ubuntu ...

# 当容器退出代码 非 0 , dcoker 尝试重启该容器5次
--restart=on-failure:5
```

12. 深入容器

比 `docker ps ` 获取更多信息
```bash
docker inspect name

# 返回运行状态
dokcer inspect --format="{{ .State.Running }}" yym_test false
```

13. 删除容器
```bash
docker rm yym

# docker ps 现有的全部容器 -q 只返回容器id
docker rm `docker ps -a -q`
```
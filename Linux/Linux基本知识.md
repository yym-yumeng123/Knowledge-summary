# 基本命令
```shell
# 查看帮助
man cp
man ls 

# 相对路径: 基于当前位置的目标文件路径
# . 表示当前面霜是  ./name
# .. 表示当前目录的父目录 ../name
cd 绝对路径/相对路径 # 切换当前目录

pwd  # 显示会话的当前目录

# 按字母排序 (列排序)
ls # 当前目录下的文件和目录 
ls -F # 区分文件和目录
ls -a # 隐藏文件和普通文件目录一起显示
ls -R # 列出了当前目录下包含的子目录中的文件
ls -R -F  
ls -RF
ls -l # 显示附加信息
ls -i # 显示 inode 编号

# 创建空文件
touch test_one.html

# 复制文件
cp source destination
cp a a.html # 复制成一个新文件
cp -i a a.html # 询问是否覆盖
cp /etc/xxx . # 当前
cp -R Script/ mod_Script # 递归复制整个目录内容


```

### 制表符自动补全

### 链接文件

如需在系统上维护同一文件的多份副本, 还可以保存多个虚拟副本(链接)

- 符号链接 => 实实在在的文件, 指向存放虚拟目录结构中某个地方的另一个文件
```zsh
ln -s a.html xx_a.html
ls -al # => xx_a.html -> a.html
```
- 硬链接 会创建独立的虚拟文件
```zsh
ln code_file h1_code_file
```

### 重命名文件
重命名文件称为移动 `mv`

```shell
mv a a.html # 只影响文件名

mv fzll Picture/  # 移动到某文件夹下

mv Mod_Script Old_Script # 移动整个目录
```

### 删除文件
删除也叫移除(removing) `rm`

```zsh
rm -i fall  # -i 提示是否删除该文件
rm -f file/ # 强制删除文件
```
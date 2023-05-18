### git 区域

- 工作区
- 暂存区
- 本地仓库
- HEAD 指向分支提交的最新节点


### git reset 回退版本

> git reset 有三种模式

1. `git reset --soft`

- 回退到某一个版本, 并且保留工作区和暂存区的所有修改内容

2. `git reset --hard`

- 回退到某一个版本, 并且丢弃工作区和暂存区的所有修改内容

3. `git reset --mixed(默认参数)`

- 回退到某一个版本, 保存工作区的修改内容, 丢弃暂存区的修改内容

```bash
git reset --soft 版本id
git reset --hard 版本id
git reset 版本id
```


### git reflog 查看历史操作记录

### git diff 差异

```bash
git diff # 工作区和暂存区的差异

git diff HEAD # 工作区和版本库之间的差异

git diff --cached # 暂存区和版本库的差异

git diff id1 id2 # 两个版本之间的差异

git diff HEAD HEAD~ # 比较当前版本和上一个版本之间的差异

git diff HEAD^2 HEAD
```

### git rm 删除文件

```bash
git rm 文件
```

### .gitignore 忽略文件

提交时忽略一些文件


### 关联本地仓库和远程仓库

```bash
git romote add origin 远程仓库地址

git remote -v # 查看当前仓库所对应的远程仓库的别名和地址


git push -u origin main(:main)


git pull <远程仓库名> <远程分支名>:<本地分支名>
git pull origin main
git pull

git fetch # 获取远程仓库的修改, 并不会自动合并到本地仓库中
```

### 分支操作 Branch

```bash
git branch # 查看当前仓库的所有分支

git branch dev # 创建一个新的分支

git checkout dev # 切换到 dev 分支
git switch dev # 专门切换分支 (新版本)

git merge dev # merge 后面的 dev, 是将要被合并的分支, 当前所在分支就是合并后的目标分支
# merge 会产生一次提交

git branch -d dev # 删除分支
git branch -D dev # 删除分支
```



### 回退和 rebase

Git中, 每个分支都有一个指针, 在执行 rebase 操作中, git 辉县找到目标分支和当前分支的共同祖先, 移动到目标分支的后面, 把分叉点都移植到目标分支的后面

```bash
# dev 分支变基到 main
git switch dev
git rebase main

# main 分支变基
git rebase dev
```

rebase & merge

- merge 会产生额外的提交记录
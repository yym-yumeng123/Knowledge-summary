RubyGems 是Ruby 的一个包管理器, 它提供了一个奋发 Ruby 程序和库的 标准格式,还提供一个管理程序包安装的工具

RubyGems 旨在方便地管理 gem 安装的工具，以及用于分发 gem 的服务器
类似于 Ubuntu 下的apt-get, Centos 的 yum，Python 的 pip。


Gem

Gem 是 Ruby 模块 (叫做 Gems) 的包管理器。其包含包信息，以及用于安装的文件

gem命令

gem 命令用于构建 上传 下载以及安装 Gem 包

gem 用法

gem install mygem # 安装
gem uninstall mygem # 卸载
gem list --local  # 已安装的 gem
gem list --remote  # 可用的 gem

gem rdoc --all 为所有的 gems 创建 RDoc 文档

gem fetch mygem # 下载一个 gem, 但不安装

gem search STRING --remote # 从可用的 gem中搜索


--------

gem 包的构建

修改国内源

gem sources -l
gem sources --remove https://rubygems.org/
gem sources -a https://gems.ruby-china.com/

gem sources -l

gem install rails

如果你使用 Gemfile 和 Bundle (例如：Rails 项目)

bundle config mirror.https://rubygems.org https://gems.ruby-china.com/
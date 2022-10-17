> 前端工程化离不开 npm(node package manager) 或者 yarn 这些管理工具, npm 或者 yarn 在工程项目中, 除了负责依赖的安装和维护以外, 还能通过 npm script 串联起各个只能部分, 让独立的环节自动运转起来

- 项目依赖出现问题时，删除大法好，即删除 node_modules 和 lockfiles，再重新 install，这样操作是否存在风险？
- 把所有依赖都安装到 dependencies 中，不区分 devDependencies 会有问题吗？
- 我们的应用依赖了公共库 A 和公共库 B，同时公共库 A 也依赖了公共库 B，那么公共库 B 会被多次安装或重复打包吗？
- 一个项目中，既有人用 npm，也有人用 Yarn，这会引发什么问题？
- 我们是否应该提交 lockfiles 文件到项目仓库呢？

### npm 内部机制和核心原理

npm 最重要的一环是安装和维护依赖

### npm 的安装机制和背后思想

npm 的安装机制非常值得探究。Ruby 的 Gem、Python 的 pip 都是全局安装，但是 npm 的安装机制秉承了不同的设计哲学

它会优先安装依赖包到当前项目目录, 使得不同应用项目的依赖各成体系, 同时还减轻了包作者 API 兼容的压力, 缺陷也很明显: 如果我们项目 a 和项目 b,都依赖了相同额公共库 c, 公共库 c 被安装两次, 这说明, **同一个依赖包可能在我们电脑上进行多次安装**

1. npm install => 检查 config => 有无 lock 文件

1.1 有 lock 文件

```js
有 lock 文件 => 是否和 `package.json` 声明版本不一致

一致 => 检查缓存

不一致 =>
npm v5.0.x, 根据 package-lock.json 下载
npm v5.1.0 - v5.4.2: 当package.json声明的依赖版本规范有符合的更新版本时, 忽略 package-lock.json, 按照 package.json 安装, 并更新 package-lock.json
npm v5.4.2 以上: 当 package.json 声明的依赖版本规范与 package-lock.json 安装版本兼容, 则根据 lock.json 安装, 如果不兼容, 按照 package.json 安装, 并更新 package-lock.json

=> 一致 => 检查缓存
```

1.2 无 lock 文件 => 获取报信息 => 构建依赖树(扁平化)

2. 检查缓存
   2.1 有缓存 => 解压到 node_modules 生产 lock 文件
   2.2 无缓存 => 下载资源包 => 检查完整性 => 添加到缓存

**同一个项目团队，应该保证 npm 版本的一致。**

### npm 缓存机制

对于一个依赖包的同一版本进行本地化缓存，是当代依赖包管理工具的一个常见设计

```js
npm config get cache // 得到缓存位置

npm cache clean --force // 清楚 cache 文件
```

得到目录

- `_cacache`
  - content-v2 // 基本都是一些二进制文件
  - index-v5 // 获得一些描述性的文件，事实上这些内容就是 content-v2 里文件的索引
  - tmp

### 自定义 npm init

npm 支持我们自定义 npm init，快速创建一个符合自己需求的自定义项目

**npm init 命令本身并不复杂，它其实就是调用 shell 脚本输出一个初始化的 package.json 文件**

```js
const desc = prompt("请输入项目描述", "项目描述...");

module.exports = {
  key: "value",

  name: prompt("name?", process.cwd().split("/").pop()),

  version: prompt("version?", "0.0.1"),

  description: desc,

  main: "index.js",

  repository: prompt("github repository url", "", function (url) {
    if (url) {
      run("touch README.md");

      run("git init");

      run("git add README.md");

      run('git commit -m "first commit"');

      run(`git remote add origin ${url}`);

      run("git push -u origin master");
    }

    return url;
  }),
};
```

```bash
npm config set init-module ~\.npm-init.js
```

### npm link，高效率在本地调试以验证包的可用性

当我们开发一个公共包时，总会有这样的困扰：假如我开发一个组件库，某个组件开发完成之后，如何验证该组件能在我的业务项目中正常运行呢？

那么如何高效率在本地调试以验证包的可用性呢？这个时候，我们就可以使用 **npm link**。简单来说，它可以将模块链接到对应的业务项目中运行

具体场景: 假设正在开发项目 `p`, 有个包 `p1`, 对应 npm 模块包名称是 `npm-package-1`, 我们在 `p1`项目中加入了新功能 `featureA`, 要验证 `p` 项目中能否正常使用 `p1` 的 `featureA` ?

1. 先在 `p1` 目录中, 执行 `npm link`, 这样 `npm link` 通过链接目录和可执行文件, 实现 npm 包命令的全局可执行
2. 然后在 `p` 中创建链接, 执行 **npm link npm-package-1**, 他就会去 **/usr/local/lib/node_modules/** 路径下寻找是否有这个包, 有就建立软链接
3. 我们就可以在 project 1 的 node_module 中会看到链接过来的模块包 npm-package-1, 此时的 npm-package-1 就带有最新开发的 feature A，这样一来就可以在 project 1 中正常开发调试 npm-package-1。当然别忘了，调试结束后可以执行 npm unlink 以取消关联

从工作原理上来说: npm link 本质是软链接, 主要做了两件事:

- 为目标 npm 模块（npm-package-1）创建软链接，将其链接到全局 node 模块安装路径 /usr/local/lib/node_modules/ 中；
- 为目标 npm 模块（npm-package-1）的可执行 bin 文件创建软链接，将其链接到全局 node 命令安装路径 /usr/local/bin/ 中

**npm link 能够在工程上解决依赖包在任何一个真实项目中进行调试的问题，并且操作起来更加方便快捷**

### npx 的作用

npx 由 npm v5.2 版本引入, 解决了 npm 的一些使用快速开发、调试，以及项目内使用全局模块的痛点。

在传统 npm 模式下，如果我们需要使用代码检测工具 ESLint，就要先通过 npm install 安装：

```bash
npm install eslint --save-dev

# 根目录执行
./node_modules/.bin/eslint --init
./node_modules/.bin/eslint yourfile.js
```

使用 npx 就简单多了，你只需要下面 2 个操作步骤：

```bash
npx eslint --init
npx eslint yourfile.js
```

它可以直接执行 node_modules/.bin 文件夹下的文件。在运行命令时，npx 可以自动去 node_modules/.bin 路径和环境变量 $PATH 里面检查命令是否存在，而不需要再在 package.json 中定义相关的 script

**npx 另一个更实用的好处是：npx 执行模块时会优先安装依赖，但是在安装执行后便删除此依赖，这就避免了全局安装模块带来的问题**

```bash
# 运行如下命令后，npx 会将 create-react-app 下载到一个临时目录，使用以后再删除
npx create-react-app cra-project
```

1. npx 想要解决的主要问题，就是调用项目内部安装的模块, 比如，项目内部安装了测试工具 Mocha。

```bash
# 一般来说，调用 Mocha ，只能在项目脚本和 package.json 的scripts字段里面
npm install -D mocha

# npx 就是想解决这个问题，让项目内部安装的模块用起来更方便，只要像下面这样调用就行了
npx mocha --version
```

2. 避免全局安装模块

比如，create-react-app 这个模块是全局安装，npx 可以运行它，而且不进行全局安装

```bash
# npx 将create-react-app下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载create-react-app

npx create-react-app my-react-app
```

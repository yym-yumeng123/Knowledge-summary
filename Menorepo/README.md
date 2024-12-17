### 什么是 Menorepo

Menorepo 是一个概念，它允许你把多个不同的 npm 包放在一个仓库中，并且能够使用 npm link 来进行本地调试。

- 英文: Monolitho Repository
- 中文: 单一仓库(多项目管理方案)

管理模式:

- 优势:
  1. 便于代码和依赖在多个项目之间的共享
  2. 更方便简单的项目版本控制
  3. 提高多项目的构建与部署的便捷性
  4. 提高代码复用的能力
- 应用
  1. 项目的子项目架构 Project Application
  2. 对于工具分类封装的架构 (轮子)
  3. 对于复杂且丰富的应用需求的功能切片

### Repository 项目管理的发展历程

1. 单体仓库单应用模式

   - 一个仓库管理一个单应用 - Monolith
   - 优点: 简单易用，容易管理
   - 缺点: 无法管理多个应用，无法管理多个应用之间的依赖
   - 随着项目功能迭代, 单体应用的规模会逐渐变大, 很难管理

2. 多仓库多应用模式 - Multirepo

   - 多个应用分配给多个对应的仓库进行管理
   - 优点: 能够管理多个应用，管理多个应用之间的依赖
   - 缺点: 无法进行项目依赖与代码的共享, 多应用之间的结合变得复杂困难

3. 单仓库多应用模式 - Menorepo
   - 一个仓库管理多个应用，并且能够管理应用之间的依赖
   - 优点: 能够管理多个应用，管理多个应用之间的依赖，能够进行项目依赖与代码的共享

### Menorepo 的组成

1. apps -> 应用 (一个大项目中的子应用)
2. packages -> 本地包 (Local Package) (工具包, 轮子, etc.)
3. 依赖的公有和私有
4. 配置的公有和私有

### pnpm

- `pnpm -w` 命令
  1. 运行起来就好像 pnpm 是在 工作空间 的根目录中启动的，而不是在当前工作目录中启动的
  2. `pnpm add -w -D vite` 根目录下添加依赖
- 在 monorepo/ project-1
  1. ` pnpm add @monorepo/utils --workspace` 运行命令

```json
{
  "name": "@monorepo/project-2",
  "private": true,
  "version": "1.0.0",
  "dependencies": {
    "@monorepo/utils": "workspace:^"
  }
}
```

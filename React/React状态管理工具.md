### Redux

Redux 基于函数式编程思想实现, 集中管理状态仓库, 即一个项目中只定义一个 store


### Mobx

Mobx 是个响应式状态管理库, Mobx 奉行分散式管理状态, 可以定义多个 store

主要实现思路: 拦截状态值的 get 和 set 函数

- get 把状态值标记可观察变量
- set 让组件更新


### Recoil

与上面不同的是, Recoil本身就是 React 状态管理库, 不再需要与 React 绑定库, 属于一体机. 状态的定义是渐进式和分布式


### Zustand


### Valtio

### xstate
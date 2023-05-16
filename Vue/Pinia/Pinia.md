1. 单组件传递 props => ref/reactive
2. 两个组件
  - 父子关系: props
  - 父组件 读写, 子组件只读
  - 爷孙组件: 1. 传两次props; 2. 依赖注入: provide/reject 
  - 兄弟组件: 同一个father

3. 兄弟关系组件, 但不太相关 也可以 provide/reject


---

Vue/React 通用思路

```js
// Vue3 全局 reactive
// me.js
export const me = ref({
  name: '',
  age: '',
  id: '',
})

// A.vue
import {} from 'me.js'
// B.vue
import {} from 'me.js'

// ==> 

export const store = reactive({
  me: {},
})
```

---

### 安全漏洞

1. chrome 浏览器
  - 第一次打开 state 不会污染, 关掉会销毁
  - 第二次产生新的 store, 加载最新数据, 无 bug
2. SSR渲染
  - 服务器只在启动时创建好内存store, 
  - 用户1, 请求; 用户2,请求; 发请求修改 store, 全局共用 `cross request state polution`


### Pinia
1. 安装

```bash
yarn add pinia
# or with npm
npm install pinia
```

2. 创建 pinia 实例

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

3. 定义 store

```js
import { defineStore } from "pinia";

export const useAlertsStore = defineStore('alerts', {
  // other options...
})
```

4. Pinia 持久化

- 单页面应用, 切换页面没有刷新页面, 内存未重置, 数据还在, 但组件销毁了

- 配合 `localStorage` 实现永久持久化
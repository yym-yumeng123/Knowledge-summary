## MVVM

`View Model`

- View 很简单，就是用户看到的视图
- Model 同样很简单，一般就是本地数据和数据库中的数据

1. `MVC`

`MVC` 架构通常是使用控制器更新模型，视图从模型中获取数据去渲染。当用户有输入时，会通过控制器去更新模型，并且通知视图进行更新

MVC 有一个巨大的缺陷就是控制器承担的责任太大了，随着项目愈加复杂，控制器中的代码会越来越臃肿，导致出现不利于维护的情况

2. `MVVM`

引入了 `ViewModel` 的概念。`ViewModel` 只关心数据和业务的处理，不关心 View 如何处理数据，在这种情况下，View 和 Model 都可以独立出来，任何一方改变了也不一定需要改变另一方，并且可以将一些可复用的逻辑放在一个 ViewModel 中，让多个 View 复用这个 ViewModel

以 Vue 框架来举例，ViewModel 就是组件的实例, View 就是模板，Model 的话在引入 Vuex 的情况下是完全可以和组件分离的

通过 ViewModel 将视图中的状态和用户的行为分离出一个抽象，这才是 MVVM 的精髓

---

## Virtual DOM

相较于 DOM 来说，操作 JS 对象会快很多，并且我们也可以通过 JS 来模拟 DOM

**优势**

- 将 Virtual DOM 作为一个兼容层，让我们还能对接非 Web 端的系统，实现跨端开发。
- 通过 Virtual DOM 我们可以渲染到其他的平台，比如实现 SSR、同构渲染等等。
- 实现组件的高度抽象化

```js
/**
 * 简易虚拟DOM
 */
class VNode {
  constructor(tag, children, text) {
    this.tag = tag
    this.children = children
    this.text = text
  }

  render() {
    if (this.tag === "#text") {
      return document.createTextNode(this.text)
    }
    let el = document.createElement(this.tag)
    this.children.forEach((vChild) => {
      el.appendChild(vChild.render())
    })

    return el
  }
}

function v(tag, children, text) {
  if (typeof children === "string") {
    text = children
    children = []
  }

  return new VNode(tag, children, text)
}

/**
 * @description 对比更新新的 vdom
 * @param {父元素} parent
 * @param {新的虚拟dom} newVNode
 * @param {旧的虚拟dom} oldVNode
 * @param {*} index
 */
function patchElement(parent, newVNode, oldVNode, index = 0) {
  // 如果没有旧的 VNode, 那就新增渲染
  if (!oldVNode) {
    parent.appendChild(newVNode.render())
  } else if (!newVNode) {
    // 如果没有新节点, 删除
    parent.removeChild(parent.childNodes[index])
  } else if (newVNode.tag !== oldVNode.tag || newVNode.text !== oldVNode.text) {
    // 如果 标签不一样, 替换 parent 里面的 标签
    parent.replaceChild(newVNode.render(), parent.childNodes[index])
  } else {
    // 看 子元素 的节点有没有变化, 弄一个递归
    for (
      let i = 0;
      i < newVNode.children.length || i < oldVNode.children.length;
      i++
    ) {
      patchElement(
        parent.childNodes[index],
        newVNode.children[i],
        oldVNode.children[i],
        i
      )
    }
  }
}
```

---

## 路由原理

前端路由实现起来其实很简单，本质就是`监听 URL 的变化`，然后`匹配路由规则`，显示相应的页面，并且无须刷新页面

1. `Hash 模式`
   - `www.test.com/#/ 就是 Hash URL`，当 # 后面的哈希值发生变化时，可以通过 `hashchange 事件来监听到 URL 的变化`，从而进行跳转页面，并且无论哈希值如何变化，服务端接收到的 URL 请求永远是 www.test.com
   ```js
   window.addEventListener("hashchange", () => {
     // ... 具体逻辑
   })
   ```
2. `History 模式`

   - History 模式是 HTML5 新推出的功能，主要使用 `history.pushState` 和 `history.replaceState` 改变 URL。

   ```js
   // 新增历史记录
   history.pushState(stateObject, title, URL)
   // 替换当前历史记录
   history.replaceState(stateObject, title, URL)

   window.addEventListener("popstate", (e) => {
     // e.state 就是 pushState(stateObject) 中的 stateObject
     console.log(e.state)
   })
   ```

3. 两种模式对比
   - Hash 模式只可以更改 # 后面的内容，History 模式可以通过 API 设置任意的同源 URL
   - History 模式可以通过 API 添加任意类型的数据到历史记录中，Hash 模式只能更改哈希值，也就是字符串
   - Hash 模式无需后端配置，并且兼容性好。History 模式在用户手动输入地址或者刷新页面的时候会发起 URL 请求，后端需要配置 index.html 页面用于匹配不到静态资源的时候

---

## Vue 和 React 区别

1. Vue 支持 `v-model` 双向绑定, 比 `React` 开发更加方便
2. 改变数据方式不同, React 需要使用 `setState` 来修改数据;
3. React 有 hooks, 钩子函数会执行多次
4. React 需要使用 `JSX`, 有一定上手成本, 但可以通过 `JS` 来控制页面, 更加灵活, `Vue 使用模板语法`, 相比较没那么灵活
5. 上手成本来说: Vue 降低前端开发难度

---

## Vue

1. 声明周期钩子函数

   - `beforeCreate: 获取不到 props 或 data 中的数据, 数据都在初始化`
   - `created: k可以访问到数据, 但组件还没有挂载, 所以看不到`
   - `beforeMount: 开始构建 VDom`
   - `mounted: 将虚拟dom 渲染成 真是 dom`
   - `beforeUpdate updated 数据更新前/后`
   - `keep-alive 独有的生命周期: activated/deactivated` 用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数
   - `beforeDestory / destroyed` 前者适合移除事件、定时器等等，否则可能会引起内存泄露的问题; 所有子组件都销毁完毕后才会执行根组件的 destroyed 钩子函数。

2. 组件通信

   - 父子通信
     - `父组件 props 子组件, 子组件 $emit 父组件, 可以使用 v-model`
     - 还可以通过访问 `$parent 或者 $children` 对象来访问组件实例中的方法和数据
   - 兄弟组件
     - 可以通过查找父组件中的子组件实现，也就是 `this.$parent.$children`
     - 通过 `EventBus` 发布订阅模式
   - 跨多层次组件通信
     - `provide / inject`
     ```js
      // 父组件 A
      export default {
        provide: {
          data: 1
        }
      }
      // 子组件 B
      export default {
        inject: ['data'],
        mounted() {
          // 无论跨几层都能获得父组件的 data 属性
          console.log(this.data) // => 1
        }
      }
     ```
     - `vuex`

3. `extend`
   - 作用是扩展组件生成一个构造器，通常会与 $mount 一起使用\
   ```js
   // 创建组件构造器
   let Component = Vue.extend({
     template: "<div>test</div>",
   })
   // 挂载到 #app 上
   new Component().$mount("#app")
   // 除了上面的方式，还可以用来扩展已有的组件
   let SuperComponent = Vue.extend(Component)
   new SuperComponent({
     created() {
       console.log(1)
     },
   })
   new SuperComponent().$mount("#app")
   ```
4. `mixin 和 mixins 区别`
   - `mixin 用于全局混入，会影响到每个组件实例`，通常插件都是这样做初始化的
   - `mixins 应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins 混入代码`，比如上拉下拉加载数据这种逻辑等等
5. `computed 和 watch`

   - `computed 是计算属性`，依赖其他属性计算值，并且 `computed 的值有缓存`，只有当计算值变化才会返回内容
   - `watch 监听到值的变化就会执行回调`，在回调中可以进行一些逻辑操作

6. `keep-alive 组件有什么作用`

   - 需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 keep-alive 组件包裹需要保存的组件。

7. `v-show 与 v-if `

   - `v-show 只是在 display: none 和 display: block 之间切换`。无论初始条件是什么都会被渲染出来，后面只需要切换 CSS，DOM 还是一直保留着的。所以总的来说 v-show 在初始渲染时有更高的开销，但是切换开销很小，更适合于频繁切换的场景
   - `v-if 的话就得说到 Vue 底层的编译了。当属性初始为 false 时，组件就不会被渲染，直到条件为 true`，并且切换条件时会触发销毁/挂载组件，所以总的来说在切换时开销更高，更适合不经常切换的场景。
   - 基于 `v-if 的这种惰性渲染机制`，可以在必要的时候才去渲染组件，减少整个页面的初始渲染开销。

8. 组件中 data 什么时候可以使用对象
   - 组件复用时所有组件实例都会共享 data，如果 data 是对象的话，就会造成一个组件修改 data 以后会影响到其他所有组件，所以需要将 data 写成函数，每次用到就调用一次函数获得新的数据
   - 我们使用 new Vue() 的方式的时候，无论我们将 data 设置为对象还是函数都是可以的，因为 new Vue() 的方式是生成一个根组件，该组件不会复用，也就不存在共享 data 的情况了

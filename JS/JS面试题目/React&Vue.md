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

---

## 响应式原理

Vue 内部使用了 `Object.defineProperty()` 来实现数据响应式，通过这个函数可以监听到 `set 和 get` 的事件

```js
var data = { name: "yck" }
observe(data)
let name = data.name // -> get value
data.name = "yyy" // -> change value

function observe(obj) {
  // 判断类型
  if (!obj || typeof obj !== "object") {
    return
  }
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key])
  })
}

function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  Object.defineProperty(obj, key, {
    // 可枚举
    enumerable: true,
    // 可配置
    configurable: true,
    // 自定义函数
    get: function reactiveGetter() {
      console.log("get value")
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log("change value")
      val = newVal
    },
  })
}
```

**缺陷**

- 通过`下标方式修改数组数据或者给对象新增属性`并不会触发组件的重新渲染，因为 `Object.defineProperty` 不能拦截到这些操作
- 由于 js 的动态性，可以为对象追加新的属性或者删除其中某个属性，这点对经过 Object.defineProperty 方法建立的响应式对象来说，只能追踪对象已有数据是否被修改，无法追踪新增属性和删除属性

## 编译过程

- 模板解析为 `AST`
  - 通过各种各样的正则表达式去匹配模板中的内容，然后将内容提取出来做各种逻辑操作，接下来会生成一个最基本的 AST 对象
- 优化 `AST`
- 将 `AST` 转换为 `render` 函数
  - 遍历整个 AST，根据不同的条件生成不同的代码罢了

## NextTick 原理分析

`nextTick` 可以让我们在下次 DOM 更新循环结束之后执行延迟回调，用于获得更新后的 DOM

实现 `macrotasks` ，会先判断是否能使用 setImmediate ，不能的话降级为 MessageChannel ，以上都不行的话就使用 setTimeout

```js
if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (
  typeof MessageChannel !== "undefined" &&
  (isNative(MessageChannel) ||
    // PhantomJS
    MessageChannel.toString() === "[object MessageChannelConstructor]")
) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

---

## React

1. 生命周期

**React 设计的两个核心概念：“组件” 和 “虚拟 DOM”**

当组件初始化时，通过调用生命周期中的 render 方法，生成虚拟 DOM；再通过调用 ReactDOM.render 方法，将虚拟 DOM 转换为真实 DOM

当组件更新时，会再次调用生命周期中的 render 方法，生成新的虚拟 DOM；然后通过 diff 算法定位两次虚拟 DOM 的差异，对发生变化的真实 DOM 做定向更新

**React 15 的生命周期**

```js
constructor() // 组件挂载 初始化渲染
componentWillReceiveProps() // 组件更新, 由父组件触发
shouldComponentUpdate() // 组件更新, 由自身触发
componentWillMount() // 组件挂载 初始化渲染
componentWillUpdate() // 组件更新, 由父组件触发
render()
componentDidUpdate()
componentDidMount()
componentWillUnmount() // 组件卸载
```

挂载阶段: 组件挂载在一个 React 组件的生命周期中只会发生一次，在这个过程中，组件被初始化，最后被渲染到真实 DOM

```js
组件挂载: 初始化渲染
-> constructor() // 对 this.state 初始化
-> componentWillMount() // 在 render 方法前被触发
-> render() // 生成需要渲染的内容并返回，不会操作真实 DOM。真实 DOM 的渲染由 ReactDOM.render 完成
-> componentDidMount() // 在渲染结束后被触发，此时可以访问真实 DOM 。在这个生命周期中也可以做类似于异步请求、数据初始化的操作
```

更新阶段

```js
组件更新
-> componentWillReceiveProps(nextProps) // nextProps 表示新 props 内容
-> shouldComponentUpdate(nextProps, nextState) // 组件自身触发; 判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染
-> componentWillUpdate() // componentWillUpdate 在 render 前触发，和 componentWillMount 类似，可以在里面做一些与真实 DOM 不相关的操作
-> render()
-> componentDidUpdate() // componentDidUpdate 在组件更新完成后触发，和 componentDidMount 类似，可以在里面处理 DOM 操作；作为子组件更新完毕通知父组件的标志
```

卸载阶段

- `componentWillUnmount()` 生命周期，可以在里面做一些释放内存，清理定时器等操作

**React 16.3 生命周期**

- 废弃了 `componentWillMount componentWillUpdate componentWillReceiveProps `
- 新增了 `getDerivedStateFromProps(props, state)` 让组件在 props 变化时派生/更新 state

---

2. `setState`
   - `setState` 这个 API 是异步的: setState 异步的原因我认为在于，setState 可能会导致 DOM 的重绘，如果调用一次就马上去进行重绘，那么调用多次就会造成不必要的性能损失。设计成异步的话，就可以将多次调用放入一个队列中，在恰当的时候统一进行更新过程
   ```js
   handle() {
    // 初始化 `count` 为 0
    console.log(this.state.count) // -> 0
    this.setState({ count: this.state.count + 1 })
    this.setState({ count: this.state.count + 1 })
    this.setState({ count: this.state.count + 1 })
    console.log(this.state.count) // -> 0
   }
   ```
3. 性能优化
   - `shouldComponentUpdate` 函数中我们可以通过返回布尔值来决定当前组件是否需要更新
   ```js
   // 浅比较一下，可以直接使用 PureComponent，底层就是实现了浅比较 state
   class Test extends React.PureComponent {
     render() {
       return <div>PureComponent</div>
     }
   }
   ```
4. 通信

   - 父子通信
     - `props & 回调事件`
   - 兄弟组件通信
     - 可以通过共同的父组件来管理状态和事件函数。比如说其中一个兄弟组件调用父组件传递过来的事件函数修改父组件中的状态，然后父组件将状态传递给另一个兄弟组件
   - 跨多层次组件通信

   ```js
   // 创建 Context，可以在开始就传入值
   const StateContext = React.createContext()
   class Parent extends React.Component {
    render () {
      return (
        // value 就是传入 Context 中的值
        <StateContext.Provider value='yck'>
          <Child />
        </StateContext.Provider>
      )
    }
   }
   class Child extends React.Component {
    render () {
      return (
        <ThemeContext.Consumer>
          // 取出值
          {context => (
            name is { context }
          )}
        </ThemeContext.Consumer>
      );
    }
   }
   ```

   - 任意组件
     - 通过 Redux 或者 Event Bus 解决

5. `HOC` 是什么? 相比 `mixins` 有什么优点

   - `高阶组件（HOC）`: 实现一个函数，传入一个组件，然后在函数内部再实现一个函数去扩展传入的组件，最后返回一个新的组件，这就是高阶组件的概念，作用就是为了更好的复用代码
   - `mixins`
     - 隐含了一些依赖，比如我在组件中写了某个 state 并且在 mixin 中使用了，就这存在了一个依赖关系。万一下次别人要移除它，就得去 mixin 中查找依赖
     - 多个 mixin 中可能存在相同命名的函数，同时代码组件中也不能出现相同命名的函数，否则就是重写了
     - 虽然我一个组件还是使用着同一个 mixin，但是一个 mixin 会被多个组件使用，可能会存在需求使得 mixin 修改原本的函数或者新增更多的函数，这样可能就会产生一个维护成本

6. 事件机制

   - JSX 上写的事件并没有绑定在对应的真实 DOM 上，而是通过事件代理的方式，将所有的事件都统一绑定在了 document 上。这样的方式不仅减少了内存消耗，还能在组件挂载销毁时统一订阅和移除事件。

   - 冒泡到 document 上的事件也不是原生浏览器事件，而是 React 自己实现的合成事件（SyntheticEvent）。因此我们如果不想要事件冒泡的话，调用 event.stopPropagation 是无效的，而应该调用 event.preventDefault
   - 合成事件优点:
     - 抹平了浏览器之间的兼容问题，另外这是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力
     - 对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象

### 什么是 WebComponents

> Web Components 提供了基于原生支持的、对视图层的封装能力，可以让单个组件相关的 javaScript、css、html 模板运行在以 html 标签为界限的局部环境中，不会影响到全局，组件间也不会相互影响 。 再简单来说：就是提供了我们自定义标签的能力，并且提供了标签内完整的生命周期

> Web Components 可以将组件化的概念直接应用到浏览器可以识别的 html 标签上，就比如我们开发 html 页面常用的 标签；它可以将一个单一模块所内聚的逻辑、UI 层聚合到一个标签，并且相互进行天然的隔离，而且它提供一些生命周期的钩子给开发者调用

**Web Components 实现以上的种种特性，是因为三个核心的技术，它们分别是：**

1. Custom elements：自定义元素

   - 通过 `CustomElementRegistry` 来自定义可以直接渲染的 html 元素，并提供了组件的生命周期`connectedCallback、disconnectCallback、attributeChangedCallback` 等提供给开发者聚合逻辑时使用

2. Shadow DOM ：隐式 DOM

   - 「影子 DOM」 或 「隐式 DOM」，顾名思义，他具有隐藏属性，具体的意思就是说，在使用 Shadow DOM 的时候，组件标签内的 CSS 和 HTML 会完全的隐式存在于元素内部，在具体页面中，标签内部的 HTML 结构会存在于#shdaow-root，而不会在真实的 dom 树中出现

3. HTML template： HTML 模板
   - 特性是用 template 标签包裹的元素不会立即渲染，只有在内容有效的时候，才会解析渲染，具有这个属性后，我们可以在自定义标签中按需添加我们需要的模板，并在自定义标签渲染的时候再去解析我们的模板，这样做可以在 HTML 有频繁更改更新任务，或者重写标记的时候非常有用

### Stencil

1. WebComponent: Web Component 是指一系列加入 w3c 的 HTML 与 DOM 的特性，目的是为了从原生层面实现组件化，可以使开发者开发、复用、扩展自定义组件，实现自定义标签

```js
class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host{
          display: block;
          padding: 10px ;
        }
      </style>
      <h1>Hello World</h1>
    `;
  }
}
// 自定义元素必须用'-'连接符连接，来作为特定的区分，如果没有检测到自定义元素，则浏览器会作为空div处理
window.customElements.define("hello-world", HelloWorld);

// 自定义
class HelloWorld extends HTMLElement {
  constructor() {
    // 1. 构建组件的时候的逻辑 hook
    super();
  }
  // 2 当自定义元素首次被渲染到文档时候调用
  connectedCallback() {}
  // 3 当自定义元素在文档中被移除调用
  disconnectedCallback() {}
  // 4 当自定义组件被移动到新的文档时调用
  adoptedCallback() {}
  // 5 当自定义元素的属性更改时调用
  attributeChangedCallback() {}
}
```

2. Stencil

> Stencil 由 Ionic 核心团队推出，由团队成员社区联合维护, Stencil 可以理解为一个用于快速构建 Web Components 的工具集。也可以理解为一个编译器，这意味着，当你的组件一旦经过 build 完成后，就会脱离 Stencil，不再依赖。并且 Stencil 相对原生 Web Components 提供了完善的项目目录架构和配置，并提供了诸多的语法糖和封装函数

```js
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "my-first-component",
})
export class MyComponent {
  @Prop() name: string;

  render() {
    return <p>My name is {this.name}</p>;
  }
}
```

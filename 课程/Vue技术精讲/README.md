### 简介

掘金小册课程 Vue.js (vue2.x) 复习

### props event slot

一个再复杂的组件, 也是由三部分组成: `prop event slot`

1. 属性 prop: prop 定义了组件有哪些可配置的属性, 写通用组件, 最好用`对象`的写法, 这样可以针对每个属性设置类型, 默认值或自定义验证器

```vue
<script>
export default {
  props: {
    prop1: {
      type: String, // 类型
      required: true, // 是否必填
      default: "default", // 默认值
      validator(value) {
        // 自定义验证器
        return value === "validator"
      },
    },
  },
}
</script>
```

2. 插槽 slot: 可以分发组件的内容

```html
<template>
  <button :class="'i-button-size' + size" :disabled="disabled">
    <!-- 具名插槽 -->
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<i-button>按钮 1</i-button>
<i-button>
  <strong>按钮 2</strong>
</i-button>

<i-button>
  <i-icon slot="icon" type="checkmark"></i-icon>
  按钮 1
</i-button>
```

3. 自定义事件 event: 可以在组件内部触发事件, 并分发事件给父组件

```js
<template>
  <button @click="handleClick">
    <slot></slot>
  </button>
</template>
<script>
  export default {
    methods: {
      handleClick (event) {
        this.$emit('on-click', event);
      }
    }
  }
</script>
```

### provide inject

```js
// A.vue
export default {
  provide: { // 将 name 这个变量提供给它的所有子组件
    name: 'Aresn'
  }
}

// B.vue
export default {
  inject: ['name'], // inject 注入了从 A 组件中提供的 name 变量
  mounted () {
    console.log(this.name);  // Aresn
  }
}
```

```html
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
  // 替代 vuex 思路
  export default {
    provide() {
      return {
        app: this,
      }
    },
    data() {
      return {
        userInfo: null,
      }
    },
    methods: {
      getUserInfo() {
        // 这里通过 ajax 获取用户信息后，赋值给 this.userInfo，以下为伪代码
        $.ajax("/user/info", (data) => {
          this.userInfo = data
        })
      },
    },
    mounted() {
      this.getUserInfo()
    },
  }
</script>

<template>
  <div>{{ app.userInfo }}</div>
</template>
<script>
  export default {
    inject: ["app"],
  }
</script>
```

### $on $emit $emit 会在当前组件实例上触发自定义事件，并传递一些参数给监听器的回调

```js
// child.vue，部分代码省略
export default {
  methods: {
    handleEmitEvent() {
      this.$emit("test", "Hello Vue.js")
    },
  },
}
```

```html
<!-- parent.vue，部分代码省略-->
<template>
  <child-component @test="handleEvent">
</template>
<script>
  export default {
    methods: {
      handleEvent (text) {
      	console.log(text);  // Hello Vue.js
      }
    }
  }
</script>

```

### Form 组件 接口设计思路

1. 在 Form 组件, 定义两个 props
   - model: 表单控件绑定的数据对象，在校验或重置时会访问该数据对象下对应的表单数据，类型为 Object。
   - rules: 表单验证规则，即上面介绍的 async-validator 所使用的校验规则，类型为 Object。
2. 在 FormItem 组件, 定义一个 prop
   - label：单个表单组件的标签文本，类似原生的 `<label>` 元素，类型为 String
   - prop：对应表单域 Form 组件 model 里的字段，用于在校验或重置时访问表单组件绑定的数据，类型为 String

```vue
<template>
  <div>
    <i-form :model="formValidate" :rules="ruleValidate">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="mail">
        <i-input v-model="formValidate.mail"></i-input>
      </i-form-item>
    </i-form>
  </div>
</template>
<script>
import iForm from "../components/form/form.vue"
import iFormItem from "../components/form/form-item.vue"
import iInput from "../components/input/input.vue"

export default {
  components: { iForm, iFormItem, iInput },
  data() {
    return {
      formValidate: {
        name: "",
        mail: "",
      },
      ruleValidate: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        mail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
      },
    }
  },
}
</script>
```

```html
<!-- form.vue -->
<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
  export default {
    name: "iForm",
    props: {
      model: {
        type: Object,
      },
      rules: {
        type: Object,
      },
    },
  }
</script>
```

```html
<!-- form-item.vue -->
<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "iFormItem",
    props: {
      label: {
        type: String,
        default: "",
      },
      prop: {
        type: String,
      },
    },
  }
</script>
```

### Vue 构造器: Vue.extend(options) 与手动挂载 $mount('#app')

创建一个 Vue 实例时，都会有一个选项 el，来指定实例的根节点，如果不写 el 选项，那组件就处于未挂载状态。Vue.extend 的作用，就是基于 Vue 构造器，创建一个“子类”，它的参数跟 new Vue 的基本一样，但 data 要跟组件一样，是个函数，再配合 $mount ，就可以让组件渲染，并且挂载到任意指定的节点上，比如 body

```js
import Vue from "vue"

// 创建了一个构造器
const AlertComponent = Vue.extend({
  template: "<div>{{ message }}</div>",
  data() {
    return {
      message: "Hello, Aresn",
    }
  },
})

// 手动渲染组件，并把它挂载到 body
const component = new AlertComponent().$mount()
document.body.appendChild(component.$el)

// 在 $mount 里写参数来指定挂载的节点
new AlertComponent().$mount("#app")
// 不用 $mount，直接在创建实例时指定 el 选项
new AlertComponent({ el: "#app" })
```

```js
// 直接创建 Vue 实例，并且用一个 Render 函数来渲染一个 .vue 文件
import Vue from "vue"
import Notification from "./notification.vue"

const props = {} // 这里可以传入一些组件的 props 选项

const Instance = new Vue({
  render(h) {
    return h(Notification, {
      props: props,
    })
  },
})

const component = Instance.$mount()
document.body.appendChild(component.$el)
```

### slot-scope

```js
<ul>
  <li v-for="book in books" :key="book.id">
    // 想自定义它的模板（即内容分发），就要用到 slot，但 slot 只能是固定的模板，没法自定义循环体中的一个具体的项
    {{ book.name }}
  </li>
</ul>
```

```html
<ul>
  <li v-for="book in books" :key="book.id">
    <!-- 传递了一个自定义的参数 book，它的值绑定的是当前循环项的数据 book，这样在父级使用时，就可以在 slot 中访问它了 -->
    <slot :book="book">
      <!-- 默认内容 -->
      {{ book.name }}
    </slot>
  </li>
</ul>


<book-list :books="books">
  <!-- slot-scope 指定的参数 slotProps 就是这个 slot 的全部参数，它是一个对象，在 slot-scope 中是可以传递多个参数的 -->
  <template slot-scope="slotProps">
    <span v-if="slotProps.book.sale">限时优惠</span>
    {{ slotProps.book.name }}
  </template>
</book-list>

```

### 递归组件 动态组件

递归组件就是指组件在模板中调用自己，开启递归组件的必要条件，就是在组件中设置一个 name 选项

- 要给组件设置 name；
- 要有一个明确的结束条件

```html
<template>
  <div>
    <my-component></my-component>
  </div>
</template>
<script>
  export default {
    name: 'my-component'
  }
</script>

```

Vue.js 提供了另外一个内置的组件 `<component>` 和 `is` 特性，可以更好地实现动态组件

```vue
<!-- a.vue -->
<template>
  <div>
    组件 A
  </div>
</template>
<script>
  export default {

  }
</script>
```
```vue
<!-- b.vue -->
<template>
  <div>
    组件 B
  </div>
</template>
<script>
  export default {

  }
</script>
```

```js
<template>
  <div>
    <button @click="handleChange('A')">显示 A 组件</button>
    <button @click="handleChange('B')">显示 B 组件</button>
    <button @click="handleChange('C')">显示 C 组件</button>

    <component :is="component"></component>
  </div>
</template>
<script>
  import componentA from '../components/a.vue';
  import componentB from '../components/b.vue';
  import componentC from '../components/c.vue';

  export default {
    data () {
      return {
        component: componentA
      }
    },
    methods: {
      handleChange (component) {
        if (component === 'A') {
          this.component = componentA;
        } else if (component === 'B') {
          this.component = componentB;
        } else if (component === 'C') {
          this.component = componentC;
        }
      }
    }
  }
</script>

```

### API 详解

1. `nextTick` 是 Vue.js 提供的一个函数，并非浏览器内置。nextTick 函数接收一个回调函数 cb，在下一个 DOM 更新循环之后执行
2. `v-model` 是一个语法糖，可以拆解为 props: value 和 events: input
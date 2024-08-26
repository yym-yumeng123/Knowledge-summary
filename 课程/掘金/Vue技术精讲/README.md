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

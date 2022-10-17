### 面试问题方法论

- 该技术要解决什么问题? why
- 该技术怎么解决它的? how
- 该技术有什么优点? 对比其它技术
- 该技术有什么缺点
- 如何解决这些缺点

### Promise 你了解吗?

- Promise 解决 回调地狱? -> 可以把回调里面的 弄成函数, 在外面声明

- Promise 优点

  - 减少缩进: 把[函数里的函数] 变成 [then 下面的 then]
  - 消灭 `if(err)`, 错误处理单独放到一个函数; 如果不处理, 一直等到往后抛

- async await 来解决 promise 每次都 then

### 宏任务 微任务

- MacroTask: setTimeout
- MicroTask: process.nextTick -> node / MutationObserver -> 浏览器 / setImmediate -> 兼容性差

### Promise

- 使用

```js
const p = new Promise((resolve, reject) => {
  // TODO...
  resolve();
});

p.then().catch();
```

- MacroTask 宏任务/ MicroTask 微任务
  先 宏任务, 后微任务, 其实一开始没有两个任务队列, 为了让 Promise 回调更早执行,强行插入了一个队列, 如果没有 微任务, 还不如直接用 `setTimeout`

- `Promise.resolve()`
  制造一个 (成功|失败) Promise 实例, 和 resolve 结果有关
- `Promise.reject()`
  制造一个失败的 `Promise`
- `Promise.all(数组)`
  等待全部成功, 或者有一个失败
- `Promise.allSettled(数组)`
  返回一个数组 [{status: 'fulfilled', value: xx}]

  ```js
  // 使用 Promise.all 写 Promise.allSettled
  // 失败会进入 reason, 成功返回, 也会成功执行
  x= promise => promise.then((result) => {status: 'ok', value: result}, reason => {status: 'not ok', reason} )

  const p1 = new Promise((resolve, reject) => reject(1))
  const p2 = new Promise((resolve) => resolve(2))
  const p3 = new Promise((resolve, reject) => reject(3))

  x = promiseList => promiseList.map(promise => promise.then(result => ({status: 'ok', value: result}),reason =>  ({status: 'not ok', reason}) ))

  Promise.all(x([p1, p2, p3])).then(res => console.log(res, 'res...'))
  // {status: 'not ok', reason: 1}
  // {status: 'ok', value: 2}
  // {status: 'not ok', reason: 3}
  ```

- `Promise.race(数组)`

### async await

- 优点: 没有缩进, 像在写同步代码
- 只能和 promise 配合, 是 `promise` 语法糖
- 为了兼容旧代码 `await(promise)`, 所以官方在前面强制加了一个 `async`, 没有实际意义, 和 await 配合

```js
const fn = async () => {
  // await 后面等待的一个 promise
  const temp = await makePromise();
  return temp + 1;
};
```

- await 错误处理

```js
// try catch 比较丑
let res;
try {
  res = await axios();
} catch (err) {
  if (err) {
    throw new Error();
  }
}
```

```js
// 使用 catch 来捕获 错误

// await 只关心成功, 失败交给 catch 捕获
awiat axios.get().catch(error => {})
```

- await 传染性

```js
console.log(1);
await console.log(2);
console.log(3);

// log(3) 变成异步任务了
// promise 同样有传染性 (同步变异步)
// 回调没有传染性
```

- await 应用场景

```js
// 多次处理一个结果
const r1 = await makePromise()
const r2 = await handleR1()
const r3 = await handleR2()

// 天生串行
async function () {
  // 依次执行
  await ajax()
  await ajax()
  await ajax()
  await ajax()
}

// 并行
await Promise.all([p1, p2, p3]) // 就是并行
```

```js
// 题目:

let a = 0;
let test = async () => {
  a = a + (await 10);
  console.log(a);
};
test();

console.log(++a);

// 1
// 10
```

---

### Promise 实践

Promise 接受异步任务并立即执行, 在任务完成后, 将状态标注成最终结果(成功或者失败)

Promise 有三种状态: 初始化时, 刚开始执行主体任务(pending 进行中), 等到任务执行完成, 根据成功或者失败, 分别对应状态(fulfilled 成功) 和 (rejected 失败), 这是的状态就固定不能改变了, Promise 的状态是不可逆的

1. 基本用法

Promise 是一个类, new 一个实例即可

```js
const myPromsie = new Promise((resolve, reject) => {
  // 这里是 Promise 主体, 执行异步任务
  ajax("xxx", () => {
    resolve("成功了"); // 或 reject('失败了)
  });
});

myPromise.then((data) => {
  // 处理data数据
});
```

当初始化 Promise 实例时, 主体代码是同步开始执行的, `只有 then()` 里面的回调处理才是异步, 因为它需要等待主题任务执行结束

```js
const myPromise = new Promise((resolve, reject) => {
  console.log("1");
  ajax("xxx", () => {
    resolve("成功了");
  });
}).then(() => {
  console.log("2");
});
console.log("3"); // 1. 3. 2
```

在调用 then() 之前，Promise 主体里的异步任务已经执行完了, 即 Promise 的状态已经标注为成功了, then() 里面的回调永远是放到微任务里面异步执行的，而不是立马执行。

2. Promise 异常处理

2.1 通过 `then()` 的第二个参数

```js
const myPromise = new Promise(...)
myPromise.then(successCallback, errorCallback)
```

这种方式能捕获到 Promise 主体里面的异常, 并执行 errorCallback, 但是如果 Promise 主体里面没有异常，然后进入到 successCallback 里面发生了异常，此时将不会进入到 errorCallback

2.2 通过 `catch()`

```js
const myPromise = new Promise(...);
myPromise.then(successCallback).catch(errorCallback);
```

不管是 promise 主体, 还是 successCallback 里面除了异常, 都会进入 errorCallback, 需要注意，按这种链式写法才正确，如果按下面的写法将会和方式一类似，不能按预期捕获

```js
const myPromise = new Promise(...);

myPromise.then(successCallback);

myPromise.catch(errorCallback);

```

2.3 `try...catch`

try catch 是传统的异常捕获方式，这里只能捕获同步代码的异常，并不能捕获异步异常，因此无法对 Promise 进行完整的异常捕货

3. 链式调用

Promise 的链式调用，每次调用后，会返回一个新的 Promise 实例对象，从而可以继续 then()或者其他 API 调用，如上面的方式二异常处理中的 catch 就属于链式调用

```js
const myPromise = new Promise((resolve) => {
  reslove(1);
})
  .then((data) => {
    return data + 1;
  })
  .then((data) => {
    console.log(data);
  });
```

每次 `then()` 或者 `catch()` 后, 返回的是一个新的 Promise, 和上一次的 Promise 实例对象已经不是同一个引用了, 而这个新的 Promise 实例对象包含了上一次 then 里面的结果, 这也是为什么链式调用的 catch 才能捕获到上一次 then 里面的异常的原因

```js
// 非链式调用，每次 then 都是针对最初的 Promise 实例最后输出为 1
const myPromise = new Promise((resolve) => {
  resolve(1);
});

myPromise.then((data) => {
  return data + 1;
});

romise.then((data) => {
  console.log(data);
});

// 输出 1
```

4. 常用 API

Promise API 和大部分类一样, 分为 实例 API 或原型方法, 和静态 API 或类方法

4.1 实例 API (原型方法)

- `then()` Promise 主体任务和在此之前的链式调用里的回调任务都成功的时候(即通过 reslove 标注状态后), 进入本次 then() 回调
- `catch()` Promise 主体任务和在此之前的链式调用里的出现了异常，并且在此之前未被捕获的时候（即前面通过 reject 标注状态或者出现 JS 原生报错没处理的时候），进入本次 catch()回调
- `finally()` 无论前面成功还是失败, 最终都会执行这个方法

  4.2 静态 API (类方法)

- `Promise.reslove()`

返回一个成功状态的 `Promise` 实例, 一般用于构建微任务, 比如有个耗时操作, 不希望阻塞主流程, 就把它放到微任务中

```js
console.log(1);

Promise.resolve().then(() => {
  console.log(2); // 作为微任务输出 2
});

console.log(3);
```

- `Promise.reject()`

与 Promise.resolve 使用类似，返回一个失败状态的 Promise 实例。

- `Promise.all()`

此方法接受一个数组为参数(可迭代参数), 数组里的每一项都是一个单独的 `Promise` 实例, 此方法返回一个 Promise 对象, 这个返回的对象含义是数组中所有 Promise 都返回了（可失败可成功），返回 Promise 对象就算完成了。适用于需要并发执行任务时，比如同时发送多个请求

```js
const p1 = new Promise(...)
const p2 = new Promise(...)
const p3 = new Promise(...)

const pAll = Promise.all([p1, p2, p3])
pAll.then(list => {
  // p1, p2, p3都成功了即 reslove了, 会进入这里
  // list 按顺序为 p1,p2,p3 的 resolve 携带的返回值
}).catch(() => {
  // p1,p2,p3 有至少一个失败，其他成功，就会进入这里；
})
```

**注意 Promise.all 是所有传入的值都返回状态了, 才会最终进入 then 或 catch 回调**

Promise 的参数也可以如下常量，它会转换成立即完成的 Promise 对象

```js
Promise.all([1, 2, 3]);

// 等同于
const p1 = new Promise((resolve) => resolve(1));
const p2 = new Promise((resolve) => resolve(2));
const p3 = new Promise((resolve) => resolve(3));

Promise.all([p1, p2, p3]);
```

- `Promise.race()`

与 Promise.all() 类似，不过区别是 Promise.race 只要传入的 Promise 对象，有一个状态变化了，就会立即结束，而不会等待其他 Promise 对象返回。所以一般用于竞速的场景

5. Promise 最佳实践介绍

5.1. 异步 Promise 化的两个关键

实际应用中, 尽量将所有异步操作进行 Promise 的封装，方便其他地方调用, 放弃以前的 callback 写法，比如我们封装了一个类 classA，里面需要有一些准备工作才能被外界使用，以前我们可能会提供 ready(callback) 方法，那么现在就可以这样 ready().then()

另外，一般开发中，尽量将 new Promise 的操作封装在内部，而不是在业务层去实例化

```js
function getData() {
  const promise = new Promise((resolve, reject) => {
    ajax("xxx", (d) => {
      resolve(d);
    });
  });
  return promise;
}

getData().then((data) => {
  console.log(data);
});
```

**其实处理和封装异步任务关键就是两件事**

- **定义异步任务的执行内容**. 如发一个请求, 设一个定时器, 读取一个文件等
- **指出异步任务结束的时机**. 如请求返回时机, 定时器结束的时机, 文件读取完成的时机, 其实就是触发回调的时机

当通过 new Promise 初始化实例的时候，就定义了异步任务的执行内容，即 Promise 主体. 然后 Promise 给我们两个函数 resolve 和 reject 来让我们明确指出任务结束的时机，也就是告诉 Promise 执行的内容和结束的时机就行了, 不用像 callback 那样，需要把处理过程也嵌套写在里面，而是在原来 callback 的地方调用一下 resolve（成功）或 reject（失败）来标识任务结束了

**实际开发中, 不管业务模块或者老代码多么复杂, 只需要抓住上述两点去进行改造，就能正确地将所有异步代码进行 Promise 化**. 所有异步甚至同步逻辑都可以 Promise 化，只要抓住 任务内容和 任务结束时机这两点就可很清晰的来完成封装

5.2. 如果避免冗余封装

现在很多类库已经支持返回 Promise 实例了，尽量避免在外面重复包装，所以在使用时仔细看官方说明，有的库既支持 callback 形式，也支持 Promise 形式。

```js
// 冗余封装
function getData() {
  return new Promise((resolve) => {
    axios.get(url).then((data) => {
      resolve(data);
    });
  });
}
```

另一个案例, 有时我们会需要构建微任务或者将同步执行的结果数据，以 Promise 的形式返回给业务，会容易写成下面的冗余写法

```js
function getData() {
  return new Promise((resolve) => {
    const a = 1;
    const b = 2;
    const c = a + b;
    reslove(c);
  });
}
```

优雅写法如下, 用 **Promise.reslove 快速构建一个 Promise 对象**

```js
function getData() {
  const a = 1;

  const b = 2;

  const c = a + b;

  return Promise.resolve(c);
}
```

5.3 异常处理

尽量通过 catch() 去捕获 Promise 异常，需要说明的是，一旦被 catch 捕获过的异常，将不会再往外部传递，除非在 catch 中又触发了新的异常

```js
const p = new Promise((resolve, reject) => {
  reject("异常啦"); // 或者通过 throw new Error() 跑出异常
})
  .catch((err) => {
    console.log("捕获异常啦"); // 进入
  })
  .catch(() => {
    console.log("还有异常吗"); // 不进入
  })
  .then(() => {
    console.log("成功"); // 进入
  });
```

如果 catch 里面在处理异常时，又发生了新的异常，将会继续往外冒，这个时候我们不可能无止尽的在后面添加 catch 来捕获，所以 Promise 有一个小的缺点就是最后一个 catch 的异常没办法捕获（当然实际出现异常的可能性很低，基本不造成什么影响）

5.4 **使用 async await**

实际使用中，我们一般通过 async await 来配合 Promise 使用，这样可以让代码可读性更强，彻底没有"回调"的痕迹了

```js
async function getData() {
  const data = await axios.get(url);
  return data;
}

// ==>

function getData() {
  return axios.get(url).then((data) => {
    return data;
  });
}
```

对 async await 很多人都会用，但要注意几个非常重要的点。

- **await 同一行后面的内容对应 Promise 主体内容，即同步执行的**
- **await 下一行的内容对应 then()里面的内容，是异步执行的**
- **await 同一行后面应该跟着一个 Promise 对象，如果不是，需要转换（如果是常量会自动转换）**
- **async 函数的返回值还是一个 Promise 对象**

下面是不正确的

```js
async function getData() {
  // await 不认识后面的 setTimeout，不知道何时返回
  const data = await setTimeout(() => {
    return;
  }, 3000);

  console.log("3 秒到了");
}
```

正确写法

```js
async function getData() {
  const data = await new Promise((reslove) => {
    setTimeout(() => {
      return;
    }, 3000);
  });

  console.log("3 秒到了");
}
```

6. **Promise 高级应用**

6.1 提前预加载应用

有这样一个场景：页面的数据量较大，通过缓存类将数据缓存在了本地，下一次可以直接使用缓存，在一定数据规模时，本地的缓存初始化和读取策略也会比较耗时。这个时候我们可以继续等待缓存类初始完成并读取本地数据，也可以不等待缓存类，而是直接提前去后台请求数据。两种方法最终谁先返回的时间不确定。那么为了让我们的数据第一时间准备好，让用户尽可能早地看到页面，我们可以通过 Promise 来做加载优化。

策略是页面加载后，立马调用 Promise 封装的后台请求，去后台请求数据。同时初始化缓存类并调用 Promise 封装的本地读取数据。最后在显示数据的时候，看谁先返回用谁的

```
页面开始加载 => 1. 请求后台 Promise
页面开始加载 => 2. 缓存类初始化 => 混存类读取 + 反序列化

==> 谁先给我数据
```

6.2 中断场景应用

实际应用中，还有这样一种场景：我们正在发送多个请求用于请求数据，等待完成后将数据插入到不同的 dom 元素中，而如果在中途 dom 元素被销毁了（比如 react 在 useEffect 中请求的数据时，组件销毁），这时就可能会报错。因此我们需要提前中断正在请求的 Promise，不让其进入到 then 中执行回调

```js
useEffect(() => {
    let dataPromise = new Promise(...);
    let data = await dataPromise();
    // TODO 接下来处理 data，此时本组件可能已经销毁了，dom 也不存在了，所以需要在下面对 Promise 进行中断
    return (() => {
      // TODO 组件销毁时，对 dataPromise 进行中断或取消
    })
});

```

我们可以对生成的 Promise 对象进行再一次包装，返回一个新的 Promise 对象，而新的对象上被我们增加了 cancel 方法，用于取消。这里的原理就是在 cancel 方法里面去阻止 Promise 对象执行 then()方法。

```js
function getPromiseWithCancel(originPromise) {
  let cancel = (v) => {};
  let isCancel = false;
  const cancelPromise = new Promise((reslove, reject) => {
    cancel = (e) => {
      isCancel = true;
      reject(e);
    };
  });

  const groupPromise = Promise.race([originPromise, cancelPromise]).catch(
    (e) => {
      if (isCancel) {
        // 主动取消时, 不触发完成的 catch
        return new Promise(() => {});
      } else {
        return Promise.reject(e);
      }
    }
  );

  return Object.assign(groupPromise, { cancel });
}

// 使用如下
const originPromise = axios.get(url);
const promiseWithCancel = getPromiseWithCancel(originPromise);
promiseWithCancel.then((data) => {
  console.log("渲染数据", data);
});
promiseWithCancel.cancel(); // 取消 Promise，将不会再进入 then() 渲染数据
```

### Promise 深入理解之控制反转

熟悉了 Promise 的基本运用后，我们再来深入点理解。Promise 和 callback 还有个本质区别，就是控制权反转。

- callback 模式下, 回调函数是由业务层传递给封装层的, 封装层在任务结束时执行了回调函数
- Promise 模式下, 业务层并没有把回调函数直接传递给封装层( Promise 对象内部), 封装层在任务结束时也不知道要做什么回调，只是通过 resolve 或 reject 来通知到 业务层，从而由业务层自己在 then() 或 reject() 里面去控制自己的回调执行

### 手动实现 Promise 类的思路

```js
class MyPromise {
  constructor(fun) {
    this.status = "pending";
    fun(this.resolve, this.reject);
  }
  resolve() {}
  reject() {}
  then() {}
  catch() {}
}
```

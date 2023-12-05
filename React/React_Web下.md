### React 合成事件

React 内建了一套名为 `合成事件(SyntheticEvent)` 的事件系统.

1. 什么是 React 合成事件

```html
<!-- 原生DOM -->
<!-- 这是HTML不是JSX -->
<button onclick="handleClick()">按钮</button>
<input type="text" onkeydown="handleKeyDown(event)" />
```

在 React 中, HTML 元素也有类似的, 以 `on*` 开头的事件处理属性, 例 `onCLick onKeyDown` 等

```js
const Component = () => {
  const handleClick = () => {
    /* ...省略 */
  }
  const handleKeyDown = (evt) => {
    /* ...省略 */
  }
  return (
    <>
      {/* 这次是JSX了 */}
      <button onClick={handleClick}>按钮</button>
      <input type='text' onKeyDown={(evt) => handleKeyDown(evt)} />
    </>
  )
}
```

上面的代码中, 用户点击按钮, React 都会传入一个描述点击事件的对象作为函数的第一个参数。而这个对象就是 React 中的合成事件

合成事件是原生 DOM 事件的一种包装，它与原生事件的接口相同

2. 合成事件与原生 DOM 事件的区别

**注册事件监听函数的方式不同**

```js
// 原生 DOM 事件三种方式

// 1. 内联方式
;<button id='btn' onclick='handleClick()'>
  按钮
</button>
// 2. JS
document.getElementById("btn").onCLick = handleClick
// 3. addEventListener 合适时机调用 removeEventListener 以防内存泄漏
document.getElementById("btn").addEventListener("click", handleClick)

// 合成事件 不能通过 addEventListener 方法监听
// 合成事件, 捕获方式
;() => <div onClickCapture={handleClick}>...</div>
```

**特定事件的行为不同**

在 React 中，`<input> 、<textarea> 和 <select>` 三种表单元素的`onChange` 合成事件被规范成了一致的行为：在不会导致显示抖动的前提下，表单元素值的改变会尽可能及时地触发这一事件。

合成事件也规范化了 `onBeforeInput 、 onMouseEnter 、 onMouseLeave 、 onSelect`

**实现注册的目标 DOM 元素不同**

```js
// 原生 DOM 当前目标 event.currentTarget
document.getElementById("btn").addEventListener("click", handleClick)

// React 是合成事件, evt 参数就是一个合成事件
// 通过 evt.nativeEvent 属性，可以得到这个合成事件所包装的原生事件
;<div onClickCapture={(evt) => handleClick(evt)}>...</div>
```

React 使用了`事件代理模式`。React 在创建根（ createRoot ）的时候，会在容器上监听所有自己支持的原生 DOM 事件。当原生事件被触发时，React 会根据事件的类型和目标元素，找到对应的 `FiberNode` 和事件处理函数，创建相应的合成事件并调用事件处理函数

### 受控组件与表单

以 `React state 为单一事实来源（Single Source of Truth），并用 React 合成事件处理用户交互的组件，被称为 "受控组件"`

```js
const KanbanNewCard = ({ onSubmit }) => {
  const [title, setTitle] = useState("")
  const handleChange = (evt) => {
    setTitle(evt.target.value)
  }

  return (
    <div>
      <input type='text' value={title} onChange={handleChange} />
    </div>
  )
}
```

### 单向数据流

1. 什么是数据流

数据流（Data Flow）则是响应式编程的重要概念，响应式编程将程序逻辑建模成为在运算（Operation）之间流动的数据及其变化。

2. React 数据流包含哪些数据

- props: React 组件接受一组输入参数，用于改变组件运行时的行为，这组参数就是 props
  - 形成列表的子元素的 key
  - 引用 DOM 元素的 ref
  - props 的数据流向是单向的, 只能从父组件流向子组件, 而不能从子组件流向父组件
- State: 组件内自己的数据
  - 对同一个对象属性的修改不会改变对象的值引用, React 都不认为是变化, 所有在更新引用类型时, 需要新建数组, 对象
- Context: 上下文
  - context 的数据流向也是单向的，只能从声明了 Context.Provider 的当前组件传递给它的子组件树

```js
// props 不可变
function MyComponent(props) {
  return (
    <ul>
      <li>{props.prop1}</li>
      <li>{props.prop2}</li>
    </ul>
  );
}
function MyComponent({ prop1, prop2, optionalProp = 'default' }) {}
// rest 语法
function MyComponent({ prop1, prop2, ...restProps }) {
  return (
    <ul {...restProps}>
      <li>{prop1}</li>
      <li>{prop2}</li>
    </ul>
  );
}

// state 也不可变, 不能直接赋值, 判断改变, Object.is()
const [state1, setState1] = useState('文本');  
const [state2, setState2] = useState(123);


// 1. 调用 React.createContext() 创建 Context 对象
const MyContext = React.createContext('没路用的初始值');
// 2. <MyContext.Provider> 组件，定义 value 值，并将子组件声明在前者的闭合标签里
function MyComponent() {
  const [state1, setState1] = useState('文本');
  const handleClick = () => {
    setState1('更新文本');
  };
  return (
    <MyContext.Provider value={state1}>
      <ul>
        <MyChildComponent />
        <li><button onClick={handleClick}>更新state</button></li>
      </ul>
    </MyContext.Provider>
  );
}
// 3. 在子组件或后代组件, 使用 useContext 获取 MyContext 值, 称为 MyContext 消费者
const value = useContext(MyContext);
```


### 面向接口编程

所谓 `软件接口（Software Interface）`，就是两个或多个模块间用来交换信息的一个共享的边界。

1. 接口是抽象
   - 接口用途广泛
   - 容易被滥用
   - 重要依然不可替代
2. 接口是边界
   - 接口是为外部设计的
   - 接口对外部隐藏了内部实现
   - 接口调用者只需要知道接口的用法, 不需要关注内部实现
   - 接口的实现者在开发内部实现时，与外部环境的交互应集中体现在接口上
3. 接口是契约
   - 越是广泛使用的接口，它就越是一种契约
   - 设计接口时，应考虑哪些功能是不会轻易改变的，哪些是有可能修改的
   - 实现者应该在保持接口不变的情况下更新内部实现
   - 接口的实现者破坏契约，可能会给调用者带来成倍的风险或损失


### React 组件的接口

props 就是 React 组件对外接口

- 哪些字段作为 props 暴露出来？
- 哪些抽取为 context 从全局获取？
- 哪些数据实现为组件内部的 state？


### 什么是不可变数据

不可变数据(Immutable Data)在创建以后, 就不可以被改变

对 React 框架，不可变数据可以简化比对数据的实现，降低成本；对开发者，不可变数据在开发和调试过程中更容易被预测。

1. 协调过程中数据对比, Object.is(oldVal, newVal)

- 更新 state, 新旧 state 值不相等, 才把 Fiber 标记为更新
- 更新 Context.Provider 中的 value 值；
- 检查 useEffect、useMemo、useCallback 的依赖值数组，只有每个值的新老值都检查过，其中有不同时，才执行它们的回调
- 对象: shallowEqual(oldObj, newObj)对比新旧对象(props), 两个对象属性数量相同，且其中一个对象的每个属性都与另一个对象的同名属性相等时，这两个对象才算相等

2. 合成事件中的的数据对比

在触发 onSelect 合成事件前，React 用浅对比判断选中项是否真的有变化，真有变化才会触发事件，否则不会触发


3. React 纯组件

> 在 React 里，纯组件 PureComponent 是一个主要用于性能优化的独立 API：当组件的 props 和 state 没有变化时，将跳过这次渲染，直接沿用上次渲染的结果

纯组件只`应该作为性能优化的手段`，开发者不应该将任何业务逻辑建立在到纯组件的行为上

- React.memo: 第一个参数是一个组件, 返回一个作为高阶组件的纯组件, 第二个参数戳一个对比函数

```js
// 纯组件接受的 props 与原组件相同。每次渲染时纯组件会把 props 记录下来，
// 下次渲染时会用新的 props 与老的 props 做浅对比，如果判断相等则跳过这次原组件的渲染
// 注意，原组件内部不应该有 state 和 context 操作，否则就算 props 没变，原组件还是有可能因为 props 之外的原因重新渲染
const MyPureComponent = React.memo(MyComponent);
//    ---------------              -----------
//           ^                          ^
//           |                          |
//         纯组件                       组件

// compare 函数被调用时会接受 oldProps 和 newProps 两个参数，如果返回 true，则视为相等，反之则视为不等
const MyPureComponent = React.memo(MyComponent, compare);
//    ---------------              -----------  -------
//           ^                          ^          ^
//           |                          |          |
//         纯组件                       组件      自定义对比函数
```

4. 实现不可变数据

**别改原对象**

```js
// 数组
const itemAdded = [...oldArray, newItem];
const itemRemoved = oldArray.filter(item => item !== newItem);

// 对象
const propertyUpdated = { ...oldObj, property1: 'newValue' };

// Map
const keyUpdated = new Map(oldMap).set('key1', 'newValue');
```

### 真 子组件(Sub-Components)

描述设计时（Design-time）组件与组件间的强包含关系（Containment），而在运行时这些组件之间却不一定是父子关系

```js
// props 比较复杂
<Dialog
  modal
  onClose={() => {}}
  title="这是标题"
  titleClass="dialog-title"
  titleStyle={{ color: 'blue' }}
  content="这是正文。"
  contentClass="dialog-content"
  contentStyle={{ color: 'red' }}
  showConfirmButton={true}
  confirmButtonText="确认"
  onConfirmButtonClick={() => {}}
  showCancelButton={false}
  cancelButtonText=""
  onCancelButtonClick={() => {}}
  {/* ...还有很多props */}
/>

// 为 Dialog 设计了如下 副组件
const Dialog = (props) => {/* 待实现 */};
Dialog.Title = () => null;
Dialog.Content = () => null;
Dialog.Action = () => null;

// 期待这样使用
<Dialog modal onClose={() => {}}>
  <Dialog.Title className="dialog-title" style={{ color: 'blue' }}>
    这是标题
  </Dialog.Title>
  <Dialog.Content>
    <p>这是正文。</p>
    <p>这是正文第二段。</p>
  </Dialog.Content>
  <Dialog.Action type="confirm" onClick={() => {}}>确认</Dialog.Action>
  <Dialog.Action type="cancel" onClick={() => {}}>取消</Dialog.Action>
</Dialog>
```

这些 Sub-Component与其他自定义组件一样, 创建对应的 React 元素出来, 导致元素树变得冗长, 我们只想它们当做 Dialog 的一种扩展属性?

基于 `React.Children  API`，定义两个工具函数 findByType 和 findAllByType，用于选取 children 中特定类型的 React 元素

```jsx
function findByType(children, type) {
  return React.Children.toArray(children).find(c => c.type === type);
}

function findAllByType(children, type) {
  return React.Children.toArray(children).filter(c => c.type === type);
}


const Dialog = ({ modal, onClose, children }) => {
  const renderTitle = () => {
    const subElement = findByType(children, Dialog.Title);
    if (subElement) {
      const { className, style, children } = subElement.props;
      return (<h1 {...{ className, style }}>{children}</h1>);
    }
    return null;
  };
  const renderContent = () => {
    const subElement = findByType(children, Dialog.Content);
    return subElement?.props?.children;
  };
  const renderButtons = () => {
    const subElements = findAllByType(children, Dialog.Action);
    return subElements.map(({ props: { onClick, children } }) => (
      <button onClick={onClick} key={children}>{children}</button>
    ));
  };
  return (
    <dialog open>
      <header>{renderTitle()}</header>
      <main>{renderContent()}</main>
      <footer>{renderButtons()}</footer>
    </dialog>
  );
};
Dialog.Title = () => null;
Dialog.Content = () => null;
Dialog.Action = () => null;
```


### 什么是 Fiber 协调引擎

React 组件会渲染出一棵元素树……每次有 props、state 等数据变动时，组件会渲染出新的元素树，React 框架会与之前的树做 Diffing 对比，将元素的变动最终体现在浏览器页面的 DOM 中。这一过程就称为协调（Reconciliation）

在 React 的早期版本，协调是一个同步过程，这意味着当虚拟 DOM 足够复杂，或者元素渲染时产生的各种计算足够重，协调过程本身就可能超过 16ms，严重的会导致页面卡顿。而从 React v16 开始，协调从之前的同步改成了异步过程，这主要得益于新的 Fiber 协调引擎

Fiber 协调引擎做的事情基本上贯穿了 React 应用的整个生命周期，包括并不限于:

- 创建各类 FiberNode 树, 并组件 Fiber 树;
- 调度并执行各类工作（Work），如渲染函数组件、挂载或是更新 Hooks、实例化或更新类组件等；
- 比对新旧 Fiber, 触发 DOM 变更
- 获取 Context 数据
- 错误处理
- 性能监控


### Fiber 中重要概念和模型

协调过程中存在着各种动作，如调用生命周期方法或 Hooks，这在 Fiber 协调引擎中被称作是`工作（Work）`

Fiber 中`最基本的模型是 FiberNode`，用于描述一个组件需要做的或者已完成的工作，每个组件可能对应一个或多个 FiberNode

```jsx
// FiberNode 的数据结构，
type Fiber = {
  // ---- Fiber类型 ----

  /** 工作类型，枚举值包括：函数组件、类组件、HTML元素、Fragment等 */
  tag: WorkTag,
  /** 就是那个子元素列表用的key属性 */
  key: null | string,
  /** 对应React元素ReactElmement.type属性 */
  elementType: any,
  /** 函数组件对应的函数或类组件对应的类 */
  type: any,

  // ---- Fiber Tree树形结构 ----

  /** 指向父FiberNode的指针 */
  return: Fiber | null,
  /** 指向子FiberNode的指针 */
  child: Fiber | null,
  /** 指向平级FiberNode的指针 */
  sibling: Fiber | null,
  
  // ---- Fiber数据 ----

  /** 经本次渲染更新的props值 */  
  pendingProps: any,
  /** 上一次渲染的props值 */
  memoizedProps: any,
  /** 上一次渲染的state值，或是本次更新中的state值 */
  memoizedState: any,
  /** 各种state更新、回调、副作用回调和DOM更新的队列 */
  updateQueue: mixed,
  /** 为类组件保存对实例对象的引用，或为HTML元素保存对真实DOM的引用 */
  stateNode: any,

  // ---- Effect副作用 ----

  /** 副作用种类的位域，可同时标记多种副作用，如Placement、Update、Callback等 */
  flags: Flags,
  /** 指向下一个具有副作用的Fiber的引用，在React 18中貌似已被弃用 */
  nextEffect: Fiber | null,

  // ---- 异步性/并发性 ----
  
  /** 当前Fiber与成对的进行中Fiber的双向引用 */
  alternate: Fiber | null,
  /** 标记Lane车道模型中车道的位域，表示调度的优先级 */
  lanes: Lanes
};

// 与 Hooks 相关的模型，这包括了 Hook 和 Effect
type Hook = {
  memoizedState: any,
  baseState: any,
  baseQueue: Update<any, any> | null,
  queue: any,
  next: Hook | null,
};

type Effect = {
  tag: HookFlags,
  create: () => (() => void) | void,
  destroy: (() => void) | void,
  deps: Array | null,
  next: Effect,
};
```

### 协调过程是怎样的

第一次渲染, React元素被创建出来后, Fiber 协调引擎会从 HostRoot 这个特殊的元素开始, 遍历元素树, 创建对应的 FiberNode.

FiberNode 与 FiberNode 之间, 不是传统的树结构. 而是在 

- 父节点和它的第一个子节点, 利用 child 和 return 建立了双向链表.
- 节点和它的平级节点, 利用 sibling 属性创建了 单向链表,
- 同时平级节点的 return属性, 被设置成和单向链表起点的节点 return 一样的值引用

**渲染阶段:**

避免递归遍历 Fiber 树, 而仅仅用两层循环来完成深度优先遍历 这个用于遍历 Fiber 数的循环被称为 `workLoop`

这个循环随时可以跑，随时可以停。这意味着 workLoop 既可以同步跑，也可以异步跑，当 workLoop 发现进行中的 Fiber 工作耗时过长时，可以根据一个 shouldYield() 标记决定是否暂停工作，释放计算资源给更紧急的任务，等完成后再恢复工作

当组件内更新 state 或有 context 更新时，React 会进入渲染阶段（Render Phase）, 是异步的, 启动 `workLoop`

- 从 Fiber 树的根部开始遍历，快速跳过已处理的节点
- 对有变化的节点，引擎会为 Current（当前）节点克隆一个 WorkInProgress（进行中）节点
- 将这两个 FiberNode 的 alternate 属性分别指向对方，并把更新都记录在WorkInProgress 节点上
- 一棵 `Current 树`，对应着目前已经渲染到页面上的内容；另一棵是 `WorkInProgress 树`，记录着即将发生的修改


函数组件的 Hook 也是在渲染阶段执行的. 除了 useContext Hooks挂载后, 都会形成一个 `Hook.next` 属性连接的单向链表, 链表会挂在 `FiberNode.memoizedState` 属性上,

在此基础上, useEffect 这样会产生副作用的 Hooks，会额外创建与 Hook 对象一一对应的 Effect 对象，赋值给 Hook.memoizedState 属性

此外，也会在 FiberNode.updateQueue 属性上，维护一个由 Effect.next 属性连接的单向链表，并把这个 Effect 对象加入到链表末尾。


**提交阶段:**

当 Fiber 树所有节点都完成工作后，`WorkInProgress` 节点会被改称为 `FinishedWork`（已完成）节点，WorkInProgress 树也会被改称为 FinishedWork树, 同步执行的, Fiber 协调引擎会把FinishedWork 节点上记录的所有修改，按一定顺序提交并体现在页面上

- 变更前（Before Mutation）子阶段。这个子阶段会调用类组件的 `getSnapshotBeforeUpdate` 方法。
- 变更（Mutation）子阶段。这个子阶段会更新真实 DOM 树
  - 递归提交与删除相关的副作用，包括移除 ref、移除真实 DOM、执行类组件的 componentWillUnmount
  - 递归提交添加、重新排序真实 DOM 等副作用
  - 依次执行 FiberNode 上 useLayoutEffect 的清除函数。
  - 引擎用 FinishedWork 树替换 Current 树，供下次渲染阶段使用
- 布局（Layout）子阶段, 这个子阶段真实 DOM 树已经完成了变更，会调用 useLayoutEffect 的副作用回调函数，和类组件的 componentDidMount 方法


在提交阶段中，引擎还会多次异步或同步调用 `flushPassiveEffects`() 。这个函数会先后两轮按深度优先遍历 Fiber 树上每个节点：

- 第一轮：如果节点的 updateQueue 链表中有待执行的、由 useEffect 定义的副作用，则顺序执行它们的清除函数；
- 第二轮：如果节点的 updateQueue 链表中有待执行的、由 useEffect 定义的副作用，则顺序执行它们的副作用回调函数，并保存清除函数，供下一轮提交阶段执行
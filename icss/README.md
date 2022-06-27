# CSS 知识点

### 渲染过程

关键渲染路径指浏览器从最初接收请求得到 HTML、CSS、JS 等资源，然后解析、构建、渲染、布局、绘制、合成，到最后呈现在用户眼前界面的整个过程

- 解析文件: 将 html 转换为 DOM 树; 将 css 转换为 CSSOM 树; 将 DOM 树和 CSSOM 树合并生成渲染树;
- 绘制图层: 根据渲染树生成布局渲染树(回流); 根据布局渲染树生成绘制渲染树(重绘)
- 合成图层：根据绘制渲染树合成图层显示在屏幕上

```css
* {
  margin: 0;
  padding: 0;
}
```

- `normalize.css`

### 回流重绘

1. 回流: 回流又称重拍, 指 几何属性 需改变的渲染, 可理解为 => 将网页填白, 对内容重新渲染一次,
2. 重绘: 指更改外观而不影响几何属性

---

1. 几何属性
   - 布局: dispaly float position list table flex columns grid
   - 尺寸: margin padding border width height
2. 外观属性
   - 界面: outline background mask box-shadow box-reflect filter opacity
   - 文字: font text word

---

回流成本比重绘成本高: 回流必定引发重绘，重绘不一定引发回流 => 产生想能问题?

- 改变窗口大小, 修改盒模型, 增删样式, 重构布局, 重设尺寸, 改变字体,

回流重绘其实与浏览器的事件循环有关 =>

- 浏览器刷新频率为 60Hz，即每 16.6ms 更新一次; 事件循环执行完成微任务; 判断 document 是否需更新; 判断 resize/scroll 事件是否存在，存在则触发事件;

```css
visibility: hidden 替换 dispaly: none
transform 代替 top
避免使用 table 布局
避免规则层级过多
避免节点属性值放在循环里当成循环变量
for (let i = 0; i < 10000; i++) {
    const top = document.getElementById("css").style.top;
    console.log(top);
}

动态改变类而不改变样式

将频繁回流重绘的节点设置为图层 => 设置新图层有两种方式，将节点设置为<video>或<iframe>，为节点添加will-change

使用requestAnimationFrame作为动画帧

属性排序

布局 -> 尺寸 -> 界面 -> 文字 -> 交互
布局: display visibility float position table-layout flex-wrap ...
尺寸: margin padding border width ...
界面: outline background mask box-shadow ...
文字: font text ....
```

### 盒模型

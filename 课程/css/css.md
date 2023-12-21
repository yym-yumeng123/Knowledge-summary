### css 比较麻烦的地方

1. margin 上下合并; 
   1. 盒子之间, 添加一个 border, margin就不会合并了
   2. display: table|flex; 也可以防止margin合并
2. 父子元素 border 影响 margin
3. ul>li 小圆点; li display:block 会让圆点消失
4. position: relative; 子元素 display: inline, 被添加了 position: absolute, 变成了 display: block
5. 子元素 position: fixed 定位, 相对于视口定位; 父元素设置 transform 属性, 子元素变了, 相对有trnsform 属性的元素定位了
6. 文字会被 float 浮动元素影响, 不影响block元素


### css 学习的容易点

被套路

1. 水平居中
   1. child 宽度不确定; margin 0 20px;
   2. child 宽度确定: margin 0 auto;

2. 垂直居中
   1. child 高度确定; padding: 20px 0;
   2. parent 高度确定: 尽量避免, 使用子元素撑起来
   3. display: table;
   4. display: flex;


### 文档流

#### 块级元素的宽高

- 字和字之间通过基线对齐
- 设计字体会给一个建议行高
- html里面 1 2 之间有多个空格, 也只显示一个, 手动使用 `&nbsp` 添加空格; 空格的宽度设计师设计的
  - `text-align: justify` 换行的两边对齐
- 多个 inline-block 元素之间有空格, 尽量不用 inline-block
- 内联元素足够多, 一行放不下,会自动换行, 文档流

```html
<!-- div没有内容, 没有高度 -->
<!-- 每一个字体, 都有自己的行高 -->
<!-- 一行高度 = font-size * 行高 -->
<div>1</div>


word-break: break-all; 
```

```html
<style>
  span {
    text-align: justify;
    overflow: hidden;
  }
  span::after {
    content: "";
    dispaly: inline-block;
    width: 100%
  }
</style>

<!-- 内容两边对齐 -->
<span>姓名</span>
<span>联系方式</span>
```

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
- `div 的高度是由内部文档流中元素的总和决定的`
- `文档流`文档流中的内联元素会从左到右并列排成一行, 空间不够, 会换行一次排列; 块级元素从上到下
- `脱离文档流`
  - float 浮动
  - position: absolute | fixed

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

#### 多行文字溢出

```css
/* 一行文本 */
div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 多行文本 */
div {
  display: --webkit-box;
  --webkit-line-clamp: 2; // 两行
  --webkit-box-orient:vertical;
  overflow: hidden;
}
```

#### 文字垂直居中

- padding: 10px 0;, 不要定死高度


#### margin合并

父元素有没有border或者有一些属性能够挡住父元素, 子元素的 margin 会不会和父元素合并

- 父子元素之间有没有什么属性能挡住一下, 决定 margin 是否合并
- 父元素下面既有行内元素, 又有块级元素, 内联元素挡在中间,也会解决margin 合并


#### 堆叠上下文

满足某种条件的div或某种元素, 堆叠上下文

- 根元素(html)
- z-index != auto 的绝对/相对定位
- opacity 值 < 1 的
- podtion: fixed

div 不是平面的,三维概念, 最下到最上层 (在浏览器通过颜色, 位置调试)

1. background
2. border
3. 块级元素
4. 浮动
5. 内联
6. z-index: 0
7. z-index: +
8. 兄弟元素重叠, 后面的盖在前面的身上


### icon 的各种做法

1. 切图
   1. photoshop 切图, 导出图层; Image/trim 图片; 导出png
   2. 使用 `img 标签`
2. `background icon`
   1. `background: color url(./xx.png) no-repeat`
   2. 雪碧图(css sprites): css sprite generator
      1. `background-position: x y` 来定位图片里面小图片的位置; `overflow: hidden`
3. iconfont-html
   1. 原理: 把icon 替换成类似字体(设计)的东西, 打 苹果 出来苹果的icon, 做一个映射 
   2. 使用 iconfont 这个软件
   3. 或者使用伪类 .xxx:before{content: 'unicode'}
4. svg icon: 使用 `svg` 画出的
   1. svg 也可以在 iconfont 网站里面使用 svg 模式
5. css 干 icon
   1. 纯用 css 写样式
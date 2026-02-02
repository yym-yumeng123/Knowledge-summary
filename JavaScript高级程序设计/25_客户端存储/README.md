# 客户端存储

## cookie

HTTP cookie 最初用户客户端存储会话信息, 这个规范要求去服务器在响应头中设置 Set-Cookie 头, 浏览器会自动保存这个 cookie, 下次请求的时候会自动发送给服务器。

```
HTTP/1.1 200 OK
Set-Cookie: session_id=1234567890; expires=Thu, 31-Dec-2020 23:59:59 GMT; path=/; secure; httponly
```

### 限制

1. 不超过 4KB
2. 每个域能设置的 cookie 总数也是受限的，但不同浏览器的限制不同
   1. 如果 cookie 总数超过了单个域的上限，浏览器就会删除之前设置的 cookie

### cookie 的构成

1. 名称: 唯一标识, 不区分大小写, cookie 名必须通过 URL 编码
2. 值: 存储在 cookie 里的字符串值, 这个值必须通过 URL 编码
3. 域: cookie 的作用域, 默认是当前域名, 可以设置多个域名, 域名之间用逗号隔开
4. 路径: 请求 URL 中包含这个路径才会把 cookie 发送到服务器
5. 过期时间: 表示何时删除 cookie 的时间戳（即什么时间之后就不发送到服务器了）。默认情况下，浏览器会话结束后会删除所有 cookie。
6. 安全标志: 只在使用 SSL 安全连接的情况下才会把 cookie 发送到服务器

```http
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value; expires=Mon, 22-Jan-07 07:10:24 GMT; domain=.wrox.com
Other-header: other-header-value

Set-Cookie: name=value; domain=.wrox.com; path=/; secure
```

### JavaScript 中的 cookie

在 JS 处理 cookie 比较麻烦, 因为接口过于简单, 只有 BOM 的 `document.cookie` 属性

document.cookie 返回包含页面中所有有效 cookie 的字符串（根据域、路径、过期时间和安全设置），以分号分隔，如下面的例子所示

```javascript
name1=value1;name2=value2;name3=value3

document.cookie = encodeURIComponent("name") + "=" + encodeURIComponent("Nicholas");

document.cookie = encodeURIComponent("name") + "=" + encodeURIComponent("Nicholas") + "; domain=.wrox.com; path=/";
```

### 子 cookie

子 cookie 是在单个 cookie 存储的小块数据，本质上是使用 cookie 的值在单个 cookie 中存储多个名/值对

`name=name1=value1&name2=value2&name3=value3&name4=value4&name5=value5`

### 使用 cookie 的注意事项

还有一种叫作 HTTP-only 的 cookie。HTTP-only 可以在浏览器设置，也可以在服务器设置，但只能在服务器上读取，这是因为 JavaScript 无法取得这种 cookie 的值

## Web Storage

Web Storage 的第 2 版定义了两个对象：localStorage 和 sessionStorage。localStorage 是永久存储机制，sessionStorage 是跨会话的存储机制, 空间限制: 5M

### storage 类型

- clear(): 清空所有数据
- getItem(key): 获取指定 key 的值
- key(index): 获取指定索引的 key
- removeItem(key): 删除指定 key 的值
- setItem(key, value): 设置指定 key 的值

### sessionStorage 对象

sessionStorage 对象只存储会话数据, 意味数据只会存储到浏览器关闭, 存储在 sessionStorage 中的数据不受页面刷新影响，可以在浏览器崩溃并重启后恢复

```js
sessionStorage.setItem('name', '张三');
sessionStorage.getItem('name');
```

### localStorage 对象

访问同一个 localStorage 对象，页面必须来自同一个域（子域不可以）、在相同的端口上使用相同的协议。

```js
// 使用方法存储数据
localStorage.setItem('name', '张三');

// 使用属性存储数据
localStorage.name = '张三';
```

### 存储事件

每当 Storage 对象发生变化时, 会在文档触发 storage 事件, 这个事件的事件对象有如下 4 个属性

- domain: 触发该事件的源域名
- key: 被设置或者删除的键
- newValue: 设置的值
- oldValue: 删除的值

```js
window.addEventListener("storage", (event) =>
  alert("Storage changed for ${event.domain}")
)
```

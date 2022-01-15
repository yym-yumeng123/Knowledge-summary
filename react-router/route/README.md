### React-Router

### 安装

```node
yarn add react-router-dom@6
```

### 使用

1. 从`react-router-dom`中导入`BrowserRouter`，并将应用包装在`<BrowserRouter>`中

```js
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

2. 现在你可以在应用任何地方使用 `react-router`

```js
// app.js
import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";

// Routes 相当于所有路由的父组件
// Route 指向我们需要显示的组件和地址

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}
```

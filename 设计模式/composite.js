/**
 * 有一个层层嵌套的结构, 包含复合物和叶子, 复合物也可以包含复合物和叶子
 *
 * Composite => C1;C2; Leaf;  => C1 => L1; L2   C2 => L1;L2;L3
 */

// 定义一个容器特征
class Container {
  constructor(id) {
    // 有孩子
    this.children = [];
    this.element = document.createElement("div");
    this.element.id = id;
    this.element.style.border = "1px solid red";
    this.element.style.margin = "10px";
    this.element.classList.add("container");
  }
  add(child) {
    this.children.push(child);
    this.element.appendChild(child.getElement());
  }
  hide() {
    this.children.forEach((node) => node.hide());
    this.element.style.display = "none";
  }
  show() {
    this.children.forEach((node) => node.show());
    this.element.style.display = "";
  }
  getElement() {
    return this.element;
  }
}

// 定义一个叶子 Leaf 特征
class Text {
  constructor(text) {
    this.element = document.createElement("p");
    this.element.innerText = text;
  }
  add() {}
  hide() {
    this.element.style.display = "none";
  }
  show() {
    this.element.style.display = "";
  }
  getElement() {
    return this.element;
  }
}

let header = new Container("header");
header.add(new Text("标题"));
header.add(new Text("logo"));

let main = new Container("main");
main.add(new Text("内容1"));
main.add(new Text("内容2"));

let page = new Container("page");
page.add(header);
page.add(main);
page.show();

document.body.appendChild(page.getElement());

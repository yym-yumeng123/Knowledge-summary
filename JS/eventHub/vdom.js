let nodesData = {
  tag: "div",
  children: [
    {
      tag: "p",
      children: [
        {
          tag: "span",
          children: [
            {
              tag: "#text",
              text: "xiedaimala.com",
            },
          ],
        },
      ],
    },
    {
      tag: "span",
      children: [
        {
          tag: "#text",
          text: "jirengu.com",
        },
      ],
    },
  ],
}

/**
 * 简易虚拟DOM
 */
class VNode {
  constructor(tag, children, text) {
    this.tag = tag
    this.children = children
    this.text = text
  }

  render() {
    if (this.tag === "#text") {
      return document.createTextNode(this.text)
    }
    let el = document.createElement(this.tag)
    this.children.forEach((vChild) => {
      el.appendChild(vChild.render())
    })

    return el
  }
}

function v(tag, children, text) {
  if (typeof children === "string") {
    text = children
    children = []
  }

  return new VNode(tag, children, text)
}

let vNodes = v("div", [
  v("p", [v("span", [v("#text", "xiedaimala.com")])]),
  v("span", [v("#text", "jirengu.com")]),
])
console.log(vNodes.render())


/**
 * @description 对比更新新的 vdom
 * @param {父元素} parent 
 * @param {新的虚拟dom} newVNode 
 * @param {旧的虚拟dom} oldVNode 
 * @param {*} index 
 */
function patchElement(parent, newVNode, oldVNode, index = 0) {
  // 如果没有旧的 VNode, 那就新增渲染
  if(!oldVNode) {
    parent.appendChild(newVNode.render())
  } else if(!newVNode) {
    // 如果没有新节点, 删除
    parent.removeChild(parent.childNodes[index])
  } else if(newVNode.tag !== oldVNode.tag || newVNode.text !== oldVNode.text) {
    // 如果 标签不一样, 替换 parent 里面的 标签
    parent.replaceChild(newVNode.render(), parent.childNodes[index])
  }  else {
    // 看 子元素 的节点有没有变化, 弄一个递归
    for(let i = 0; i < newVNode.children.length || i < oldVNode.children.length; i++) {
      patchElement(parent.childNodes[index], newVNode.children[i], oldVNode.children[i], i)
    }
  }
}

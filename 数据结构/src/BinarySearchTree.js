const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};

function defaultCompare(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN; // {2}
}

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    // 将声明一个变量以控制此数据结构的第一个节点。在树中，它不再是 head，而是 root
    this.root = null;
  }

  //
  // 如果树非空，需要找到插入新节点的位置。因此，在调用 insertNode 方法时要通过参数传入树的根节点和要插入的节点
  insertNode(node, key) {
    // 如果新节点的键小于当前节点的键
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 检查当前节点的左侧子节点, 如果它没有左侧子节点
      if (node.left == null) {
        // 在那里插入新的节点
        node.left = new Node(key);

        // 有左侧子节点，需要通过递归调用 insertNode方法
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      // 节点的键比当前节点的键大，同时当前节点没有右侧子节点
      if (node.right == null) {
        node.right = new Node(key);

        // 有右侧子节点，同样需要递归调用 insertNode 方法
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  insert(key) {
    // 尝试插入的树节点是否为第一个节点
    if (this.root == null) {
      // 创建一个 Node 类的实例并将它赋值给 root 属性来将 root 指向这个新节点, 左指针和右指针的值会由构造函数自动设置为 null
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  /**
   * 中序遍历
   * @param {接收一个回调函数作为参数} callback
   */
  inOrderTraverse(callback) {
    // 定义我们对遍历到的每个节点进行的操作
    this.inOrderTraverseNode(this.root, callback);
  }

  // 辅助方法，来接收一个节点和对应的回调函数作为参数
  inOrderTraverseNode(node, callback) {
    // 首先要检查以参数形式传入的节点是否为 null, 停止递归继续执行的判断条件
    if (node != null) {
      // 递归调用相同的函数来访问左侧子节点, 再访问右侧子节点
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }
}

module.exports = BinarySearchTree;

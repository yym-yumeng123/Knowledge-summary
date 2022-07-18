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

  // 先序遍历
  preOrderTraveser(callback) {
    this.preOrderTraveserNode(this.root, callback);
  }

  preOrderTraveserNode(node, callback) {
    if (node != null) {
      callback(node.key);
      this.preOrderTraveserNode(node.left, callback);
      this.preOrderTraveserNode(node.right, callback);
    }
  }

  // 后序遍历
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }

  postOrderTraverseNode(node, callback) {
    if (node != null) {
      // 后序遍历会先访问左侧子节点
      this.postOrderTraverseNode(node.left, callback);
      // 然后是右侧子节点
      this.postOrderTraverseNode(node.right, callback);
      // 最后是父节点本身
      callback(node.key);
    }
  }

  min() {
    return this.minNode(this.root);
  }

  // 允许我们从树中任意一个节点开始寻找最小的键, 找到最左端
  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }

  max() {
    return this.maxNode(this.root);
  }

  // 沿着树的右边进行遍历
  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }

  // 声明 search 方法。和 BST 中声明的其他方法的模式相同，我们将会使用一个辅助方法
  search(key) {
    return this.searchNode(this.root, key);
  }

  // searchNode 方法可以用来寻找一棵树或其任意子树中的一个特定的值
  searchNode(node, key) {
    // 验证作为参数传入的 node 是否合法
    if (node == null) return false;
    // 要找的键比当前的节点小, 在左侧的子树上搜索
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);

      // 要找的键比当前的节点大, 从右侧子节点开始继续搜索
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }

  remove(key) {
    // 传入 root 和要移除的键作为参数
    this.root = this.removeNode(this.root, key);
  }

  removeNode(node, key) {
    // 正在检测的节点为 null，那么说明键不存在于树中，所以返回 null
    if (node == null) return null;

    // 要找的键比当前节点的值小, 沿着树的左边找到下一个节点
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;

      // 要找的键比当前节点的值大, 沿着树的右边找到下一个节点
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // 找到了要找的键（键和 node.key 相等），就需要处理三种不同的情况

      // 第一种情况是该节点是一个没有左侧或右侧子节点的叶节点
      if (node.left == null && node.right == null) {
        // 是给这个节点赋予 null 值来移除它
        node = null;
        // 需要处理引用（指针）。在这里，这个节点没有任何子节点，但是它有一个父节点，需要通过返回 null 来将对应的父节点指针赋予 null 值
        return node;
      }

      // 第二种情况移除有一个左侧子节点或右侧子节点的节点, 需要跳过这个节点，直接将父节点指向它的指针指向子节点
      // 这个节点没有左侧子节点, 也就是说它有一个右侧子节点, 把对它的引用改为对它右侧子节点的引用, 返回更新后的节点
      if (node.left == null) {
        node = node.right;
        return node;
      } else if (node.right == null) {
        node = node.left;
        return node;
      }

      // 第三种情况, 要移除的节点有两个子节点——左侧子节点和右侧子节点
      // 当找到了要移除的节点后，需要找到它右边子树中最小的节点
      const aux = this.minNode(node.right);
      // 用它右侧子树中最小节点的键去更新这个节点的值, 通过这一步，我们改变了这个节点的键，也就是说它被移除了
      node.key = aux.key;
      // 这样在树中就有两个拥有相同键的节点了，这是不行的。要继续把右侧子树中的最小节点移除，毕竟它已经被移至要移除的节点的位置了
      node.right = this.removeNode(node.right, aux.key);
      // 向它的父节点返回更新后节点的引用
      return node;
    }
  }
}

module.exports = BinarySearchTree;

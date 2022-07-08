const Queue = require("./queue");
const Stack = require("./stack-array");
const Deque = require("./Deque");
const Set = require("./Set");
const Dictionary = require("./Dictionary");
const HashTable = require("./HashTable");
const LinkedList = require("./LinkedList");
const BinarySearchTree = require("./BinarySearchTree");

const queue = new Queue();
console.log("queue.isEmpty()", queue.isEmpty()); // true
queue.enqueue("yym");
queue.enqueue("jack");
console.log("queue.toString()", queue.toString()); // yym,jack

queue.enqueue("Ma");
console.log("queue.toString()", queue.toString()); // yym,jack,Ma
console.log("queue.size()", queue.size()); // 3
queue.dequeue();
console.log("queue.toString()", queue.toString()); // jack,Ma

const deque = new Deque();
console.log(deque.isEmpty()); // 输出 true
deque.addBack("John");
deque.addBack("Jack");
console.log(deque.toString()); // John, Jack
deque.addBack("Camila");
console.log(deque.toString()); // John, Jack, Camila
console.log(deque.size()); // 输出 3
console.log(deque.isEmpty()); // 输出 false
deque.removeFront(); // 移除 John
console.log(deque.toString()); // Jack, Camila
deque.removeBack(); // Camila 决定离开
console.log(deque.toString()); // Jack
deque.addFront("John"); // John 回来询问一些信息
console.log(deque.toString()); // John, Jack

const set = new Set();
set.add(1);
console.log("set.values()", set.values()); // [1]
console.log("set.has(1)", set.has(1)); // true
console.log("set.has(2)", set.has(2)); // false
console.log("set.size()", set.size()); // 1
set.add(3);
console.log("set.values()", set.values()); // [1, 3]
console.log("set.has(1)", set.has(1)); // true
console.log("set.has(2)", set.has(2)); // false
console.log("set.size()", set.size()); // 2
console.log("set.delete(1)", set.delete(1));

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

const setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);

const unionAB = setA.union(setB);

console.log("unionAB.values()", unionAB.values());

const setA1 = new Set();
setA1.add(1);
setA1.add(2);
setA1.add(3);
const setB1 = new Set();
setB1.add(2);
setB1.add(3);
setB1.add(4);
const intersectionAB = setA1.intersection(setB1);
console.log(intersectionAB.values());

const setA2 = new Set();
setA2.add(1);
setA2.add(2);
setA2.add(3);
const setB2 = new Set();
setB2.add(2);
setB2.add(3);
setB2.add(4);
const differenceAB = setA2.difference(setB2);
console.log("differenceAB.values()", differenceAB.values()); // [1]

const setA4 = new Set();
setA4.add(1);
setA4.add(2);
const setB4 = new Set();
setB4.add(1);
setB4.add(2);
setB4.add(3);
const setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);
console.log(setA4.isSubsetOf(setB4));
console.log(setA4.isSubsetOf(setC));

const dictionary = new Dictionary();
dictionary.set("Gandalf", "gandalf@email.com");
dictionary.set("John", "johnsnow@email.com");
dictionary.set("Tyrion", "tyrion@email.com");
console.log("dictionary.hasKey('John')", dictionary.hasKey("John")); // true
console.log("dictionary.size()", dictionary.size()); // 3
console.log(dictionary.keys()); // [ 'Gandalf', 'John', 'Tyrion' ]
console.log(dictionary.values()); // [ 'gandalf@email.com', 'johnsnow@email.com', 'tyrion@email.com' ]
console.log(dictionary.get("Tyrion")); // tyrion@email.com

dictionary.remove("John");
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.keyValues());

dictionary.forEach((k, v) => {
  console.log("forEach: ", `key: ${k}, value: ${v}`);
});

const hash = new HashTable();
hash.put("Gandalf", "gandalf@email.com");
hash.put("John", "johnsnow@email.com");
hash.put("Tyrion", "tyrion@email.com");

console.log(hash.hashCode("Gandalf") + " - Gandalf"); // 19 - Gandalf
console.log(hash.hashCode("John") + " - John"); // 29 - John
console.log(hash.hashCode("Tyrion") + " - Tyrion"); // 16 - Tyrion

console.log(hash.get("Gandalf")); // gandalf@email.com
console.log(hash.get("Loiane")); // undefined

hash.remove("Gandalf");
console.log(hash.get("Gandalf"));

const list = new LinkedList();
list.push(15);
list.push(10);

console.log("list", list);

const tree = new BinarySearchTree();
tree.insert(11);
console.log("tree", tree);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
console.log(tree, "tree1");

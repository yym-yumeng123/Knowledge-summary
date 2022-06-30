const Queue = require("./queue");
const Stack = require("./stack-array");
const Deque = require("./Deque");
const Set = require("./Set");

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

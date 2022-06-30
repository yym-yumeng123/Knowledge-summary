const Queue = require("./queue");
const Stack = require("./stack-array");

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

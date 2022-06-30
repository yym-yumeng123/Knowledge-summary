const Queue = require("./queue");

function hotPotato(elementList, num) {
  const queue = new Queue();
  const elimitatedList = [];

  // 会得到一份名单, 把里面的名字加入队列
  for (let i = 0; i < elementList.length; i++) {
    queue.enqueue(elementList[i]);
  }

  // 给定一个数字, 然后迭代队列. 从队列开头移除一项, 再将其添加到队列末尾
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    // 模拟击鼓传花（如果你把花传给了旁边的人，你被淘汰的威胁就立刻解除了）。一旦达到给定的传递次数，拿着花的那个人就被淘汰了（从队列中移除
    elimitatedList.push(queue.dequeue());
  }

  // 最后只剩下一个人的时候，这个人就是胜者
  return {
    eliminated: elimitatedList,
    winner: queue.dequeue(),
  };
}

const names = ["John", "Jack", "Camila", "Ingrid", "Carl"];
const result = hotPotato(names, 7);

result.eliminated.forEach((name) => {
  console.log(`${name}在击鼓传花游戏中被淘汰。`);
});

console.log(`胜利者： ${result.winner}`);

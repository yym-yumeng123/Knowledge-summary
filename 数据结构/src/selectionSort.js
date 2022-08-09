const defaultCompare = require("./defaultCompare");
const swap = require("./swap");
const createNonSortedArray = require("./createNonSortedArray");

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};

const selectionSort = (array, compareFn = defaultCompare) => {
  const { length } = array;
  let indexMin;

  // 外循环迭代数组，并控制迭代轮次（数组的第 n 个值——下一个最小值）
  for (let i = 0; i < length - 1; i++) {
    // 假设本迭代轮次的第一个值为数组最小值
    indexMin = i;

    // 然后，从当前 i 的值开始至数组结束,
    for (let j = i; j < length; j++) {
      // 我们比较是否位置 j 的值比当前最小值小
      if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
        // 如果是，则改变最小值至新最小值
        indexMin = j;
      }
    }

    // 如果该最小值和原最小值不同，则交换其值
    if (i !== indexMin) {
      swap(array, i, indexMin);
    }
  }
  return array;
};

let array = createNonSortedArray(5);
console.log(array.join());
array = selectionSort(array);
console.log(array.join());

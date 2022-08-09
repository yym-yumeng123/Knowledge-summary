/**
 * 插入排序
 */
const defaultCompare = require("./defaultCompare");
const swap = require("./swap");
const createNonSortedArray = require("./createNonSortedArray");

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};

const insertionSort = (array, compareFn = defaultCompare) => {
  const { length } = array;
  let temp;

  // 迭代数组来给第i项找到正确的位置, 从索引 1 开始
  for (let i = 1; i < length; i++) {
    let j = i; // 初始一个辅助变量
    temp = array[i]; // 将其值存储在一个临时变量中

    // 找到正确的位置来插入项目, 变量 j 比 0 大（因为数组的第一个索引是 0——没有负值的索引）
    // 并且数组中前面的值比待比较的值大
    while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
      // 就把这个值移到当前位置上, 并减小 j
      array[j] = array[j - 1];
      j--;
    }
    array[j] = temp;
  }

  return array;
};

let array = createNonSortedArray(5);
console.log(array.join());
array = insertionSort(array);
console.log(array.join());

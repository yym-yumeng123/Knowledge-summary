const defaultCompare = require("./defaultCompare");
const swap = require("./swap");
const createNonSortedArray = require("./createNonSortedArray");
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};

/**
 * @param {待排序的数组} array
 * @param {一个比较函数} compareFn
 */
const bubbleSort = (array, compareFn = defaultCompare) => {
  const { length } = array;

  // 迭代数组第一位到最后一位, 控制了在数组中经过多少轮排序
  for (let i = 0; i < length; i++) {
    // 内循环从第一位迭代至倒数第二位
    for (let j = 0; j < length - 1; j++) {
      // 当前项和下一项的比较
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1);
      }
    }
  }

  return array;
};

let array = createNonSortedArray(5); // {7}
console.log(array.join(), array); // {8}
let array1 = bubbleSort(array); // {9}
console.log(array1); //{10}

const modifiedBubbleSort = (array, compareFn = defaultCompare) => {
  const { length } = array;
  for (let i = 0; i < length; i++) {
    // 从内循环减去外循环中已跑过的轮数, 可以避免内循环中所有不必要的比较
    for (let j = 0; j < length - 1 - i; j++) {
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1);
      }
    }
  }
};

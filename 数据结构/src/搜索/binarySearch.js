const defaultCompare = require("../defaultCompare");
const mergeSort = require("../mergeSort");
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0,
};
const DOES_NOT_EXIST = -1;

function binarySearch(array, value, compareFn = defaultCompare) {
  const sortArray = mergeSort(array); // 对数组进行排序
  // 设置 low high 指针边界
  let low = 0;
  let high = sortArray.length - 1;

  // 当 low 比 high 小时, 计算得到中间项索引并取得中间项的值
  while (lesserOrEquals(low, high, compareFn)) {
    const mid = Math.floor(low + high);
    const element = sortArray[mid];

    if (compareFn(element, value) === Compare.LESS_THAN) {
      low = mid + 1;
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  return DOES_NOT_EXIST;
}

function lesserOrEquals(a, b, compareFn) {
  const comp = compareFn(a, b);
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

console.log(binarySearch([8, 7, 6, 5, 4, 3, 2, 1], 2));
console.log(binarySearch([8, 7, 6, 5, 4, 3, 2, 1], 9));

/**
 * 归并排序
 */
const defaultCompare = require("./defaultCompare");
const swap = require("./swap");
const createNonSortedArray = require("./createNonSortedArray");

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};

function mergeSort(array, compareFn = defaultCompare) {
  // 算法是递归的, 停止条件就是array.length
  if (array.length > 1) {
    const { length } = array;

    // 找到数组的中间位,
    const middle = Math.floor(length / 2);
    // 我们把数组分成两个小数组, 分别叫做left, right
    const left = mergeSort(array.slice(0, middle), compareFn);
    const right = mergeSort(array.slice(middle, length), compareFn);

    // 负责合并和排序小数组产生大数组
    array = merge(left, right, compareFn);
  }
  console.log(array, "我是array");

  return array;
}

/**
 *
 * @param {数组} left
 * @param {数组} right
 * @param {对比函数} compareFn
 * @returns
 */
function merge(left, right, compareFn) {
  let i = 0;
  let j = 0;
  const result = [];

  while (i < left.length && j < right.length) {
    // left 的数组项是否比 right 数组的项小. 如果是, 将该项从 left数组添加至归并结果数组, 并递增迭代数组的变量, 反之
    result.push(
      compareFn(left[i], right[j]) === Compare.LESS_THAN
        ? left[i++]
        : right[j++]
    );
  }

  // 将 left 数组所有剩余的项添加到归并数组中，right 数组也是一样
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}

let array = [8, 7, 6, 5, 4, 3, 2, 1];
console.log(array.join(), "join");
console.log(array, "join332");
array = mergeSort(array);
console.log(array.join());

module.exports = mergeSort;

/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-07-01 14:46:09
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-07-01 14:53:23
 * @FilePath: /Knowledge-summary/数据结构/src/factorialIterative.js
 * @Description: 阶乘
 */
const factorialIterative = (number) => {
  if (number < 0) return undefined;
  let total = 1;
  for (let n = number; n > 1; n--) {
    total = total * n;
  }
  return total;
};

console.log("factorialIterative(5)", factorialIterative(5)); // 120

const factorial = (n) => {
  if (n === 1 || n === 0) return 1; // 基线条件
  return n * factorial(n - 1);
};

console.log("factorial(5)", factorial(5));

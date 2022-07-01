/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-07-01 15:00:25
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-07-01 15:22:20
 * @FilePath: /Knowledge-summary/数据结构/src/fibonacciIterative.js
 * @Description: 斐波那契数列
 */
const fibonacciIterative = (n) => {
  if (n < 1) return 0;
  if (n <= 2) return 1;

  let fibNMinus2 = 0;
  let fibNMinus1 = 1;
  let fibN = n;

  for (let i = 2; i <= n; i++) {
    // n >= 2
    fibN = fibNMinus1 + fibNMinus2; // f(n-1) + f(n-2)
    fibNMinus2 = fibNMinus1;
    fibNMinus1 = fibN;
  }
  return fibN;
};

console.log("fibonacciIterative(10)", fibonacciIterative(10)); // 55

const fibonacci = (n) => {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

console.log("fibonacciIterative(10)", fibonacciIterative(10)); // 55

{
  // 声明了一个 memo 数组来缓存所有的计算结果
  const fibonacci = ((memory = [0, 1]) => {
    return function fib(n) {
      let result = memory[n];

      if (typeof result !== "number") {
        result = fib(n - 1) + fib(n - 2);
        memory[n] = result;
      }

      return result;
    };
  })();

  console.log("fibonacci(10)", fibonacci(10));
}

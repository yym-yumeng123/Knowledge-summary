/*
 * @Author: yym-yumeng123 18026493873@163.com
 * @Date: 2022-06-30 11:49:15
 * @LastEditors: yym-yumeng123 18026493873@163.com
 * @LastEditTime: 2022-06-30 11:57:31
 * @FilePath: /Knowledge-summary/数据结构/src/decimalToBinary.js
 * @Description: 十进制转换二进制
 */
const Stack = require("./stack-array");

const decimalToBinary = (decNumber) => {
  const remStack = new Stack();
  let number = decNumber;
  let rem;
  let binaryString = "";

  while (number > 0) {
    rem = Math.floor(number % 2);
    remStack.push(rem);
    number = Math.floor(number / 2);
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }

  return binaryString;
};

console.log(decimalToBinary(233)); // 11101001
console.log(decimalToBinary(10)); // 1010
console.log(decimalToBinary(1000)); // 1111101000

// 进制转换算法
/**
 * @description:  在将十进制转成二进制时，余数是 0 或 1；在将十进制转成八进制时，余数是 0～7；但是将十进制转成十六进制时，余数是 0～9 加上 A、B、C、D、E 和 F（对应 10、11、12、13、14 和 15）。因此，我们需要对栈中的数字做个转化才可以
 * @param {*} decNumber
 * @param {*} base
 * @return {*}
 */
function baseConverter(decNumber, base) {
  const remStack = new Stack();
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // {6}
  let number = decNumber;
  let rem;
  let baseString = "";
  if (!(base >= 2 && base <= 36)) {
    return "";
  }
  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()]; // {7}
  }
  return baseString;
}

console.log(baseConverter(100345, 2)); // 11000011111111001
console.log(baseConverter(100345, 8)); // 303771
console.log(baseConverter(100345, 16)); // 187F9
console.log(baseConverter(100345, 35)); // 2BW0

function reverseString(str) {
    //变成数组
    var newStr = '';
    newStr = str.split("").reverse().join("");
    return newStr;
}

console.log(reverseString("hello"));

//方法一:Math
function findLongestWord(str) {
  //第1步：将传给newStr的值转换成数组
  var newStr = str.split(" ")
  var arrNum = []
  //遍历数组
  for(var i = 0;i< newStr.length;i++){
    //得到都是数字的arrNum数组
    arrNum.push(newStr[i].length)

  }
 return Math.max.apply(null,arrNum)
}

console.log(findLongestWord("The quick brown fox jumped over the lazy dog"));

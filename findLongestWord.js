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

//方法二:
function findLongestWord(str) { 
  // 第1步：将传给str的值"May the force be with you"转换成数组
  var array = str.split(' ')
  var longest = 0  
  for(var i =0;i < array.length;i++){
    //如果是true
    if(array[i].length> longest){
      //把字符串的长度给longest
      longest = array[i].length
    }
  }
  return longest
}
findLongestWord("The quick brown fox jumped over the lazy dog");//6

//方法3:sort


function findLongestWord(str) { 
  // 第1步：将传给str的值"May the force be with you"转换成数组
  var arr = str.split(' ')
  //通过sort()将数组从小到大排列
  arr = arr.sort(function(a,b){
    return a.length - b.length
  })
  //获取数组最长的字符串
  var long = arr.pop().length
  return long
}
console.log(findLongestWord("The quick brown fox jumped over the lazy dog"));//6

//方法4: rduece()

function findLongestWord(str) { 
  // 第1步：将传给str的值"May the force be with you"转换成数组
  var arr = str.split(' ')
  //用reduce方法取到arr数组中最长的元素
  var long = arr.reduce(function(longest, currentWord){
    return currentWord.length > longest.length ? currentWord : longest;
  })
  
  return long.length
}
console.log(findLongestWord("The quick brown fox jumped over the lazy dog"));//6

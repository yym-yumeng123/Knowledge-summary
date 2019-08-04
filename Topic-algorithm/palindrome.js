//palindrome(回文)是指一个字符串忽略标点符号、大小写和空格，正着读和反着读一模一样。


function palindrome(str) {
  //正则匹配去掉字符串中的标点符号和空白格
  var newStr = str.replace(/[\ |\~|`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"")
  //转换为小写
  var newNewStr = newStr.toLowerCase();
  //变为数组
  var spl = newNewStr.split("");
  //反转数组
  var newSpl = spl.reverse();
  //变为字符串
  var newRel = newSpl.join("");
  //比较
  if (newNewStr == newRel) {
    return true;
  } else{
    return false
  }
}
  
console.log(palindrome("Eye  ,,   ///"))
console.log(palindrome("eyeee"))


==> 
function palindrome(str) {
  // 转换成小写用正则过滤掉符号
  var nStr = str.toLowerCase().replace(/[^a-z0-9]/g,"");
  //验证反转后是否相等
  return nStr.split("").reverse().join("") === nStr;
}

palindrome("A man, a plan, a canal. Panama");
console.log(palindrome("Eye  ,,   ///"))
console.log(palindrome("eyeee"))

//方法二:
function palindrome(str) {
  // 转换成小写用正则过滤掉符号
  var nStr = str.toLowerCase().replace(/[^a-z0-9]/g,"");
  console.log(nStr)
  for(var i = 0;i<nStr.length;i++){
    if(nStr[i] !== nStr[nStr.length -(i+1)]){
      return false
    }
    
  }
  return true
}
console.log(palindrome("Eye  ,,   ///"))
console.log(palindrome("eyee1235e"))

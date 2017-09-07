//方法一:replace
function titleCase(str) {
  var arr = str.toLowerCase().split(" ")
  console.log(arr)
  for(var i = 0;i< arr.length;i++){
    //获取下标为0的字符
    var char = arr[i].charAt(0)
    //替换首字母变为大写
    arr[i] = arr[i].replace(char, function replace(char){
      return char.toUpperCase();
    }) 
  }
  return arr.join(" ")
}

console.log(titleCase("I'm a little tea pot"));

//方法二:
//for循环  
function titleCase(str) {  
    var i, ss = str.toLowerCase().split(/\s+/);  
    for (i = 0; i < ss.length; i++) {  
        ss[i] = ss[i].slice(0, 1).toUpperCase() + ss[i].slice(1);  
    }  
    return ss.join(' ');  
} 
var a = 'Hi, my name\'s Han Meimei, a SOFTWARE engineer';  
console.log(titleCase(a));  

//数组+map  
function titleCase3(s) {  
    return s.toLowerCase().split(/\s+/).map(function(item, index) {  
        return item.slice(0, 1).toUpperCase() + item.slice(1);  
    }).join(' ');  
}  
console.log(titleCase3(a));  
// 思路：根据空白将字符串拆分为数组，对每个单词进行首字母大写处理，并将所有处理后的结果组成一个新数组然后拼接成字符串。

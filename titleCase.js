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

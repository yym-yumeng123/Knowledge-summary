function convert(num) {
  //罗马数字和数字的对应关系
  var lookup ={M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
  var romanStr = ""; 
  //遍历对象
  for (var i in lookup){
    while (num >= lookup[i]){
      romanStr+= i
      num -= lookup[i];
    } 
  } 
  return romanStr;

}
convert(36);

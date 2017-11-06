function truncate(str, num) {
  var arr=[];
  for(var i=0;i<str.length;i++){
    arr[i]=str[i];
  }
   //字符串的长度比指定的参数num短
   //直接输出
  if(str.length<=num){
    return str;
  }
   //否则以下代码
  var last="...";
  str="";
  if(num<=3){
    for(j=0;j<num;j++){
       str+=arr[j];
     }
    str+=last;
  }else{
     for(j=0;j<num-last.length;j++){
       str+=arr[j];
    }
     str+=last;
     console.log(str);
   }
   
   
 return str;
 }
 
truncate("A-tisket a-tasket A green and yellow basket", 11);

//方法一
function bouncer(arr) {  
  var newArr = arr.filter(function(e){
    return !e==false
  })
  return newArr;
}

//方法二
function bouncer(arr) {
  for(var i=0;i<arr.length;i++){
      if(!arr[i] == true){
          arr.splice(i,1);
          i--;
      }
  }

  return arr;
}

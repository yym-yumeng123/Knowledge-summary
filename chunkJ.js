function chunk(arr, size) {
  var result = [];
  var a = [];
  for(var i=0;i<arr.length;i++){
      //把数据放到a中
      a.push(arr[i]);
    
      if( ((i+1)%size == 0) || (i == arr.length-1)){
          result.push(a);

          a = [];
      }
  }
  return result;
}
console.log(chunk(["a", "b", "c", "d"], 2))

function rot13(str) { // LBH QVQ VG!
    var newArr=[];
    for(var i=0;i<str.length;i++){
        var numbers=str.charCodeAt(i);    //使用charCodeAt()方法取得每个字符的Unicode值，并保存在变量numbers中；
        if(numbers<65||numbers>90){
            newArr.push(String.fromCharCode(numbers));
        }else if(numbers>77){
            newArr.push(String.fromCharCode(numbers-13));
        }else{
            newArr.push(String.fromCharCode(numbers+13));
        }
    }      //大写A-Z字母对应的Unicode值为65-90；通过判断，利用fromCharCode()将Unicode值又转换为字符；
    return newArr.join("");
}

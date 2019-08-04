function mutation(arr) {
    var arr1 = arr[0].toLowerCase();
    var arr2 = arr[1].toLowerCase();

    for(var i=0;i<arr[1].length;i++){
        //利用indexOf() == -1
        if(arr1.indexOf(arr2[i]) == -1){
            return false;
        }
    }

    return true;
}

mutation(["hello", "hey"]);

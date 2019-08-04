function whereObject(collection, source) {
    var arr = []
    // console.log(Object.getOwnPropertyNames(source).length); //获取对象属性个数
    //循环遍历 collection的长度
    for (var index = 0; index < collection.length; index++) {
        //遍历数组里的对象
        for (var key in collection[index]) {
            var count = 0;
            //遍历source
            for (var key2 in source) {
                //如果coll中对象有source里的属性值
                if (collection[index].hasOwnProperty(key2)) {
                    // source里属性值 == coll的属性值
                    if (source[key2] == collection[index][key2]) {
                        count++;
                    }
                    //如果 count = 对象属性个数  并且  值相等
                    if (count == Object.getOwnPropertyNames(source).length && key == key2) {
                        //把这个对象添加到arr中
                        arr.push(collection[index]);
                    }
                }
            }
        }

    }
    return arr;
}

console.log(where([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" }))

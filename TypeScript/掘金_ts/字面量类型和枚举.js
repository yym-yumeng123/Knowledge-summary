if (res.status === "success") {
}
// 字面量类型
var str1 = "yym";
var num = 18;
var bool = true;
if (tmp.user.vip) {
    console.log(tmp.user.expires);
}
var tmp1 = {
    obj: {
        name: "yym",
        age: 18
    }
};
var Items;
(function (Items) {
    Items[Items["Foo"] = 0] = "Foo";
    Items[Items["Bar"] = 599] = "Bar";
    Items[Items["Baz"] = 600] = "Baz";
})(Items || (Items = {}));
Items.Foo; // 0
Items.Bar; // 599
var fooValue = Items.Foo; // 0
var fooKey = Items[0]; // 'Foo'
console.log(fooKey);
var returnNum = function () { return 100 + 300; };
var Items1;
(function (Items1) {
    Items1[Items1["Foo"] = returnNum()] = "Foo";
    Items1[Items1["Bar"] = 599] = "Bar";
    Items1[Items1["Baz"] = 600] = "Baz";
})(Items1 || (Items1 = {}));

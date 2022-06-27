/**
 * 适配器提供了 findAll 和 save 接口
 */
const localStorageAdapter = {
  findAll: function (callback) {
    let cardList = JSON.parse(localStorage["cart"])
    callback(cardList)
  },
  // 存储
  save: function (item) {
    let cardList = JSON.parse(localStorage["cart"])
    cardList.push(item)
    localStorage["cart"] = JSON.stringify(cardList)
  },
}

/**
 * 服务器适配器
 */
const saveAdapter = {
  findAll: function (callback) {
    fetch("https://jirengu.com/getCartList")
      .then((res) => res.json())
      .then((data) => callback(data))
  },
  save: function (item) {
    fetch("https://jirengu.com/addToCart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) => callback(data))
  },
}

class ShoppingCart {
  constructor(adapter) {
    this.adapter = adapter
  }
  add(item) {
    this.adapter.save(item)
  }
  show() {
    this.adapter.findAll((list) => {
      console.log("list", list)
    })
  }
}

const cart = new ShoppingCart(localStorageAdapter)

import { observable } from "mobx";
import Taro from "@tarojs/taro";

const AboutStore = observable({
  list: [],
  setList() {
    Taro.request({
      url: "https://www.zhihu.com/api/v4/search/top_search",
    }).then((res) => {
      console.log("res", res);
    });
  },
});

export default AboutStore;

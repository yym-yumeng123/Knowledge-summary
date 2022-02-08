import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtIndexes } from "taro-ui";
import Taro from "@tarojs/taro";

import "taro-ui/dist/style/components/Indexes.scss"; // 按需引入
import "./list.less";

export default class Index extends Component {
  componentWillMount() {
    this.state = {};
  }

  componentDidMount() {
    Taro.request({
      url:
        "https://service-qgovedpp-1253342658.bj.apigw.tencentcs.com/release/cmd?type=2",
      success: function(data) {
        console.log(data, "data...");
      }
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onClick (item) {
    console.log(item)
    Taro.navigateTo({url: '/pages/index/index'})
  }

  render() {
    const list = [
      {
        title: "A",
        key: "A",
        items: [
          {
            name: "阿坝"
            // 此处可加其他业务字段
          },
          {
            name: "阿拉善"
          }
        ]
      },
      {
        title: "B",
        key: "B",
        items: [
          {
            name: "北京"
          },
          {
            name: "保定"
          }
        ]
      }
    ];
    return (
      <View style="height:100vh">
        <AtIndexes list={list} onClick={this.onClick.bind(this)}>
          <View>自定义内容</View>
        </AtIndexes>
      </View>
    );
  }
}

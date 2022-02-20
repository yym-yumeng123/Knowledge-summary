import { Component } from "react";
import { View } from "@tarojs/components";
import { inject, observer } from "mobx-react";
import './index.less'


@inject("store")
@observer
class Viewpage extends Component {

  render() {
    return (
      <View className="view">
        <View className="square"></View>
      </View>
    );
  }
}

export default Viewpage;

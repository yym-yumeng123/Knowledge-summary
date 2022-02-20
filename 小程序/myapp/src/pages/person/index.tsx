import { Component } from "react";
import { View } from "@tarojs/components";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
class person extends Component {
  render() {
    return <View className="view">person</View>;
  }
}

export default person;

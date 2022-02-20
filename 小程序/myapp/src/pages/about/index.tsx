import { Component } from "react";
import { View } from "@tarojs/components";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
class About extends Component {
  componentDidMount() {
    const {
      store: { AboutStore },
    } = this.props;
    AboutStore.setList()
  }
  render() {
    return <View className="view">about</View>;
  }
}

export default About;

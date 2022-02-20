import { Component } from "react";
import { View, Button, Text, Navigator } from "@tarojs/components";
import { inject, observer } from "mobx-react";
// 导入 taro
import Taro from "@tarojs/taro";

type HomeProps = {
  store: {
    HomeStore: {
      msg: number;
      changeMsg: Function;
    };
  };
};

interface Home {
  props: HomeProps;
}

@inject("store")
@observer
class Home extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  goIndex = () => {
    Taro.navigateTo({
      url: "/pages/index/index",
    });
  };

  render() {
    const {
      HomeStore,
      HomeStore: { msg },
    } = this.props.store;
    return (
      <View className="home">
        <Text>{msg}</Text>
        <Button onClick={() => HomeStore.changeMsg("杨雨萌")}>改名叫杨雨萌</Button>
        <Button onClick={this.goIndex}>跳转到另一个页面</Button>
        <Navigator url="/pages/index/index">跳转22</Navigator>
      </View>
    );
  }
}

export default Home;

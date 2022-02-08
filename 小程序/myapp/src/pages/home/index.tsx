import React, { Component } from "react";
import { View, Button, Text } from "@tarojs/components";
import { inject, observer } from "mobx-react";

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

  render() {
    const {
      HomeStore,
      HomeStore: { msg },
    } = this.props.store;
    return (
      <View className="home">
        <Text>{msg}</Text>
        <Button onClick={() => HomeStore.changeMsg("yym")}>改变</Button>
      </View>
    );
  }
}

export default Home;

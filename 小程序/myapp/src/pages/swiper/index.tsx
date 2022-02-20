import { Component } from "react";
import { View, Swiper, SwiperItem, Button, Editor } from "@tarojs/components";
import { inject, observer } from "mobx-react";

import './index.less'
@inject("store")
@observer
class About extends Component {
  render() {
    return (
      <View className="view">
        <Swiper
          className="test-h"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <View className="demo-text-1">1</View>
          </SwiperItem>
          <SwiperItem>
            <View className="demo-text-2">2</View>
          </SwiperItem>
          <SwiperItem>
            <View className="demo-text-3">3</View>
          </SwiperItem>
        </Swiper>

        <Button className='btn-max-w' plain type='primary'>按钮</Button>
        <Button className='btn-max-w' plain type='primary' disabled>不可点击的按钮</Button>
        <Button className='btn-max-w' plain >按钮</Button>
        <Button className='btn-max-w' plain disabled >按钮</Button>
        <Button size='mini' type='primary'>按钮</Button>
        <Button size='mini' >按钮</Button>
        <Button size='mini' type='warn'>按钮</Button>

        <Editor id='editor' className='editor'></Editor>
        <Button type='warn'>撤销</Button>
      </View>
    );
  }
}

export default About;

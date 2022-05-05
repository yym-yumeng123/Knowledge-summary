import React from 'react';
import {Text, View, Button, ScrollView} from 'react-native';
import styles from './style.js';

const Details = ({navigation, route}) => {
  const {itemId, otherParam} = route.params;
  console.log(itemId, otherParam, 'a');
  return (
    <ScrollView style={styles.todo_wrap}>
      <View>
        <Text>我是详情页</Text>
        <Button
          title="去详情页, 什么也不做"
          onPress={() => navigation.navigate('Details')}
        />
        <Button
          title="去详情页, 路由再次放入栈中"
          onPress={() => navigation.push('Details')}
        />
        <Button title="回到上一个路由" onPress={() => navigation.goBack()} />
        <Button
          title="去第一个栈的路由"
          onPress={() => navigation.popToTop()}
        />
      </View>
    </ScrollView>
  );
};

export default Details;

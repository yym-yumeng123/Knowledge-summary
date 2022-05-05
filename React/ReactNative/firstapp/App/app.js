import React, {useState} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import styles from './style.js';

const App = props => {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [count, setCount] = React.useState(0);
  const {navigation} = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)} title="Update count" />
      ),
    });
  }, [navigation]);

  const onPressAddTodo = () => {
    setList([...list, input]);
  };

  const onPressDeleteItem = index => {
    const copy = [...list];
    copy.splice(index, 1);
    setList(copy);
  };

  return (
    <ScrollView style={styles.todo_wrap}>
      <View style={styles.input_wrap}>
        {/* 输入框 */}
        <TextInput
          style={styles.input}
          onChangeText={text => setInput(text)}
          value={input}
        />
        {/* 按钮 */}
        <TouchableHighlight onPress={onPressAddTodo}>
          <View style={styles.button}>
            <Text>新增todo</Text>
          </View>
        </TouchableHighlight>
      </View>
      {/* todo列表 */}
      <View style={styles.list_wrap}>
        {list.map((item, index) => {
          return (
            <View style={styles.item} key={index}>
              <Text>{item}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => onPressDeleteItem(index)}>
                <Text>删除{index}</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        <Button
          title="跳转到详情页"
          onPress={() =>
            navigation.navigate('Details', {
              itemId: 1,
              otherParam: '我是Home页第一个数据',
            })
          }
        />

        <Text>Count: {count}</Text>
      </View>
    </ScrollView>
  );
};

export default App;

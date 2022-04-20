import React, {useState} from 'react';
import {Text, SafeAreaView, Switch, TextInput} from 'react-native';

const Second = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [value, onChangeText] = useState('Useless Placeholder');

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView>
      <Text>我是yym</Text>

      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      <TextInput onChangeText={text => onChangeText(text)} value={value} />
    </SafeAreaView>
  );
};

export default Second;

import React from 'react';
import {Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import App from './app';
import Details from './details';

function LogoTitle() {
  return <Text>我是标题</Text>;
}

const HomeScreen = () => {
  const options = {
    title: '杨雨蒙',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Home" component={App} options={options} />
        <Stack.Screen
          name="Details"
          component={Details}
          initialParams={{itemId: 2}}
          options={{
            title: '详情页',
            headerTitle: () => <LogoTitle />,
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;

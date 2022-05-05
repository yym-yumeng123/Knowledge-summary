import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import App from './app';
import Details from './details';

const HomeScreen = () => {
  const options = {headerShown: false, title: '杨雨蒙'};

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={App} options={options} />
        <Stack.Screen
          name="Details"
          component={Details}
          initialParams={{itemId: 2}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;

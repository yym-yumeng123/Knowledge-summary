import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import About from './tab/about';
import Setting from './tab/settings';
import My from './tab/my';

const Tab = createBottomTabNavigator();

const Home = props => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="关于"
        component={About}
        options={{headerShown: false, tabBarBadge: 3}}
      />
      <Tab.Screen
        name="设置"
        component={Setting}
        options={{headerShown: false}}
      />
      <Tab.Screen name="我的" component={My} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

export default Home;

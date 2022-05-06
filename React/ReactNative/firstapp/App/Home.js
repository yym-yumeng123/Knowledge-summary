import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/themed';
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
        options={{
          headerShown: false,
          tabBarIcon: () => {
            <Icon name="g-translate" color="#00aced" />;
          },
        }}
      />
      <Tab.Screen name="我的" component={My} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

export default Home;

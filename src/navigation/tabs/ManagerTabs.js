import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from '../stack/HomeStack';
import CustomTabBar from '../CustomTabBar';
import HomeIcon from '@assets/svg/navigation/HomeIcon';

const Tab = createBottomTabNavigator();

const createTabOptions = (label, IconComponent) => ({
  tabBarLabel: label,
  tabBarIcon: ({focused}) => (
    <IconComponent color={focused ? '#0B5AAE' : '#C2C2C2'} />
  ),
});

const ManagerTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({}) => ({
        headerShown: false,
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={() => createTabOptions('Home', HomeIcon)}
      />
      {/* <Tab.Screen
        name="SurveyStack"
        component={SurveyStack}
        options={() => createTabOptions('Survey', HomeIcon)}
      /> */}
    </Tab.Navigator>
  );
};

export default ManagerTabs;

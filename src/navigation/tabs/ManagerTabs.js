import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from '../stack/HomeStack';
import CustomTabBar from '../CustomTabBar';
import HomeIcon from '@assets/svg/navigation/HomeIcon';
import PhotoCameraIcon from '@assets/svg/navigation/PhotoCameraIcon';
import GalleryIcon from '@assets/svg/navigation/GalleryIcon';
import CameraStack from '../stack/CameraStack';
import GalleryStack from '../stack/GalleryStack';
import {COLORS} from '../../components/styles/colors';

const Tab = createBottomTabNavigator();

const createTabOptions = (label, IconComponent) => ({
  tabBarLabel: label,
  tabBarIcon: ({focused}) => (
    <IconComponent color={focused ? COLORS.primary : '#C2C2C2'} />
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
        name="GalleryStack"
        component={GalleryStack}
        options={() => createTabOptions('Gallery', GalleryIcon)}
      /> */}
      <Tab.Screen
        name="CameraStack"
        component={CameraStack}
        options={() => createTabOptions('Camera', PhotoCameraIcon)}
      />
    </Tab.Navigator>
  );
};

export default ManagerTabs;

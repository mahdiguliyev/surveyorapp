import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from '../stack/HomeStack';
import CustomTabBar from '../CustomTabBar';
import HomeIcon from '@assets/svg/navigation/HomeIcon';
import PhotoCameraIcon from '@assets/svg/navigation/PhotoCameraIcon';
import ReportsIcon from '@assets/svg/navigation/ReportsIcon';
import MapIcon from '@assets/svg/navigation/MapIcon';
import ProfileIcon from '@assets/svg/navigation/ProfileIcon';
import GalleryIcon from '@assets/svg/navigation/GalleryIcon';
import CameraStack from '../stack/CameraStack';
import GalleryStack from '../stack/GalleryStack';
import {COLORS} from '../../components/styles/colors';
import ReportsStack from '../stack/ReportsStack';
import MapStack from '../stack/MapStack';
import ProfileStack from '../stack/ProfileStack';

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
        name="MapStack"
        component={MapStack}
        options={() => createTabOptions('Map', MapIcon)}
      />
      <Tab.Screen
        name="CameraStack"
        component={CameraStack}
        options={() => createTabOptions('Camera', GalleryIcon)}
      />
      <Tab.Screen
        name="ReportsStack"
        component={ReportsStack}
        options={() => createTabOptions('Reports', ReportsIcon)}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={() => createTabOptions('Profile', ProfileIcon)}
      />
    </Tab.Navigator>
  );
};

export default ManagerTabs;

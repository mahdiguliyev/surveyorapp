import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeIcon from '@assets/svg/navigation/HomeIcon';
import CustomTabBar from './CustomTabBar';
import HomeStack from './stack/HomeStack';

const Tab = createBottomTabNavigator();

const createTabOptions = (label, IconComponent) => ({
  tabBarLabel: label,
  tabBarIcon: ({focused}) => (
    <IconComponent color={focused ? '#0B5AAE' : '#C2C2C2'} />
  ),
});

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      // eslint-disable-next-line react/no-unstable-nested-components
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
        name="AccountStack"
        component={AccountStack}
        options={() =>
          createTabOptions(getLocale('bottomnavigation.products'), ProductIcon)
        }
      />
      <Tab.Screen
        name="OperationStack"
        component={PaymentStack}
        options={() =>
          createTabOptions(getLocale('bottomnavigation.payments'), PaymentIcon)
        }
      />
      <Tab.Screen
        name="MoreStack"
        component={MoreStack}
        options={() =>
          createTabOptions(getLocale('bottomnavigation.more'), MoreIcon)
        }
      /> */}
    </Tab.Navigator>
  );
};

export default BottomNavigation;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';

const Stack = createStackNavigator();

const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: true,
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;

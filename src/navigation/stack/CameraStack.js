import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CameraScreen from '../../screens/Camera/CameraScreen';

const Stack = createStackNavigator();

const CameraStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Camera">
      <Stack.Screen
        name={'Camera'}
        component={CameraScreen}
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

export default CameraStack;

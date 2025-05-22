import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CameraScreen from '../../screens/Camera/CameraScreen';
import PhotoEditScreen from '../../screens/Camera/PhotoEditScreen';
import SkiaTest from '../../screens/Camera/TestScreen';

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
      <Stack.Screen
        name={'PhotoEdit'}
        component={PhotoEditScreen}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Test'}
        component={SkiaTest}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: true,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CameraStack;

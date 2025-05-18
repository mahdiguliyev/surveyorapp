import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

export default function AuthNavigation({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        // Hiding header for Splash Screen
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{gestureEnabled: false}}
      />
      {/* <Stack.Screen
        name="PasswordChange"
        component={PasswordChangeScreen}
        options={{gestureEnabled: false}}
      /> */}
    </Stack.Navigator>
  );
}

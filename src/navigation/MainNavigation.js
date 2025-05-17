import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigation from './AuthNavigation';
import {useAuthentication} from '../common/context/LoginProvider';
import BottomNavigation from './BottomNavigation';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
const Stack = createStackNavigator();

const MainNavigation = () => {
  const navigation = useNavigation();
  const {isAuthenticated} = useAuthentication();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('HomePincode');
    } else {
      navigation.navigate('Pincode');
    }
  }, []);

  return (
    <Stack.Navigator initialRouteName="Bottom">
      <Stack.Screen
        name="Bottom"
        component={BottomNavigation}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      {/* <Stack.Screen
        name="HomePincode"
        component={PincodeScreen}
        options={{headerShown: false, gestureEnabled: false}}
      /> */}
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const {isAuthenticated} = useAuthentication();

  return isAuthenticated ? <MainNavigation /> : <AuthNavigation />;
};

export default MainNavigator;

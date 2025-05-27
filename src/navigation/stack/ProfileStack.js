import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../screens/Profile/ProfileScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;

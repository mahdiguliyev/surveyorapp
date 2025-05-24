import {createStackNavigator} from '@react-navigation/stack';
import CameraScreen from '../../screens/Camera/CameraScreen';
import PhotoEditScreen from '../../screens/Camera/PhotoEditScreen';

const Stack = createStackNavigator();

const CameraStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Camera">
      <Stack.Screen
        name={'Camera'}
        component={CameraScreen}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'PhotoEdit'}
        component={PhotoEditScreen}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CameraStack;

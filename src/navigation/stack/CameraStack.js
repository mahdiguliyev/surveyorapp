import {createStackNavigator} from '@react-navigation/stack';
import CameraScreen from '../../screens/Camera/CameraScreen';
import PhotoEditScreen from '../../screens/Camera/PhotoEditScreen';
import GalleryScreen from '../../screens/Camera/GalleryScreen';
import CreatingReportScreen from '../../screens/Camera/CreatingReportScreen';

const Stack = createStackNavigator();

const CameraStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Gallery">
      <Stack.Screen
        name={'Gallery'}
        component={GalleryScreen}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShown: false,
        }}
      />
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
        name={'CreatingReport'}
        component={CreatingReportScreen}
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

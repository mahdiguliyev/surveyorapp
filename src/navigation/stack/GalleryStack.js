import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const GalleryStack = () => {
  return (
    <Stack.Navigator initialRouteName="Gallery">
      {/* <Stack.Screen
        name={'Camera'}
        component={CameraScreen}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default GalleryStack;

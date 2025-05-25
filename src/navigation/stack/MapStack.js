import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../../screens/Map/MapScreen';

const Stack = createStackNavigator();

const MapStack = () => {
  return (
    <Stack.Navigator initialRouteName="Map">
      <Stack.Screen
        name={'Map'}
        component={MapScreen}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MapStack;

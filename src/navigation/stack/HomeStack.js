import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/Home/HomeScreen';
import ContractorsScreen from '../../screens/Home/ContractorsScreen';

const Stack = createStackNavigator();

const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Contractors"
        component={ContractorsScreen}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

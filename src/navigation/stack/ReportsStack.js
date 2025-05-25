import {createStackNavigator} from '@react-navigation/stack';
import ReportsScreen from '../../screens/Reports/ReportsScreen';

const Stack = createStackNavigator();

const ReportsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Reports">
      <Stack.Screen
        name={'Reports'}
        component={ReportsScreen}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ReportsStack;

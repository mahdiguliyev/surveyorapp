import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/Home/HomeScreen';
import ContractorsScreen from '../../screens/Home/ContractorsScreen';
import ProjectsScreen from '../../screens/Home/ProjectsScreen';
import AddProjectScreen from '../../screens/Home/AddProjectScreen';
import AddContractorScreen from '../../screens/Home/AddContractorScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
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
      <Stack.Screen
        name="AddContractor"
        component={AddContractorScreen}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddProject"
        component={AddProjectScreen}
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

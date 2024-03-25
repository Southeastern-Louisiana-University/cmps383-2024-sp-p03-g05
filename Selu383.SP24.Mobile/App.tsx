import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './Pages/Auth';
import NavigationPage from './Pages/navigationpage';
import CreateAccount from './Pages/CreateAccount';
import Reservation from './Pages/Reservation';

const Stack = createStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
   <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
   <Stack.Screen name="Login" component={LoginPage} />
   <Stack.Screen name="HomeScreen" component={NavigationPage} />
   <Stack.Screen name="CreateScreen" component={CreateAccount} />
   <Stack.Screen name="Reservation" component={Reservation}/>
   </Stack.Navigator>
   </NavigationContainer>
   
  );
}

